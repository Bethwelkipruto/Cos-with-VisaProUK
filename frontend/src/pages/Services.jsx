import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { services } from '../data'
import styles from './Services.module.css'
import PaymentModal from '../components/PaymentModal'

// Prices per service (GBP — shown on Pay Now button)
const servicePrices = {
  'Certificate of Sponsorship (CoS)':  627,
  'Skilled Worker Visa Application':   985,
  'Sponsor Licence Applications':      1500,
  'Visa Extensions & ILR':             985,
  'Compliance Audits':                 750,
  'Global Mobility Consulting':        500,
}

// Must match the slugs in Navbar servicesMenu
const serviceSlugs = [
  'cos',
  'skilled-worker',
  'sponsor-licence',
  'extensions-ilr',
  'compliance',
  'global-mobility',
]

const serviceDetails = {
  'Certificate of Sponsorship (CoS)': [
    'Defined & Undefined CoS assigned via UKVI SMS',
    'Full occupation code (SOC 2020) verification',
    'Salary threshold compliance check',
    'Same-day assignment for urgent cases',
    'Dedicated case manager throughout',
  ],
  'Skilled Worker Visa Application': [
    'Document checklist & preparation support',
    'Online application completion & review',
    'IHS payment guidance & biometrics booking',
    'Priority & super-priority service available',
    'Post-decision debrief & entry guidance',
  ],
  'Sponsor Licence Applications': [
    'Eligibility assessment before submission',
    'HR systems & record-keeping audit',
    'Full application drafting & submission',
    'Priority 10-working-day service available',
    'Post-approval SMS training for HR teams',
  ],
  'Visa Extensions & ILR': [
    'Skilled Worker visa extension applications',
    'Category switching (e.g. student to worker)',
    'Indefinite Leave to Remain (ILR) applications',
    'Continuous residence calculation support',
    'Naturalisation guidance after ILR',
  ],
  'Compliance Audits': [
    'Pre-UKVI inspection mock audit',
    'Right-to-work document review',
    'SMS record accuracy checks',
    'Staff training on sponsor duties',
    'Written compliance action plan provided',
  ],
  'Global Mobility Consulting': [
    'Intra-company transfer strategy',
    'Business visitor rule guidance',
    'Multi-jurisdiction right-to-work advice',
    'Policy drafting for global HR teams',
    'Ongoing retainer support available',
  ],
}

export default function Services() {
  const [expanded, setExpanded] = useState(null)
  const [payment, setPayment] = useState(null) // { service, amount }
  const location = useLocation()

  // When the URL hash changes (e.g. /services#cos), scroll to that card and expand it
  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (!hash) return

    const slugIndex = serviceSlugs.indexOf(hash)
    if (slugIndex === -1) return

    const title = services[slugIndex]?.title
    if (title) setExpanded(title)

    // Small delay so the DOM has rendered the expanded panel before scrolling
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 24
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 80)
  }, [location.hash])

  const toggle = (title) => setExpanded(prev => prev === title ? null : title)
  const openPayment = (title) => setPayment({ service: title, amount: servicePrices[title] || 500 })

  return (
    <section className={styles.services}>
      <div className={styles.header}>
        <div className="section-label">What We Do</div>
        <h2 className="section-title">End-to-End Sponsorship & Visa Services</h2>
        <p className="section-sub">
          From obtaining a sponsor licence to visa approval — we manage the entire journey
          for employers and applicants alike. Click any service to see what's included.
        </p>
      </div>
      <div className={styles.grid}>
        {services.map(({ icon, title, desc }, i) => {
          const isOpen = expanded === title
          const details = serviceDetails[title] || []
          const slug = serviceSlugs[i]
          return (
            <div
              key={title}
              id={slug}
              className={`${styles.card} ${i === 0 ? styles.featured : ''} ${isOpen ? styles.cardOpen : ''}`}
            >
              {i === 0 && <div className={styles.popularBadge}>⭐ Most Requested</div>}
              <div className={styles.cardTop}>
                <div className={styles.icon}>{icon}</div>
                <div className={styles.cardBody}>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
                <button
                  className={`${styles.expandBtn} ${isOpen ? styles.expandBtnOpen : ''}`}
                  onClick={() => toggle(title)}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? 'Collapse' : 'Expand'}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className={`${styles.expandPanel} ${isOpen ? styles.expandPanelOpen : ''}`}>
                <div className={styles.expandInner}>
                  <p className={styles.expandTitle}>What's included:</p>
                  <ul className={styles.detailList}>
                    {details.map(d => (
                      <li key={d}>
                        <span className={styles.tick}>✓</span> {d}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.expandActions}>
                    <Link to="/eligibility" className={styles.expandCta}>Get started →</Link>
                    <button
                      className={styles.payBtn}
                      onClick={() => openPayment(title)}
                    >
                      💳 Pay Now — £{servicePrices[title] || 500}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {payment && (
        <PaymentModal
          isOpen={!!payment}
          onClose={() => setPayment(null)}
          amount={payment.amount}
          currency="GBP"
          service={payment.service}
          userName="Guest"
        />
      )}
    </section>
  )
}
