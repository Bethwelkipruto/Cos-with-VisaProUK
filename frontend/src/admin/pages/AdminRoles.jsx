import { useState } from 'react'

const PERMISSIONS = [
  'View Dashboard',
  'Manage Users',
  'Create / Edit Content',
  'Delete Content',
  'View Payments',
  'Process Refunds',
  'Export Reports',
  'Manage Roles',
  'View Logs',
  'Manage Integrations',
  'System Settings',
]

const DEFAULT_ROLES = {
  Admin:  Object.fromEntries(PERMISSIONS.map(p => [p, true])),
  Editor: Object.fromEntries(PERMISSIONS.map(p => [p, ['View Dashboard','Create / Edit Content','View Payments'].includes(p)])),
  Viewer: Object.fromEntries(PERMISSIONS.map(p => [p, ['View Dashboard','View Payments'].includes(p)])),
}

const ROLE_COLORS = { Admin: 'badge-admin', Editor: 'badge-editor', Viewer: 'badge-viewer' }
const ROLE_DESC   = {
  Admin:  'Full unrestricted access to all system features and settings.',
  Editor: 'Can manage and publish content but cannot access financial or system settings.',
  Viewer: 'Read-only access. Cannot modify any data.',
}

export default function AdminRoles() {
  const [roles, setRoles] = useState(DEFAULT_ROLES)
  const [active, setActive] = useState('Admin')

  function toggle(perm) {
    if (active === 'Admin') return // Admin always has full access
    setRoles(prev => ({
      ...prev,
      [active]: { ...prev[active], [perm]: !prev[active][perm] },
    }))
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>Roles & Permissions</h1>
        <p>Define what each role can access and manage within the admin portal.</p>
      </div>

      {/* Role selector cards */}
      <div className="admin-grid-3" style={{ marginBottom: '24px' }}>
        {Object.keys(roles).map(role => (
          <div
            key={role}
            className="admin-card"
            style={{
              cursor: 'pointer',
              borderColor: active === role ? 'var(--a-gold)' : undefined,
              transition: 'border-color 0.2s',
            }}
            onClick={() => setActive(role)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className={`badge ${ROLE_COLORS[role]}`}>{role}</span>
              {active === role && <span style={{ fontSize: '0.72rem', color: 'var(--a-gold)' }}>● Selected</span>}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--a-muted)', lineHeight: 1.5 }}>{ROLE_DESC[role]}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--a-muted)', marginTop: '10px' }}>
              {Object.values(roles[role]).filter(Boolean).length} / {PERMISSIONS.length} permissions
            </p>
          </div>
        ))}
      </div>

      {/* Permission toggles */}
      <div className="admin-card">
        <h3>
          Permissions for <span className={`badge ${ROLE_COLORS[active]}`}>{active}</span>
          {active === 'Admin' && (
            <span style={{ fontSize: '0.72rem', color: 'var(--a-muted)', marginLeft: '10px', fontWeight: 400 }}>
              Admin always has full access
            </span>
          )}
        </h3>
        <div className="perm-grid">
          {PERMISSIONS.map(perm => {
            const on = roles[active][perm]
            return (
              <div key={perm} className="perm-row">
                <span>{perm}</span>
                <button
                  className={`perm-toggle ${on ? 'on' : 'off'}`}
                  onClick={() => toggle(perm)}
                  disabled={active === 'Admin'}
                  title={active === 'Admin' ? 'Admin always has full access' : ''}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
