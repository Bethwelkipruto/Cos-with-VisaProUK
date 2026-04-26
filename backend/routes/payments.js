const router = require('express').Router()
const pool = require('../db')
const auth = require('../middleware/auth')
const axios = require('axios')
const Stripe = require('stripe')

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// ─── M-Pesa helpers ───────────────────────────────────────────────────────────

async function getMpesaToken() {
  const url =
    process.env.MPESA_ENV === 'production'
      ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

  const { data } = await axios.get(url, {
    auth: {
      username: process.env.MPESA_CONSUMER_KEY,
      password: process.env.MPESA_CONSUMER_SECRET,
    },
  })
  return data.access_token
}

function mpesaTimestamp() {
  return new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '')
    .slice(0, 14)
}

function mpesaPassword(timestamp) {
  const raw = `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  return Buffer.from(raw).toString('base64')
}

// ─── M-Pesa STK Push ──────────────────────────────────────────────────────────

router.post('/mpesa/stkpush', async (req, res) => {
  const { phone, amount, service, user_name } = req.body
  if (!phone || !amount || !service || !user_name)
    return res.status(400).json({ error: 'phone, amount, service and user_name required' })

  // Normalize phone: 07xx → 2547xx
  const normalized = phone.startsWith('0')
    ? '254' + phone.slice(1)
    : phone.replace('+', '')

  try {
    const token = await getMpesaToken()
    const timestamp = mpesaTimestamp()
    const password = mpesaPassword(timestamp)

    const stkUrl =
      process.env.MPESA_ENV === 'production'
        ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
        : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'

    const { data } = await axios.post(
      stkUrl,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: normalized,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: normalized,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: 'VisaProUK',
        TransactionDesc: service,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    // Save pending payment
    const { rows } = await pool.query(
      `INSERT INTO payments (user_name, service, amount, currency, method, phone, checkout_request_id, status)
       VALUES ($1, $2, $3, 'KES', 'M-Pesa', $4, $5, 'Pending') RETURNING *`,
      [user_name, service, amount, normalized, data.CheckoutRequestID]
    )

    res.json({ message: 'STK push sent. Check your phone.', payment: rows[0], checkoutRequestId: data.CheckoutRequestID })
  } catch (err) {
    const msg = err.response?.data?.errorMessage || err.message
    res.status(500).json({ error: msg })
  }
})

// ─── M-Pesa Callback (called by Safaricom) ────────────────────────────────────

router.post('/mpesa/callback', async (req, res) => {
  const body = req.body?.Body?.stkCallback
  if (!body) return res.sendStatus(200)

  const { CheckoutRequestID, ResultCode, CallbackMetadata } = body

  if (ResultCode === 0) {
    const items = CallbackMetadata?.Item || []
    const get = (name) => items.find((i) => i.Name === name)?.Value

    const transaction_id = get('MpesaReceiptNumber')
    const amount = get('Amount')
    const phone = String(get('PhoneNumber'))

    await pool.query(
      `UPDATE payments SET status='Completed', transaction_id=$1, amount=$2, phone=$3
       WHERE checkout_request_id=$4`,
      [transaction_id, amount, phone, CheckoutRequestID]
    )
  } else {
    await pool.query(
      `UPDATE payments SET status='Failed' WHERE checkout_request_id=$1`,
      [CheckoutRequestID]
    )
  }

  res.sendStatus(200)
})

// ─── M-Pesa STK Query (poll status from frontend) ────────────────────────────

router.post('/mpesa/query', async (req, res) => {
  const { checkoutRequestId } = req.body
  if (!checkoutRequestId) return res.status(400).json({ error: 'checkoutRequestId required' })

  try {
    const { rows } = await pool.query(
      'SELECT status, transaction_id FROM payments WHERE checkout_request_id=$1',
      [checkoutRequestId]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Payment not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Stripe Payment Intent ────────────────────────────────────────────────────

router.post('/stripe/create-intent', async (req, res) => {
  const { amount, currency, service, user_name } = req.body
  if (!amount || !currency || !service || !user_name)
    return res.status(400).json({ error: 'amount, currency, service and user_name required' })

  try {
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses smallest currency unit
      currency: currency.toLowerCase(),
      metadata: { service, user_name },
    })

    // Save pending payment
    const { rows } = await pool.query(
      `INSERT INTO payments (user_name, service, amount, currency, method, transaction_id, status)
       VALUES ($1, $2, $3, $4, 'Stripe', $5, 'Pending') RETURNING *`,
      [user_name, service, amount, currency.toUpperCase(), intent.id]
    )

    res.json({ clientSecret: intent.client_secret, payment: rows[0] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Stripe Webhook (mark payment complete) ───────────────────────────────────

router.post('/stripe/webhook', require('express').raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object
    await pool.query(
      `UPDATE payments SET status='Completed' WHERE transaction_id=$1`,
      [intent.id]
    )
  } else if (event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object
    await pool.query(
      `UPDATE payments SET status='Failed' WHERE transaction_id=$1`,
      [intent.id]
    )
  }

  res.sendStatus(200)
})

// ─── Payment Request (admin sends link to client) ───────────────────────────

router.post('/request', auth, async (req, res) => {
  const { client_name, client_email, service, amount, currency } = req.body
  if (!client_name || !client_email || !service || !amount || !currency)
    return res.status(400).json({ error: 'client_name, client_email, service, amount and currency required' })

  const crypto = require('crypto')
  const token = crypto.randomBytes(32).toString('hex')
  const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  try {
    const { rows } = await pool.query(
      `INSERT INTO payments (user_name, client_email, service, amount, currency, method, status, token, expires_at)
       VALUES ($1, $2, $3, $4, $5, 'Pending', 'Pending', $6, $7) RETURNING *`,
      [client_name, client_email, service, amount, currency, token, expires_at]
    )

    const payLink = `${process.env.CLIENT_URL}/pay/${token}`
    const currencySymbol = currency === 'KES' ? 'KES' : '£'

    await require('../mailer').sendMail({
      from: `"VisaProUK" <${process.env.MAIL_USER}>`,
      to: client_email,
      subject: `Payment Request — ${service}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px">
          <h2 style="color:#1a1a2e;margin-bottom:8px">Payment Request</h2>
          <p style="color:#555">Dear ${client_name},</p>
          <p style="color:#555">Your case manager has sent you a payment request for the following service:</p>
          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin:20px 0">
            <p style="margin:0 0 8px"><strong>Service:</strong> ${service}</p>
            <p style="margin:0"><strong>Amount:</strong> ${currencySymbol}${Number(amount).toLocaleString()}</p>
          </div>
          <a href="${payLink}" style="display:inline-block;background:#c8922a;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:1rem">Pay Now</a>
          <p style="color:#9ca3af;font-size:0.8rem;margin-top:24px">This link expires in 7 days. If you have questions, reply to this email.</p>
        </div>
      `,
    })

    res.status(201).json({ message: 'Payment request sent', payment: rows[0] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Get payment by token (public — for client pay page) ─────────────────────

router.get('/by-token/:token', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM payments WHERE token=$1',
      [req.params.token]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Payment link not found or expired' })
    if (new Date(rows[0].expires_at) < new Date()) return res.status(410).json({ error: 'Payment link has expired' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Admin CRUD (existing) ────────────────────────────────────────────────────

router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM payments ORDER BY date DESC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  const { user_name, service, amount, currency, method, status } = req.body
  if (!user_name || !service || !amount)
    return res.status(400).json({ error: 'user_name, service and amount required' })
  try {
    const { rows } = await pool.query(
      `INSERT INTO payments (user_name, service, amount, currency, method, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_name, service, amount, currency || 'KES', method || 'Manual', status || 'Pending']
    )
    res.status(201).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  const { status } = req.body
  try {
    const { rows } = await pool.query(
      'UPDATE payments SET status=$1 WHERE id=$2 RETURNING *',
      [status, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Payment not found' })
    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
