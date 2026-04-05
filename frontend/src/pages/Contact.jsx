import { Link } from 'react-router-dom'
import styles from './Contact.module.css'

const departments = [
  {
    icon: '📧',
    title: 'General Enquiries',
    emails: ['info@visaglobal.co.uk'],
    desc: 'For any general questions about our services.',
  },
  {
    icon: '👥',
    title: 'HR / Recruitment Desk',
    emails: ['recruitment@visaglobal.co.uk', 'hr@visaglobal.co.uk'],
    desc: 'Employer onboarding, recruitment partnerships and HR support.',
  },
  {
    icon: '📜',
    title: 'CoS Processing',
    emails: ['cos@visaglobal.co.uk'],
    desc: 'Certificate of Sponsorship assignments and SMS queries.',
  },
  {
    icon: '🛟',
    title: 'Support / Help',
    emails: ['support@visaglobal.co.uk'],
    desc: 'Technical issues, case updates and urgent assistance.',
  },
]

export default function Contact() {
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
            <a
              href="https://wa.me/447000000000"
              target="_blank"
              rel="noreferrer"
              className={styles.btnWhatsApp}
            >
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
                      {emails.map((email) => (
                        <a key={email} href={`mailto:${email}`} className={styles.emailLink}>
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — WhatsApp + Hours + Address */}
          <div className={styles.col}>

            {/* WhatsApp */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <span className={styles.infoIcon}>💬</span>
                <h3>WhatsApp Support</h3>
              </div>
              <p>Prefer to message? Reach our support team directly on WhatsApp for quick responses on your case.</p>
              <a
                href="https://wa.me/447000000000"
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappBtn}
              >
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

            {/* Office Address */}
            <div className={styles.infoCard}>
              <div className={styles.infoCardHeader}>
                <span className={styles.infoIcon}>📍</span>
                <h3>Office Address</h3>
              </div>
              <address className={styles.address}>
                <strong>VisaGlobal</strong><br />
                Recruitment and Immigration Services<br />
                Birmingham<br />
                United Kingdom
              </address>
              <a
                href="https://maps.google.com/?q=Birmingham,United+Kingdom"
                target="_blank"
                rel="noreferrer"
                className={styles.mapLink}
              >
                📍 View on Google Maps →
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
