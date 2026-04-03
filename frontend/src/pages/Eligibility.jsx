import styles from './Eligibility.module.css'

export default function Eligibility() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Based on your answers, you appear eligible! A case manager will contact you within 24 hours.')
  }

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className="section-label" style={{ textAlign: 'center' }}>Quick Check</div>
        <h2 className="section-title" style={{ textAlign: 'center', maxWidth: '100%' }}>
          Am I Eligible for a UK Skilled Worker Visa?
        </h2>
        <p>Answer a few quick questions and we'll provide an instant eligibility assessment — completely free.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label>Current Nationality</label>
            <select>
              <option>Select nationality…</option>
              <option>Nigerian</option>
              <option>Indian</option>
              <option>Pakistani</option>
              <option>Filipino</option>
              <option>South African</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.group}>
            <label>Job Offer / Occupation</label>
            <select>
              <option>Select occupation…</option>
              <option>Software Engineer</option>
              <option>Registered Nurse</option>
              <option>Civil Engineer</option>
              <option>Accountant</option>
              <option>Chef (Skilled)</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.group}>
            <label>Offered Annual Salary (£)</label>
            <input type="number" placeholder="e.g. 42000" />
          </div>
          <div className={styles.group}>
            <label>English Language Proficiency</label>
            <select>
              <option>Select…</option>
              <option>IELTS 4.0+ (B1 level)</option>
              <option>Degree from English-speaking country</option>
              <option>British/Irish citizen</option>
              <option>Not yet assessed</option>
            </select>
          </div>
          <div className={styles.group}>
            <label>Do You Have a Job Offer?</label>
            <select>
              <option>Select…</option>
              <option>Yes — from a licensed UK sponsor</option>
              <option>Yes — employer not yet licensed</option>
              <option>No job offer yet</option>
            </select>
          </div>
          <div className={styles.group}>
            <label>Desired Start Date</label>
            <input type="date" />
          </div>
          <button type="submit" className={styles.btn}>Check My Eligibility — Free →</button>
        </form>
      </div>
    </section>
  )
}
