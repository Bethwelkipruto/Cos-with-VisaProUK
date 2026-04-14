import { useState } from 'react'
import styles from './FAQ.module.css'

const faqData = {
  General: [
    {
      q: 'What is a Certificate of Sponsorship?',
      a: 'A CoS is a unique reference number assigned by a UK-licensed sponsor employer using the UKVI Sponsorship Management System (SMS). It is not a physical document but contains details about the job offer, salary, occupation code, and sponsorship terms. The worker uses this reference number when applying for their visa.',
    },
    {
      q: 'What is the minimum salary for a Skilled Worker Visa?',
      a: 'As of April 2024, the general minimum salary threshold is £38,700 per year. Some shortage occupations and new entrant roles may have lower thresholds. Health & Care workers sponsored by the NHS or CQC-registered employers have separate provisions.',
    },
    {
      q: 'How long does the whole process take?',
      a: 'With our standard service, most cases complete within 3–6 weeks from initial assessment to visa decision. With priority processing, CoS can be assigned within 24–48 hours and visa decisions can come in as little as 5 working days.',
    },
  ],
  Employers: [
    {
      q: 'Can my company apply for a sponsor licence while a worker waits?',
      a: 'Yes. Standard UKVI processing is around 8 weeks, though a 10-working-day priority service is available for an additional fee. We can begin CoS preparation simultaneously to minimise delays once the licence is granted.',
    },
    {
      q: "What are the employer's ongoing sponsor duties?",
      a: 'Licensed sponsors must keep up-to-date records, report any changes to job roles or salary via the SMS, track worker absences, and co-operate with any UKVI compliance visits. Failure to meet these duties risks licence suspension or revocation.',
    },
    {
      q: 'What happens if we fail a UKVI compliance visit?',
      a: 'UKVI can downgrade your licence from A-rated to B-rated, suspend it, or revoke it entirely. We offer pre-audit mock inspections and a rapid remediation service to fix compliance gaps before or after a UKVI visit.',
    },
    {
      q: 'How many CoS can we assign per year?',
      a: 'Your annual CoS allocation is set when your licence is granted. If you need more, we can apply to UKVI for an increase via the SMS. Undefined CoS (for overseas workers) require a separate allocation request.',
    },
  ],
  Workers: [
    {
      q: 'Do I need IELTS for a Skilled Worker Visa?',
      a: 'Most Skilled Worker applicants must prove English language ability at B1 level or above through a UKVI-approved SELT. Exemptions exist for nationals of majority English-speaking countries, those with a degree taught in English, and workers switching from certain existing UK visas.',
    },
    {
      q: 'Can my family come with me on a Skilled Worker Visa?',
      a: 'Yes. Your spouse or civil partner, and children under 18, can apply as dependants on separate visa applications. Note: Health & Care Worker Visa holders sponsored for non-NHS roles cannot bring dependants as of 2024.',
    },
    {
      q: 'Can I switch employers once I have a Skilled Worker Visa?',
      a: 'Yes, but you must have a new CoS from your new employer and submit a new visa application before starting the new role. Your current visa is tied to your current sponsor — working for a different employer without a new visa is a breach of conditions.',
    },
    {
      q: 'What proof of funds do I need?',
      a: 'You must show you have at least £1,270 in your bank account, held for a continuous 28-day period ending no more than 31 days before your application date. Your sponsor can certify maintenance on your behalf to waive this requirement.',
    },
  ],
}

export default function FAQ() {
  const categories = Object.keys(faqData)
  const [activeTab, setActiveTab] = useState('General')
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = faqData[activeTab]

  const handleTab = (tab) => {
    setActiveTab(tab)
    setOpenIndex(0)
  }

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.sideCol}>
          <div className="section-label">Common Questions</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">The answers employers and applicants ask us most — in plain English.</p>
          <div className={styles.tabs}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.tab} ${activeTab === cat ? styles.tabActive : ''}`}
                onClick={() => handleTab(cat)}
              >
                {cat === 'General' && '💬 '}
                {cat === 'Employers' && '🏢 '}
                {cat === 'Workers' && '👤 '}
                {cat}
              </button>
            ))}
          </div>
          <div className={styles.stillNeedHelp}>
            <p>Still have questions?</p>
            <a href="/contact" className={styles.helpLink}>Speak to an adviser →</a>
          </div>
        </div>

        <div className={styles.accordionCol}>
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className={`${styles.item} ${openIndex === i ? styles.open : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className={styles.question}>
                <span>{q}</span>
                <span className={styles.icon}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <div className={styles.answer}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
