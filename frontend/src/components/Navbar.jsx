import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/visa-types', label: 'Visa Types' },
  { to: '/documents', label: 'Documents' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => setOpen(false), [location])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <span className={styles.flag}>🇬🇧</span> BritPath
      </Link>

      <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={({ isActive }) => isActive ? styles.active : ''}>
              {label}
            </NavLink>
          </li>
        ))}
        <li className={styles.mobileCtaItem}>
          <Link to="/eligibility" className={styles.cta}>Check Eligibility</Link>
        </li>
      </ul>

      <Link to="/eligibility" className={`${styles.cta} ${styles.desktopCta}`}>Check Eligibility</Link>

      <button
        className={styles.burger}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className={`${styles.burgerLine} ${open ? styles.burgerTop : ''}`} />
        <span className={`${styles.burgerLine} ${open ? styles.burgerMid : ''}`} />
        <span className={`${styles.burgerLine} ${open ? styles.burgerBot : ''}`} />
      </button>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </nav>
  )
}
