import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const servicesMenu = [
  { icon: '📜', label: 'Certificate of Sponsorship', to: '/services', slug: 'cos', desc: 'Defined & Undefined CoS assigned via SMS' },
  { icon: '🛂', label: 'Skilled Worker Visa', to: '/services', slug: 'skilled-worker', desc: 'Full application support, end-to-end' },
  { icon: '🏢', label: 'Sponsor Licence', to: '/services', slug: 'sponsor-licence', desc: 'New applications, renewals & expansions' },
  { icon: '🔄', label: 'Visa Extensions & ILR', to: '/services', slug: 'extensions-ilr', desc: 'Switch categories or apply for settlement' },
  { icon: '📊', label: 'Compliance Audits', to: '/services', slug: 'compliance', desc: 'Pre-UKVI inspection & HR system checks' },
  { icon: '🌍', label: 'Global Mobility', to: '/services', slug: 'global-mobility', desc: 'Intra-company transfers & business visitor rules' },
]

const visaMenu = [
  { icon: '⭐', label: 'Skilled Worker Visa', to: '/visa-types', slug: 'skilled-worker', desc: 'Most popular — leads to ILR after 5 years' },
  { icon: '🏥', label: 'Health & Care Worker', to: '/visa-types', slug: 'health-care', desc: 'Reduced fees for NHS & CQC-regulated roles' },
  { icon: '🏢', label: 'Senior / Specialist Worker', to: '/visa-types', slug: 'senior-specialist', desc: 'Intra-company transfers, no IELTS required' },
  { icon: '🎓', label: 'Graduate Trainee', to: '/visa-types', slug: 'graduate-trainee', desc: 'Short-term training programme transfers' },
  { icon: '🚀', label: 'Scale-Up Worker', to: '/visa-types', slug: 'scale-up', desc: 'Flexible route for high-growth businesses' },
]

const simpleLinks = [
  { to: '/process', label: 'Process' },
  { to: '/documents', label: 'Documents' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

function DropdownItem({ icon, label, desc, onClick }) {
  return (
    <button type="button" className={styles.dropItem} onClick={onClick}>
      <span className={styles.dropIcon}>{icon}</span>
      <span>
        <span className={styles.dropLabel}>{label}</span>
        <span className={styles.dropDesc}>{desc}</span>
      </span>
    </button>
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

  const navigate = useNavigate()

  const toggleDropdown = (name) => setActiveDropdown(prev => prev === name ? null : name)

  const handleMenuClick = (to, slug) => {
    setActiveDropdown(null)
    setOpen(false)
    navigate(`${to}#${slug}`)
  }

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
                <DropdownItem key={item.label} {...item} onClick={() => handleMenuClick(item.to, item.slug)} />
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
                <DropdownItem key={item.label} {...item} onClick={() => handleMenuClick(item.to, item.slug)} />
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className={styles.desktopCta}>
        <Link to="/eligibility" className={styles.cta}>Check Eligibility</Link>
        <Link to="/admin/login" className={styles.adminLink}>Admin</Link>
      </div>

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
              {servicesMenu.map(({ icon, label, to, slug }) => (
                <button key={label} type="button" className={styles.mobileSubLink} onClick={() => handleMenuClick(to, slug)}>
                  <span>{icon}</span> {label}
                </button>
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
              {visaMenu.map(({ icon, label, to, slug }) => (
                <button key={label} type="button" className={styles.mobileSubLink} onClick={() => handleMenuClick(to, slug)}>
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {simpleLinks.map(({ to, label }) => (
          <Link key={to} to={to} className={styles.mobileLink} onClick={() => setOpen(false)}>{label}</Link>
        ))}

        <div className={styles.mobileCtaWrap}>
          <Link to="/eligibility" className={styles.cta} onClick={() => setOpen(false)}>Check Eligibility</Link>
          <Link to="/admin/login" className={styles.adminLink} onClick={() => setOpen(false)}>Admin Login</Link>
        </div>
      </div>

      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
    </nav>
  )
}
