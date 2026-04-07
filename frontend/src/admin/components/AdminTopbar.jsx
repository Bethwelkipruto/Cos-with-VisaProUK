import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const LABELS = {
  '/admin':               ['Dashboard', 'Overview'],
  '/admin/users':         ['Dashboard', 'Users'],
  '/admin/content':       ['Dashboard', 'Content'],
  '/admin/media':         ['Dashboard', 'Media'],
  '/admin/payments':      ['Dashboard', 'Payments'],
  '/admin/analytics':     ['Dashboard', 'Analytics'],
  '/admin/notifications': ['Dashboard', 'Notifications'],
  '/admin/roles':         ['Dashboard', 'Roles & Permissions'],
  '/admin/settings':      ['Dashboard', 'Settings'],
  '/admin/logs':          ['Dashboard', 'Logs'],
  '/admin/integrations':  ['Dashboard', 'Integrations'],
}

export default function AdminTopbar({ collapsed, onToggleSidebar }) {
  const { pathname } = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [parent, current] = LABELS[pathname] ?? ['Dashboard', 'Page']

  return (
    <header className={`admin-topbar ${collapsed ? 'collapsed' : ''}`}>
      <button className="topbar-icon-btn" onClick={onToggleSidebar} title="Toggle sidebar">
        ☰
      </button>

      <div className="topbar-breadcrumb">
        {parent} / <span>{current}</span>
      </div>

      <div className="topbar-search">
        <span style={{ color: 'var(--a-muted)', fontSize: '0.85rem' }}>🔍</span>
        <input placeholder="Search…" />
      </div>

      <button className="topbar-icon-btn" onClick={() => navigate('/admin/notifications')} title="Notifications">
        🔔
        <span className="topbar-notif-dot" />
      </button>

      <button
        className="topbar-icon-btn"
        onClick={() => { logout(); navigate('/admin/login') }}
        title="Logout"
        style={{ fontSize: '0.8rem', padding: '6px 10px' }}
      >
        ⏻
      </button>
    </header>
  )
}
