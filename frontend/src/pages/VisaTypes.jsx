import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { visas } from '../data'
import styles from './VisaTypes.module.css'

// Must match the slugs in Navbar visaMenu
const visaSlugs = [
  'skilled-worker',
  'health-care',
  'senior-specialist',
  'graduate-trainee',
  'scale-up',
  'other-routes',
]

export default function VisaTypes() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (!hash) return

    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) {
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64
        const top = el.getBoundingClientRect().top + window.scrollY - navH - 24
        window.scrollTo({ top, behavior: 'smooth' })
        // Briefly highlight the card
        el.classList.add(styles.highlight)
        setTimeout(() => el.classList.remove(styles.highlight), 1800)
      }
    }, 80)
  }, [location.hash])

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className="section-label">Visa Categories</div>
        <h2 className="section-title">Visa Routes We Support</h2>
        <p className="section-sub">All major sponsored worker routes under the UK Points-Based Immigration System.</p>
      </div>
      <div className={styles.grid}>
        {visas.map(({ type, title, desc, tags, featured }, i) => (
          <div
            key={title}
            id={visaSlugs[i]}
            className={`${styles.card} ${featured ? styles.featured : ''}`}
          >
            <div className={styles.type}>{type}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
