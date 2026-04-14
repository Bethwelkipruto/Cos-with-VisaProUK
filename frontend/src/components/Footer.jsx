import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const serviceLinks = [
  { label: 'Certificate of Sponsorship', to: '/services' },
  { label: 'Skilled Worker Visa',        to: '/visa-types' },
  { label: 'Health & Care Visa',         to: '/visa-types' },
  { label: 'Sponsor Licence',            to: '/services' },
  { label: 'Visa Extension & ILR',       to: '/services' },
  { label: 'Compliance Audit',           to: '/services' },
]

const resourceLinks = [
  { label: 'Eligibility Checker',      to: '/eligibility' },
  { label: 'CoS Document Checklist',   to: '/documents' },
  { label: 'Salary Threshold Guide',   to: '/documents' },
  { label: 'SOC Code Finder',          to: '/documents' },
  { label: 'Blog & Updates',           to: '/' },
  { label: 'UKVI Fee Calculator',      to: '/documents' },
]

const companyLinks = [
  { label: 'About HC-One',    to: '/' },
  { label: 'Our Advisers',      to: '/' },
  { label: 'OISC Registration', to: '/' },
  { label: 'Contact Us',        to: '/contact' },
  { label: 'Complaints Policy', to: '/' },
  { label: 'Privacy Policy',    to: '/' },
  { label: 'Admin Portal',      to: '/admin/login' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.flag}>🇬🇧</span> Hc-One
          </Link>
          <p>OISC-regulated UK immigration specialists helping employers and workers navigate the Certificate of Sponsorship and Skilled Worker Visa process with confidence.</p>
          <div className={styles.socials}>
            {['in', '𝕏', 'f', '▶'].map((s) => (
              <a key={s} href="#" className={styles.socialBtn}>{s}</a>
            ))}
          </div>
        </div>
        <FooterCol title="Services"   items={serviceLinks} />
        <FooterCol title="Resources"  items={resourceLinks} />
        <FooterCol title="Company"    items={companyLinks} />
      </div>
      <div className={styles.bottom}>
        <span>© 2025 HC-One Immigration Services Ltd</span>
        <span>
          <Link to="/">Privacy</Link> &nbsp;·&nbsp;
          <Link to="/">Terms</Link> &nbsp;·&nbsp;
          <Link to="/">Cookies</Link>
        </span>
        <span className={styles.disclaimer}>
          This website is for informational purposes only and does not constitute legal advice.
        </span>
      </div>
      <div className={styles.compliance}>
        <span>🏛️ OISC Regulated</span>
        <span>🔒 GDPR Compliant</span>
        <span>✅ UKVI Approved Sponsor</span>
        <span>📋 A-Rated Sponsor Licence</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }) {
  return (
    <div className={styles.col}>
      <h4>{title}</h4>
      <ul>
        {items.map(({ label, to }) => (
          <li key={label}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
