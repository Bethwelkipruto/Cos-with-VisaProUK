import { visas } from '../data'
import styles from './VisaTypes.module.css'

export default function VisaTypes() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className="section-label">Visa Categories</div>
        <h2 className="section-title">Visa Routes We Support</h2>
        <p className="section-sub">All major sponsored worker routes under the UK Points-Based Immigration System.</p>
      </div>
      <div className={styles.grid}>
        {visas.map(({ type, title, desc, tags, featured }) => (
          <div key={title} className={`${styles.card} ${featured ? styles.featured : ''}`}>
            <div className={styles.type}>{type}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
