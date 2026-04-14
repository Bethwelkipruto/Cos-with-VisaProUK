import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const stats = [
  { num: '4,800+', label: 'CoS Assigned' },
  { num: '98.3%', label: 'Approval Rate' },
  { num: '3-6 Days', label: 'Avg Processing' },
  { num: '60+', label: 'Sponsor Employers' },
]

const trustItems = [
  '✅ UKVI Registered Sponsor',
  '⚖️ OISC Regulated Advisers',
  '🔒 GDPR Compliant',
  '📋 SMS & A-Rated Sponsors',
  '🏆 Trusted by FTSE 250 Employers',
]

const whyUs = [
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    desc: 'CoS assigned in as little as 3 days. Priority processing available for urgent cases.',
  },
  {
    icon: '🛡️',
    title: 'Full Compliance',
    desc: 'Every application is reviewed against the latest UKVI rules before submission.',
  },
  {
    icon: '👤',
    title: 'Dedicated Case Manager',
    desc: 'One point of contact from assessment to visa decision — no call centres.',
  },
  {
    icon: '💷',
    title: 'Transparent Pricing',
    desc: 'Fixed fees with no hidden charges. Full cost breakdown before you commit.',
  },
]

const miniSteps = [
  { num: '01', title: 'Free Assessment', desc: 'We check your eligibility and job offer against UKVI thresholds.' },
  { num: '02', title: 'CoS Assigned', desc: 'Your sponsor assigns the Certificate of Sponsorship via SMS.' },
  { num: '03', title: 'Visa Application', desc: 'We prepare and submit your full visa application with documents.' },
  { num: '04', title: 'Decision & Arrival', desc: 'Receive your visa decision and prepare for your UK start date.' },
]

export default function Home() {
  const scrollDown = () => {
    document.getElementById('trust-bar')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroLines} />
        <div className={styles.badge}>🇬🇧 Authorised UK Immigration Specialists</div>
        <h1>
          Your <em>Certificate of<br />Sponsorship</em> &<br />UK Visa, Simplified.
        </h1>
        <p>
          We help employers assign Certificates of Sponsorship and guide skilled workers
          through every step of the UK Skilled Worker Visa application — fast, compliant,
          and stress-free.
        </p>
        <div className={styles.btns}>
          <Link to="/eligibility" className="btn-primary">Check My Eligibility</Link>
          <Link to="/process" className="btn-outline">How It Works →</Link>
        </div>
        <div className={styles.stats}>
          {stats.map(({ num, label }) => (
            <div key={label} className={styles.stat}>
              <div className={styles.num}>{num}</div>
              <div className={styles.label}>{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll chevron */}
        <button className={styles.scrollChevron} onClick={scrollDown} aria-label="Scroll down">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </section>

      <div id="trust-bar" className={styles.trustBar}>
        {trustItems.map((item) => (
          <div key={item} className={styles.trustItem}>{item}</div>
        ))}
      </div>

      {/* ── Mini How It Works ── */}
      <section className={styles.miniProcess}>
        <div className={styles.miniHeader}>
          <div className="section-label">Simple Process</div>
          <h2 className="section-title">From Application to UK Arrival in 4 Steps</h2>
        </div>
        <div className={styles.miniSteps}>
          {miniSteps.map(({ num, title, desc }, i) => (
            <div key={num} className={styles.miniStep}>
              <div className={styles.miniNum}>{num}</div>
              {i < miniSteps.length - 1 && <div className={styles.miniConnector} />}
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <div className={styles.miniCta}>
          <Link to="/process" className="btn-outline">See Full Process →</Link>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className={styles.whySection}>
        <div className={styles.whyHeader}>
          <div className="section-label">Why HC-One</div>
          <h2 className="section-title">The Smarter Way to Handle UK Sponsorship</h2>
          <p className="section-sub">
            We combine immigration expertise with a streamlined process so employers and
            workers spend less time on paperwork and more time on what matters.
          </p>
        </div>
        <div className={styles.whyGrid}>
          {whyUs.map(({ icon, title, desc }) => (
            <div key={title} className={styles.whyCard}>
              <div className={styles.whyIcon}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={styles.ctaInner}>
          <div className="section-label">Get Started Today</div>
          <h2>Ready to Begin Your UK Visa Journey?</h2>
          <p>
            Check your eligibility in minutes or speak directly with a case manager.
            No obligation, no jargon — just clear, expert guidance.
          </p>
          <div className={styles.ctaBtns}>
            <Link to="/eligibility" className="btn-primary">Check My Eligibility — Free</Link>
            <Link to="/contact" className="btn-outline">Speak to an Adviser →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
