import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const servicesMenu = [
  { icon: '📜', label: 'Certificate of Sponsorship', to: '/services', desc: 'Defined & Undefined CoS assigned via SMS' },
  { icon: '🛂', label: 'Skilled Worker Visa', to: '/services', desc: 'Full application support, end-to-end' },
  { icon: '🏢', label: 'Sponsor Licence', to: '/services', desc: 'New applications, renewals & expansions' },
  { icon: '🔄', label: 'Visa Extensions & ILR', to: '/services', desc: 'Switch categories or apply for settlement' },
  { icon: '📊', label: 'Compliance Audits', to: '/services', desc: 'Pre-UKVI inspection & HR system checks' },
  { icon: '🌍', label: 'Global Mobility', to: '/services', desc: 'Intra-company transfers & business visitor rules' },
]

const visaMenu = [
  { icon: '⭐', label: 'Skilled Worker Visa', to: '/visa-types', desc: 'Most popular — leads to ILR after 5 years' },
  { icon: '🏥', label: 'Health & Care Worker', to: '/visa-types', desc: 'Reduced fees for NHS & CQC-regulated roles' },
  { icon: '🏢', label: 'Senior / Specialist Worker', to: '/visa-types', desc: 'Intra-company transfers, no IELTS required' },
  { icon: '🎓', label: 'Graduate Trainee', to: '/visa-types', desc: 'Short-term training programme transfers' },
  { icon: '🚀', label: 'Scale-Up Worker', to: '/visa-types', desc: 'Flexible route for high-growth businesses' },
]

const simpleLinks = [
  { to: '/process', label: 'Process' },
  { to: '/documents', label: 'Documents' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

function DropdownItem({ icon, label, to, desc, onClick }) {
  return (
    <Link to={to} className={styles.dropItem} onClick={onClick}>
      <span className={styles.dropIcon}>{icon}</span>
      <span>
        <span className={styles.dropLabel}>{label}</span>
        <span className={styles.dropDesc}>{desc}</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'services' | 'visa' | null
  const location = useLocation()
  const dropRef = useRef(null)

  useEffect(() => { setOpen(false); setActiveDropdown(null) }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleDropdown = (name) => setActiveDropdown(prev => prev === name ? null : name)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`} ref={dropRef}>
      <Link to="/" className={styles.logo}>
        <span className={styles.flag}>🇬🇧</span> HC-One
      </Link>

      {/* Desktop nav */}
      <ul className={styles.desktopLinks}>
        {/* Services dropdown */}
        <li className={styles.hasDropdown}>
          <button
            className={`${styles.dropTrigger} ${activeDropdown === 'services' ? styles.dropTriggerOpen : ''}`}
            onClick={() => toggleDropdown('services')}
            onMouseEnter={() => setActiveDropdown('services')}
            aria-expanded={activeDropdown === 'services'}
          >
            Services <span className={styles.chevron}>›</span>
          </button>
          <div className={`${styles.dropdown} ${activeDropdown === 'services' ? styles.dropdownOpen : ''}`}
            onMouseLeave={() => setActiveDropdown(null)}>
            <div className={styles.dropGrid}>
              {servicesMenu.map(item => (
                <DropdownItem key={item.label} {...item} onClick={() => setActiveDropdown(null)} />
              ))}
            </div>
            <div className={styles.dropFooter}>
              <Link to="/services" onClick={() => setActiveDropdown(null)}>View all services →</Link>
            </div>
          </div>
        </li>

        {/* Visa Types dropdown */}
        <li className={styles.hasDropdown}>
          <button
            className={`${styles.dropTrigger} ${activeDropdown === 'visa' ? styles.dropTriggerOpen : ''}`}
            onClick={() => toggleDropdown('visa')}
            onMouseEnter={() => setActiveDropdown('visa')}
            aria-expanded={activeDropdown === 'visa'}
          >
            Visa Types <span className={styles.chevron}>›</span>
          </button>
          <div className={`${styles.dropdown} ${styles.dropdownNarrow} ${activeDropdown === 'visa' ? styles.dropdownOpen : ''}`}
            onMouseLeave={() => setActiveDropdown(null)}>
            <div className={styles.dropList}>
              {visaMenu.map(item => (
                <DropdownItem key={item.label} {...item} onClick={() => setActiveDropdown(null)} />
              ))}
            </div>
            <div className={styles.dropFooter}>
              <Link to="/visa-types" onClick={() => setActiveDropdown(null)}>Compare all visa routes →</Link>
            </div>
          </div>
        </li>

        {simpleLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link to="/eligibility" className={`${styles.cta} ${styles.desktopCta}`}>Check Eligibility</Link>

      {/* Hamburger */}
      <button
        className={styles.burger}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className={`${styles.burgerLine} ${open ? styles.burgerTop : ''}`} />
        <span className={`${styles.burgerLine} ${open ? styles.burgerMid : ''}`} />
        <span className={`${styles.burgerLine} ${open ? styles.burgerBot : ''}`} />
      </button>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        {/* Services accordion */}
        <div className={styles.mobileGroup}>
          <button className={styles.mobileGroupBtn} onClick={() => toggleDropdown('services')}>
            Services
            <span className={`${styles.mobileChevron} ${activeDropdown === 'services' ? styles.mobileChevronOpen : ''}`}>›</span>
          </button>
          {activeDropdown === 'services' && (
            <div className={styles.mobileSubmenu}>
              {servicesMenu.map(({ icon, label, to }) => (
                <Link key={label} to={to} className={styles.mobileSubLink} onClick={() => setOpen(false)}>
                  <span>{icon}</span> {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Visa Types accordion */}
        <div className={styles.mobileGroup}>
          <button className={styles.mobileGroupBtn} onClick={() => toggleDropdown('visa')}>
            Visa Types
            <span className={`${styles.mobileChevron} ${activeDropdown === 'visa' ? styles.mobileChevronOpen : ''}`}>›</span>
          </button>
          {activeDropdown === 'visa' && (
            <div className={styles.mobileSubmenu}>
              {visaMenu.map(({ icon, label, to }) => (
                <Link key={label} to={to} className={styles.mobileSubLink} onClick={() => setOpen(false)}>
                  <span>{icon}</span> {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {simpleLinks.map(({ to, label }) => (
          <Link key={to} to={to} className={styles.mobileLink} onClick={() => setOpen(false)}>{label}</Link>
        ))}

        <div className={styles.mobileCtaWrap}>
          <Link to="/eligibility" className={styles.cta} onClick={() => setOpen(false)}>Check Eligibility</Link>
        </div>
      </div>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </nav>
  )
}
