import { useState } from 'react'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName:        'Hc-One Immigration Services Ltd',
    supportEmail:    'support@hcone.co.uk',
    maintenanceMode: false,
    emailNotifs:     true,
    twoFactor:       false,
    autoBackup:      true,
  })

  function toggle(key) {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function save(e) {
    e.preventDefault()
    alert('Settings saved successfully.')
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>Settings</h1>
        <p>Configure system preferences and admin portal behaviour.</p>
      </div>

      <div className="admin-grid-2">
        {/* General settings */}
        <div className="admin-card">
          <form onSubmit={save}>
            <div className="settings-section">
              <h3>General</h3>
              <div className="form-group">
                <label>Site Name</label>
                <input
                  value={settings.siteName}
                  onChange={e => setSettings(s => ({ ...s, siteName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={e => setSettings(s => ({ ...s, supportEmail: e.target.value }))}
                />
              </div>
            </div>
            <button type="submit" className="btn-admin btn-admin-gold" style={{ width: '100%' }}>
              Save Changes
            </button>
          </form>
        </div>

        {/* Toggle settings */}
        <div className="admin-card">
          <div className="settings-section">
            <h3>System</h3>
            {[
              { key: 'maintenanceMode', label: 'Maintenance Mode',    desc: 'Take the site offline for maintenance' },
              { key: 'emailNotifs',     label: 'Email Notifications', desc: 'Send email alerts to admin on key events' },
              { key: 'twoFactor',       label: 'Two-Factor Auth',     desc: 'Require 2FA for all admin logins' },
              { key: 'autoBackup',      label: 'Auto Backup',         desc: 'Daily automated database backups' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="settings-row">
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{label}</div>
                  <div className="settings-row-label">{desc}</div>
                </div>
                <button
                  className={`perm-toggle ${settings[key] ? 'on' : 'off'}`}
                  onClick={() => toggle(key)}
                  type="button"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="admin-card" style={{ marginTop: '20px', borderColor: 'rgba(239,68,68,0.3)' }}>
        <h3 style={{ color: 'var(--a-error)' }}>Danger Zone</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn-admin btn-admin-danger" onClick={() => alert('Cache cleared.')}>
            Clear Cache
          </button>
          <button className="btn-admin btn-admin-danger" onClick={() => alert('This would wipe all data. Disabled in demo.')}>
            Reset All Data
          </button>
        </div>
      </div>
    </>
  )
}
