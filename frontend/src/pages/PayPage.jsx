import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import PaymentModal from '../components/PaymentModal'
import styles from './PayPage.module.css'

export default function PayPage() {
  const { token } = useParams()
  const [payment, setPayment] = useState(null)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(true)
  const [paid, setPaid]       = useState(false)

  useEffect(() => {
    api.getPaymentByToken(token)
      .then(data => {
        setPayment(data)
        if (data.status === 'Completed') setPaid(true)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) return (
    <div className={styles.center}>
      <div className={styles.spinner} />
      <p>Loading payment details…</p>
    </div>
  )

  if (error) return (
    <div className={styles.center}>
      <div className={styles.card}>
        <div className={styles.icon}>❌</div>
        <h2>Link Invalid or Expired</h2>
        <p>{error}</p>
        <a href="/" className={styles.btn}>Go to Homepage</a>
      </div>
    </div>
  )

  if (paid) return (
    <div className={styles.center}>
      <div className={styles.card}>
        <div className={styles.icon}>✅</div>
        <h2>Payment Already Completed</h2>
        <p>This payment has already been processed. Your case manager will be in touch shortly.</p>
        <a href="/" className={styles.btn}>Go to Homepage</a>
      </div>
    </div>
  )

  return (
    <div className={styles.center}>
      <div className={styles.card}>
        <div className={styles.logo}>VisaProUK</div>
        <h2>Complete Your Payment</h2>
        <p className={styles.sub}>Your case manager has requested payment for:</p>
        <div className={styles.summary}>
          <div className={styles.row}>
            <span>Service</span>
            <strong>{payment.service}</strong>
          </div>
          <div className={styles.row}>
            <span>Amount</span>
            <strong>{payment.currency === 'KES' ? 'KES ' : '£'}{Number(payment.amount).toLocaleString()}</strong>
          </div>
          <div className={styles.row}>
            <span>Client</span>
            <strong>{payment.user_name}</strong>
          </div>
        </div>

        <PaymentModal
          isOpen={true}
          onClose={() => {}}
          amount={Number(payment.amount)}
          currency={payment.currency}
          service={payment.service}
          userName={payment.user_name}
          inline={true}
          onSuccess={() => setPaid(true)}
        />
      </div>
    </div>
  )
}
