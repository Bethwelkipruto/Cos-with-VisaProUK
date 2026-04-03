import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const serviceLinks = [
  'Certificate of Sponsorship', 'Skilled Worker Visa', 'Health & Care Visa',
  'Sponsor Licence', 'Visa Extension & ILR', 'Compliance Audit',
]
const resourceLinks = [
  'Eligibility Checker', 'CoS Document Checklist', 'Salary Threshold Guide',
  'SOC Code Finder', 'Blog & Updates', 'UKVI Fee Calculator',
]
const companyLinks = [
  'About BritPath', 'Our Advisers', 'OISC Registration',
  'Contact Us', 'Complaints Policy', 'Privacy Policy',
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}><span className={styles.flag}>🇬🇧</span> BritPath</div>
          <p>OISC-regulated UK immigration specialists helping employers and workers navigate the Certificate of Sponsorship and Skilled Worker Visa process with confidence.</p>
          <div className={styles.socials}>
            {['in', '𝕏', 'f', '▶'].map((s) => (
              <a key={s} href="#" className={styles.socialBtn}>{s}</a>
            ))}
          </div>
        </div>
        <FooterCol title="Services" items={serviceLinks} />
        <FooterCol title="Resources" items={resourceLinks} />
        <FooterCol title="Company" items={companyLinks} />
      </div>
      <div className={styles.bottom}>
        <span>© 2025 BritPath Immigration Services Ltd. All rights reserved. OISC Reg No. F12345678</span>
        <span>
          <Link to="/privacy">Privacy</Link> &nbsp;·&nbsp;
          <Link to="/terms">Terms</Link> &nbsp;·&nbsp;
          <Link to="/cookies">Cookies</Link>
        </span>
        <span className={styles.disclaimer}>
          This website is for informational purposes only and does not constitute legal advice.
        </span>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }) {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}><a href="#">{item}</a></li>
        ))}
      </ul>
    </div>
  )
}
