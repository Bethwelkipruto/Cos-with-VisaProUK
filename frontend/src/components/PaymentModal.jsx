import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { api } from '../api'
import styles from './PaymentModal.module.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// ─── Stripe Card Form ─────────────────────────────────────────────────────────

function StripeForm({ amount, currency, service, userName, onSuccess, onError }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    try {
      const { clientSecret } = await api.stripeCreateIntent({ amount, currency, service, user_name: userName })
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })
      if (error) throw new Error(error.message)
      if (paymentIntent.status === 'succeeded') onSuccess('Card payment successful!')
    } catch (err) {
      onError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.cardWrap}>
        <CardElement options={{ style: { base: { fontSize: '16px', color: '#1a1a2e' } } }} />
      </div>
      <button type="submit" className={styles.btn} disabled={loading || !stripe}>
        {loading ? 'Processing…' : `Pay ${currency} ${amount}`}
      </button>
    </form>
  )
}

// ─── M-Pesa Form ──────────────────────────────────────────────────────────────

function MpesaForm({ amount, service, userName, onSuccess, onError }) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [polling, setPolling] = useState(false)
  const [checkoutId, setCheckoutId] = useState(null)

  // Poll payment status every 4s after STK push
  useEffect(() => {
    if (!polling || !checkoutId) return
    const interval = setInterval(async () => {
      try {
        const { status } = await api.mpesaQuery(checkoutId)
        if (status === 'Completed') {
          clearInterval(interval)
          setPolling(false)
          onSuccess('M-Pesa payment confirmed!')
        } else if (status === 'Failed') {
          clearInterval(interval)
          setPolling(false)
          onError('M-Pesa payment failed or was cancelled.')
        }
      } catch {}
    }, 4000)
    return () => clearInterval(interval)
  }, [polling, checkoutId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { checkoutRequestId } = await api.mpesaStkPush({ phone, amount, service, user_name: userName })
      setCheckoutId(checkoutRequestId)
      setPolling(true)
    } catch (err) {
      onError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (polling) {
    return (
      <div className={styles.polling}>
        <div className={styles.spinner} />
        <p>Check your phone and enter your M-Pesa PIN…</p>
        <small>Waiting for confirmation</small>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>M-Pesa Phone Number</label>
      <input
        className={styles.input}
        type="tel"
        placeholder="07XX XXX XXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit" className={styles.btn} disabled={loading}>
        {loading ? 'Sending…' : `Pay KES ${amount} via M-Pesa`}
      </button>
    </form>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function PaymentModal({ isOpen, onClose, amount, currency = 'GBP', service, userName, inline = false, onSuccess }) {
  const [tab, setTab] = useState('mpesa')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  if (!isOpen) return null

  const handleSuccess = (msg) => {
    setMessage(msg)
    setIsError(false)
    if (onSuccess) onSuccess()
  }
  const handleError = (msg) => { setMessage(msg); setIsError(true) }

  const content = (
    <div className={inline ? styles.inline : styles.modal} onClick={inline ? undefined : (e) => e.stopPropagation()}>
      {!inline && <button className={styles.close} onClick={onClose}>✕</button>}
      {!inline && <h2 className={styles.title}>Complete Payment</h2>}
      {!inline && <p className={styles.sub}>{service}</p>}

      {message ? (
        <div className={`${styles.message} ${isError ? styles.error : styles.success}`}>
          {message}
          {!isError && !inline && <button className={styles.btn} onClick={onClose} style={{ marginTop: '1rem' }}>Done</button>}
          {isError  && <button className={styles.btnOutline} onClick={() => setMessage(null)}>Try again</button>}
        </div>
      ) : (
        <>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${tab === 'mpesa' ? styles.tabActive : ''}`} onClick={() => setTab('mpesa')}>
              📱 M-Pesa
            </button>
            <button className={`${styles.tab} ${tab === 'card' ? styles.tabActive : ''}`} onClick={() => setTab('card')}>
              💳 Card
            </button>
          </div>

          {tab === 'mpesa' && (
            <MpesaForm
              amount={amount}
              service={service}
              userName={userName}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}

          {tab === 'card' && (
            <Elements stripe={stripePromise}>
              <StripeForm
                amount={amount}
                currency={currency}
                service={service}
                userName={userName}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </Elements>
          )}
        </>
      )}
    </div>
  )

  if (inline) return content

  return (
    <div className={styles.overlay} onClick={onClose}>
      {content}
    </div>
  )
}
