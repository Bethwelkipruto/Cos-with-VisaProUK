import { Link } from 'react-router-dom'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section className={styles.section}>
      <h2>Ready to Start Your UK Journey?</h2>
      <p>Speak to one of our specialist immigration advisers today. Initial consultation is completely free.</p>
      <div className={styles.btns}>
        <Link to="/eligibility" className={styles.btnWhite}>Book Free Consultation</Link>
        <a href="tel:+442012345678" className={styles.btnOutline}>📞 Call +44 (0) 20 1234 5678</a>
      </div>
    </section>
  )
}
