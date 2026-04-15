import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { useCounts } from '../CountsContext'

export default function AdminSidebar({ collapsed, onCollapse, mobileOpen }) {
  const { user, logout } = useAuth()
  const { counts } = useCounts()
  const navigate = useNavigate()

  const NAV = [
    {
      section: 'Main',
      items: [
        { to: '/admin',             icon: '🏠', label: 'Dashboard' },
        { to: '/admin/users',       icon: '👥', label: 'Users' },
        { to: '/admin/messages',    icon: '✉️', label: 'Messages',     badge: counts.messages },
        { to: '/admin/applications',icon: '📋', label: 'Applications', badge: counts.applications },
        { to: '/admin/content',     icon: '📝', label: 'Content' },
        { to: '/admin/media',       icon: '🖼️', label: 'Media' },
      ],
    },
    {
      section: 'Finance',
      items: [
        { to: '/admin/payments',  icon: '💳', label: 'Payments',  badge: counts.payments },
        { to: '/admin/analytics', icon: '📊', label: 'Analytics' },
      ],
    },
    {
      section: 'System',
      items: [
        { to: '/admin/notifications', icon: '🔔', label: 'Notifications', badge: counts.notifications },
        { to: '/admin/roles',         icon: '🔐', label: 'Roles & Perms' },
        { to: '/admin/settings',      icon: '⚙️', label: 'Settings' },
        { to: '/admin/logs',          icon: '📋', label: 'Logs' },
        { to: '/admin/integrations',  icon: '🔗', label: 'Integrations' },
      ],
    },
  ]

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-logo">
        <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>🇬🇧</span>
        <div className="sidebar-label">
          <span className="sidebar-logo-text">Hc-One</span>
          <span className="sidebar-logo-sub">Admin Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            <div className="sidebar-section-label">{section}</div>
            {items.map(({ to, icon, label, badge }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/admin'}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{icon}</span>
                <span className="sidebar-label">{label}</span>
                {badge > 0 && <span className="sidebar-badge">{badge}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">{user?.name?.charAt(0)}</div>
        <div className="sidebar-label">
          <div className="sidebar-user-name">{user?.name}</div>
          <div className="sidebar-user-role">{user?.role}</div>
        </div>
        <button className="sidebar-collapse-btn" onClick={handleLogout} title="Logout">⏻</button>
      </div>
    </aside>
  )
}
