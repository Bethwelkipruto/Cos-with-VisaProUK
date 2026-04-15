import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { useCounts } from '../CountsContext'

const LABELS = {
  '/admin':                ['Dashboard', 'Overview'],
  '/admin/users':          ['Dashboard', 'Users'],
  '/admin/messages':       ['Dashboard', 'Messages'],
  '/admin/applications':   ['Dashboard', 'Applications'],
  '/admin/content':        ['Dashboard', 'Content'],
  '/admin/media':          ['Dashboard', 'Media'],
  '/admin/payments':       ['Dashboard', 'Payments'],
  '/admin/analytics':      ['Dashboard', 'Analytics'],
  '/admin/notifications':  ['Dashboard', 'Notifications'],
  '/admin/roles':          ['Dashboard', 'Roles & Permissions'],
  '/admin/settings':       ['Dashboard', 'Settings'],
  '/admin/logs':           ['Dashboard', 'Logs'],
  '/admin/integrations':   ['Dashboard', 'Integrations'],
}

export default function AdminTopbar({ collapsed, onToggleSidebar }) {
  const { pathname } = useLocation()
  const { logout } = useAuth()
  const { counts } = useCounts()
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

      <button className="topbar-icon-btn" onClick={() => navigate('/admin/notifications')} title="Notifications" style={{ position: 'relative' }}>
        🔔
        {counts.notifications > 0 && (
          <span style={{
            position: 'absolute', top: '4px', right: '4px',
            background: 'var(--a-error)', color: '#fff',
            fontSize: '0.6rem', fontWeight: 700,
            borderRadius: '999px', minWidth: '16px', height: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 3px', lineHeight: 1,
          }}>
            {counts.notifications}
          </span>
        )}
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
