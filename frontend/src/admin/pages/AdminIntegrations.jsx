import { useState } from 'react'
import { INTEGRATIONS } from '../mockData'

export default function AdminIntegrations() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS)

  function toggle(id) {
    setIntegrations(prev => prev.map(i =>
      i.id === id ? { ...i, status: i.status === 'Connected' ? 'Disconnected' : 'Connected' } : i
    ))
  }

  const connected    = integrations.filter(i => i.status === 'Connected').length
  const disconnected = integrations.filter(i => i.status === 'Disconnected').length

  return (
    <>
      <div className="admin-page-header">
        <h1>Integrations</h1>
        <p>Manage third-party services connected to Hc-One.</p>
      </div>

      <div className="stat-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-card-icon">🔗</div>
          <div className="stat-card-label">Connected</div>
          <div className="stat-card-value">{connected}</div>
          <div className="stat-card-sub up">Active services</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon">🔌</div>
          <div className="stat-card-label">Disconnected</div>
          <div className="stat-card-value">{disconnected}</div>
          <div className="stat-card-sub">Not configured</div>
        </div>
      </div>

      <div className="admin-grid-3">
        {integrations.map(i => (
          <div key={i.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.8rem' }}>{i.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{i.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--a-muted)' }}>{i.category}</div>
              </div>
              <span className={`badge badge-${i.status === 'Connected' ? 'active' : 'suspended'}`} style={{ marginLeft: 'auto' }}>
                {i.status}
              </span>
            </div>
            <button
              className={`btn-admin ${i.status === 'Connected' ? 'btn-admin-danger' : 'btn-admin-success'}`}
              onClick={() => toggle(i.id)}
              style={{ width: '100%' }}
            >
              {i.status === 'Connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
