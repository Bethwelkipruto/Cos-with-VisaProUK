import { testimonials } from '../data'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className="section-label">Client Stories</div>
        <h2 className="section-title">Trusted by Workers & Employers</h2>
        <p className="section-sub">Real experiences from people whose UK journey we helped make possible.</p>
      </div>
      <div className={styles.grid}>
        {testimonials.map(({ initials, name, role, text }) => (
          <div key={name} className={styles.card}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.text}>{text}</p>
            <div className={styles.author}>
              <div className={styles.avatar}>{initials}</div>
              <div>
                <div className={styles.name}>{name}</div>
                <div className={styles.role}>{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
