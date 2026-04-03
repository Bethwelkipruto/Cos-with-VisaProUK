import { processSteps, timeline } from '../data'
import styles from './Process.module.css'

export default function Process() {
  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div>
          <div className="section-label">The Process</div>
          <h2 className="section-title">From Offer Letter to UK Entry</h2>
          <p className="section-sub">A clear, predictable process with dedicated case managers at every stage.</p>
          <div className={styles.steps}>
            {processSteps.map(({ num, title, desc }) => (
              <div key={num} className={styles.step}>
                <div className={styles.stepNum}>{num}</div>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <h3>Typical Timeline</h3>
          {timeline.map(({ tag, title, desc }, i) => (
            <div key={tag} className={styles.tlItem}>
              <div className={styles.tlDot} />
              {i < timeline.length - 1 && <div className={styles.tlLine} />}
              <div>
                <div className={styles.tlTag}>{tag}</div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </div>
          ))}
          <div className={styles.priorityNote}>
            ⚡ <strong>Priority Processing Available</strong> — 5-day super-priority visa decisions for an additional UKVI fee.
          </div>
        </div>
      </div>
    </section>
  )
}
