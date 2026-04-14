import { useState, useEffect } from 'react'
import { api } from '../../api'

export default function AdminNotifications() {
  const [notifs, setNotifs]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getNotifications()
      .then(setNotifs)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  async function markRead(id) {
    await api.markRead(id)
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  async function markAllRead() {
    await api.markAllRead()
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  async function dismiss(id) {
    await api.dismissNotification(id)
    setNotifs(prev => prev.filter(n => n.id !== id))
  }

  const unread = notifs.filter(n => !n.read).length

  if (loading) return <div className="admin-page-header"><p>Loading notifications…</p></div>

  return (
    <>
      <div className="admin-page-header">
        <h1>Notifications</h1>
        <p>System and user activity notifications.</p>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, flex: 1 }}>
            All Notifications
            {unread > 0 && <span className="sidebar-badge" style={{ marginLeft: '10px', position: 'static' }}>{unread} unread</span>}
          </h3>
          {unread > 0 && <button className="btn-admin btn-admin-ghost" onClick={markAllRead}>Mark all read</button>}
        </div>

        {notifs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔔</div>
            <p>No notifications yet.</p>
          </div>
        ) : (
          <div className="notif-list">
            {notifs.map(n => (
              <div key={n.id} className="notif-item">
                <div className={`notif-dot ${n.read ? 'read' : ''}`} />
                <div className="notif-text" style={{ fontWeight: n.read ? 400 : 600 }}>{n.message}</div>
                <div className="notif-time">{new Date(n.created_at).toLocaleDateString()}</div>
                <div className="btn-row" style={{ marginLeft: '8px' }}>
                  {!n.read && (
                    <button className="btn-admin btn-admin-ghost" style={{ padding: '4px 8px', fontSize: '0.72rem' }} onClick={() => markRead(n.id)}>Read</button>
                  )}
                  <button className="btn-admin btn-admin-danger" style={{ padding: '4px 8px', fontSize: '0.72rem' }} onClick={() => dismiss(n.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
