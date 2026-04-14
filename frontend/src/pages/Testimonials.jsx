import { testimonials } from '../data'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className="section-label">Client Stories</div>
        <h2 className="section-title">Trusted by Workers & Employers</h2>
        <p className="section-sub">Real experiences from people whose UK journey we helped make possible.</p>
        <div className={styles.ratingBar}>
          <div className={styles.ratingScore}>
            <span className={styles.ratingNum}>4.9</span>
            <span className={styles.ratingStars}>★★★★★</span>
            <span className={styles.ratingLabel}>Average Rating</span>
          </div>
          <div className={styles.ratingDivider} />
          <div className={styles.ratingScore}>
            <span className={styles.ratingNum}>98.3%</span>
            <span className={styles.ratingLabel}>Visa Approval Rate</span>
          </div>
          <div className={styles.ratingDivider} />
          <div className={styles.ratingScore}>
            <span className={styles.ratingNum}>4,800+</span>
            <span className={styles.ratingLabel}>Successful Cases</span>
          </div>
        </div>
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
