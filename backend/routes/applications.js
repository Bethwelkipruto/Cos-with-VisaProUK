const router = require('express').Router()
const pool = require('../db')
const transporter = require('../mailer')
const { validateApplication } = require('../middleware/validate')
const { emailBreaker } = require('../middleware/protection')
const auth = require('../middleware/auth')

// GET /api/applications
router.get('/', auth, async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM applications ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) { next(err) }
})

// POST /api/applications
router.post('/', validateApplication, async (req, res, next) => {
  const { full_name, email, phone, visa_type, nationality, message } = req.body
  try {
    const { rows } = await pool.query(
      `INSERT INTO applications (full_name, email, phone, visa_type, nationality, message)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_name, email, phone, visa_type, nationality, message]
    )
    // Send email via circuit breaker
    emailBreaker.call(() => transporter.sendMail({
      from: `"HC-One Immigration" <${process.env.MAIL_USER}>`,
      to: 'bethwel.c7@gmail.com',
      subject: `🆕 New Visa Application — ${visa_type}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
          <div style="background:#0a1628;padding:24px;text-align:center">
            <h1 style="color:#c8922a;margin:0;font-size:1.4rem">🇬🇧 HC-One Immigration</h1>
            <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:0.85rem">New Visa Application Received</p>
          </div>
          <div style="padding:28px;background:#fff">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;width:140px">Full Name</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600">${full_name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6">${phone || 'N/A'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280">Visa Type</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;font-weight:600;color:#c8922a">${visa_type}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280">Nationality</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6">${nationality || 'N/A'}</td></tr>
              <tr><td style="padding:10px 0;color:#6b7280;vertical-align:top">Message</td><td style="padding:10px 0">${message || 'N/A'}</td></tr>
            </table>
            <div style="margin-top:24px;text-align:center">
              <a href="https://cos-with-visa-pro-uk.vercel.app/admin/applications" style="background:#c8922a;color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:700">View in Admin Dashboard</a>
            </div>
          </div>
          <div style="background:#f9fafb;padding:14px;text-align:center;font-size:0.75rem;color:#9ca3af">
            HC-One Immigration Services Ltd &nbsp;·&nbsp; Received ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })} UK time
          </div>
        </div>
      `,
    })).catch(err => console.error('[Email]', err.message))
    res.status(201).json(rows[0])
  } catch (err) { next(err) }
})

// PUT /api/applications/:id
router.put('/:id', auth, async (req, res, next) => {
  const { status, notes } = req.body
  try {
    const { rows } = await pool.query(
      'UPDATE applications SET status=$1, notes=$2 WHERE id=$3 RETURNING *',
      [status, notes, req.params.id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Application not found' })
    res.json(rows[0])
  } catch (err) { next(err) }
})

// DELETE /api/applications/:id
router.delete('/:id', auth, async (req, res, next) => {
  try {
    await pool.query('DELETE FROM applications WHERE id = $1', [req.params.id])
    res.json({ message: 'Application deleted' })
  } catch (err) { next(err) }
})

module.exports = router
