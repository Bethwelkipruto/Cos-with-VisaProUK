import { useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data'
import styles from './Services.module.css'

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

  const toggle = (title) => setExpanded(prev => prev === title ? null : title)

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
          return (
            <div key={title} className={`${styles.card} ${i === 0 ? styles.featured : ''} ${isOpen ? styles.cardOpen : ''}`}>
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
                  <Link to="/eligibility" className={styles.expandCta}>Get started →</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
