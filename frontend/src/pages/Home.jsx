import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const stats = [
  { num: '4,800+', label: 'CoS Assigned' },
  { num: '98.3%', label: 'Approval Rate' },
  { num: '12 Days', label: 'Avg Processing' },
  { num: '60+', label: 'Sponsor Employers' },
]

const trustItems = [
  '✅ UKVI Registered Sponsor',
  '⚖️ OISC Regulated Advisers',
  '🔒 GDPR Compliant',
  '📋 SMS & A-Rated Sponsors',
  '🏆 Trusted by FTSE 250 Employers',
]

export default function Home() {
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
      </section>

      <div className={styles.trustBar}>
        {trustItems.map((item) => (
          <div key={item} className={styles.trustItem}>{item}</div>
        ))}
      </div>
    </>
  )
}
