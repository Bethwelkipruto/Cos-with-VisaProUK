import { useState } from 'react'
import { api } from '../api'
import styles from './Eligibility.module.css'

const EMPTY = { full_name: '', email: '', phone: '', nationality: '', visa_type: '', message: '' }

export default function Eligibility() {
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const [errMsg, setErrMsg] = useState('')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30000)
      await api.createApplication(form)
      clearTimeout(timeout)
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      if (err.name === 'AbortError') {
        setErrMsg('Server is waking up, please try again in a few seconds.')
      } else {
        setErrMsg(err.message)
      }
      setStatus('error')
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className="section-label" style={{ textAlign: 'center' }}>Quick Check</div>
        <h2 className="section-title" style={{ textAlign: 'center', maxWidth: '100%' }}>
          Am I Eligible for a UK Skilled Worker Visa?
        </h2>
        <p>Fill in your details and a case manager will assess your eligibility within 24 hours — completely free.</p>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(74,222,128,0.08)', borderRadius: '12px', border: '1px solid rgba(74,222,128,0.2)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✅</div>
            <h3 style={{ color: '#4ade80', marginBottom: '8px' }}>Application Submitted!</h3>
            <p>A case manager will contact you within 24 hours to discuss your eligibility.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <label>Full Name</label>
              <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Your full name" required />
            </div>
            <div className={styles.group}>
              <label>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>
            <div className={styles.group}>
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7000 000000" />
            </div>
            <div className={styles.group}>
              <label>Current Nationality</label>
              <select name="nationality" value={form.nationality} onChange={handleChange} required>
                <option value="">Select nationality…</option>
                <option>Nigerian</option>
                <option>Indian</option>
                <option>Pakistani</option>
                <option>Filipino</option>
                <option>South African</option>
                <option>Kenyan</option>
                <option>Ghanaian</option>
                <option>Other</option>
              </select>
            </div>
            <div className={styles.group}>
              <label>Visa Type</label>
              <select name="visa_type" value={form.visa_type} onChange={handleChange} required>
                <option value="">Select visa type…</option>
                <option>Skilled Worker Visa</option>
                <option>Health & Care Worker Visa</option>
                <option>Senior / Specialist Worker Visa</option>
                <option>Graduate Trainee Visa</option>
                <option>Scale-Up Worker Visa</option>
                <option>Sponsor Licence Application</option>
                <option>Visa Extension / ILR</option>
              </select>
            </div>
            <div className={styles.group}>
              <label>Additional Information (optional)</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your situation, job offer, salary etc." rows={3} style={{ resize: 'vertical' }} />
            </div>
            {status === 'error' && <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{errMsg}</p>}
            <button type="submit" className={styles.btn} disabled={status === 'sending'}>
              {status === 'sending' ? '⏳ Submitting… (may take a few seconds)' : 'Submit Application — Free →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
