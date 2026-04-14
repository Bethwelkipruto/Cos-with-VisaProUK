import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/visa-types', label: 'Visa Types' },
  { to: '/documents', label: 'Documents' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        <span className={styles.flag}>🇬🇧</span> HC-One
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
