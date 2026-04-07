import { useState } from 'react'
import { mockNotifications } from '../mockData'

export default function AdminNotifications() {
  const [notifs, setNotifs] = useState(mockNotifications)

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  function markRead(id) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function dismiss(id) {
    setNotifs(prev => prev.filter(n => n.id !== id))
  }

  const unread = notifs.filter(n => !n.read).length

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
            {unread > 0 && (
              <span className="sidebar-badge" style={{ marginLeft: '10px', position: 'static' }}>{unread} unread</span>
            )}
          </h3>
          {unread > 0 && (
            <button className="btn-admin btn-admin-ghost" onClick={markAllRead}>Mark all read</button>
          )}
        </div>

        {notifs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔔</div>
            <p>No notifications</p>
          </div>
        ) : (
          <div className="notif-list">
            {notifs.map(n => (
              <div key={n.id} className="notif-item">
                <div className={`notif-dot ${n.read ? 'read' : ''}`} />
                <div className="notif-text" style={{ fontWeight: n.read ? 400 : 600 }}>{n.message}</div>
                <div className="notif-time">{n.time}</div>
                <div className="btn-row" style={{ marginLeft: '8px' }}>
                  {!n.read && (
                    <button className="btn-admin btn-admin-ghost" style={{ padding: '4px 8px', fontSize: '0.72rem' }} onClick={() => markRead(n.id)}>
                      Read
                    </button>
                  )}
                  <button className="btn-admin btn-admin-danger" style={{ padding: '4px 8px', fontSize: '0.72rem' }} onClick={() => dismiss(n.id)}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
