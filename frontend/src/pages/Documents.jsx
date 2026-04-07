import { Link } from 'react-router-dom'
import { employerDocs, workerDocs, fees } from '../data'
import styles from './Documents.module.css'

export default function Documents() {
  return (
    <section className={styles.section}>
      <div className="section-label">Preparation</div>
      <h2 className="section-title">Documents You Will Need</h2>
      <p className="section-sub">
        A complete checklist for both employers assigning a CoS and workers submitting the visa application.
      </p>
      <div className={styles.layout}>
        <div>
          <DocCategory title="For the Employer (CoS Assignment)" docs={employerDocs} />
          <DocCategory title="For the Worker (Visa Application)" docs={workerDocs} />
        </div>
        <div className={styles.sidebar}>
          <h3>Fee Summary (2025–30)</h3>
          <table className={styles.table}>
            <tbody>
              {fees.map(({ label, amount }) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{amount}</td>
                </tr>
              ))}
              <tr className={styles.total}>
                <td>Typical Total (5yr, no dependants)</td>
                <td>£6,700+</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.note}>
            ⚠️ Fees shown are approximate UKVI government fees only. Always verify on GOV.UK before applying.
          </div>
          <Link to="/eligibility" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '24px' }}>
            Get a Full Quote →
          </Link>
        </div>
      </div>
    </section>
  )
}

function DocCategory({ title, docs }) {
  return (
    <div className={styles.category}>
      <h4>{title}</h4>
      <div className={styles.list}>
        {docs.map(({ icon, name, req }) => (
          <div key={name} className={styles.item}>
            <span>{icon}</span>
            <span className={styles.name}>{name}</span>
            <span className={`${styles.req} ${req === 'Optional' || req === 'If applicable' ? styles.optional : ''}`}>
              {req}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
