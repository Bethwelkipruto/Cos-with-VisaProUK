import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import styles from './Contact.module.css'

const departments = [
  { icon: '📧', title: 'General Enquiries',   emails: ['info@visaglobal.co.uk'],                              desc: 'For any general questions about our services.' },
  { icon: '👥', title: 'HR / Recruitment Desk', emails: ['recruitment@visaglobal.co.uk', 'hr@visaglobal.co.uk'], desc: 'Employer onboarding, recruitment partnerships and HR support.' },
  { icon: '📜', title: 'CoS Processing',       emails: ['cos@visaglobal.co.uk'],                              desc: 'Certificate of Sponsorship assignments and SMS queries.' },
  { icon: '🛟', title: 'Support / Help',        emails: ['support@visaglobal.co.uk'],                          desc: 'Technical issues, case updates and urgent assistance.' },
]

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm]       = useState(EMPTY)
  const [status, setStatus]   = useState(null) // null | 'sending' | 'success' | 'error'
  const [errMsg, setErrMsg]   = useState('')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await api.sendContact(form)
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      setErrMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <>
      {/* ── Hero CTA ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <div className="section-label">Get In Touch</div>
          <h1>Speak With Our Recruitment<br />& Visa Support Team Today</h1>
          <p>
            We assist qualified applicants with Certificate of Sponsorship processing,
            visa documentation and onboarding guidance — from first enquiry to UK arrival.
          </p>
          <div className={styles.heroBtns}>
            <Link to="/eligibility" className={styles.btnGold}>Check My Eligibility — Free</Link>
            <a href="https://wa.me/447000000000" target="_blank" rel="noreferrer" className={styles.btnWhatsApp}>
              <span>💬</span> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Info Grid ── */}
      <section className={styles.infoSection}>
        <div className={styles.grid}>

          {/* Department emails */}
          <div className={styles.col}>
            <div className="section-label">Contact Departments</div>
            <h2 className={styles.colTitle}>Reach the Right Team</h2>
            <div className={styles.departments}>
              {departments.map(({ icon, title, emails, desc }) => (
                <div key={title} className={styles.deptCard}>
                  <div className={styles.deptIcon}>{icon}</div>
                  <div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                    <div className={styles.emails}>
                      {emails.map(email => (
                        <a key={email} href={`mailto:${email}`} className={styles.emailLink}>{email}</a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className={styles.col}>

            {/* Contact Form */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <span className={styles.infoIcon}>✉️</span>
                <h3>Send Us a Message</h3>
              </div>

              {status === 'success' ? (
                <p style={{ color: '#4ade80', fontWeight: 600 }}>✅ Message sent! We'll get back to you shortly.</p>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="Full Name" required
                    style={inputStyle}
                  />
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="Email Address" required
                    style={inputStyle}
                  />
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Phone Number (optional)"
                    style={inputStyle}
                  />
                  <input
                    name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Subject"
                    style={inputStyle}
                  />
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Your message…" required rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                  {status === 'error' && <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{errMsg}</p>}
                  <button type="submit" className={styles.btnGold} disabled={status === 'sending'} style={{ border: 'none', cursor: 'pointer' }}>
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* WhatsApp */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <span className={styles.infoIcon}>💬</span>
                <h3>WhatsApp Support</h3>
              </div>
              <p>Prefer to message? Reach our support team directly on WhatsApp for quick responses on your case.</p>
              <a href="https://wa.me/447000000000" target="_blank" rel="noreferrer" className={styles.whatsappBtn}>
                💬 Message Us on WhatsApp
              </a>
            </div>

            {/* Office Hours */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <span className={styles.infoIcon}>🕐</span>
                <h3>Office Hours</h3>
              </div>
              <div className={styles.hoursTable}>
                <div className={styles.hoursRow}>
                  <span>Monday – Saturday</span>
                  <span className={styles.hoursTime}>8:00 AM – 6:00 PM</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Sunday</span>
                  <span className={styles.hoursClosed}>Closed</span>
                </div>
              </div>
              <div className={styles.timezone}>🇬🇧 All times are UK time (GMT / BST)</div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '7px',
  padding: '10px 14px',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}
