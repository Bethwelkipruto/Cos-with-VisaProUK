import { useState } from 'react'
import { faqs } from '../data'
import styles from './FAQ.module.css'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div>
          <div className="section-label">Common Questions</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">The answers employers and applicants ask us most — in plain English.</p>
        </div>
        <div>
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className={`${styles.item} ${open === i ? styles.open : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className={styles.question}>
                {q}
                <span className={styles.icon}>+</span>
              </div>
              <div className={styles.answer}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
