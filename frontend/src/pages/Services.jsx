import { services } from '../data'
import styles from './Services.module.css'

export default function Services() {
  return (
    <section className={styles.services}>
      <div className={styles.header}>
        <div className="section-label">What We Do</div>
        <h2 className="section-title">End-to-End Sponsorship & Visa Services</h2>
        <p className="section-sub">
          From obtaining a sponsor licence to visa approval — we manage the entire journey
          for employers and applicants alike.
        </p>
      </div>
      <div className={styles.grid}>
        {services.map(({ icon, title, desc }, i) => (
          <div key={title} className={`${styles.card} ${i === 0 ? styles.featured : ''}`}>
            {i === 0 && <div className={styles.popularBadge}>⭐ Most Requested</div>}
            <div className={styles.icon}>{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span className={styles.link}>Learn more →</span>
          </div>
        ))}
      </div>
    </section>
  )
}
