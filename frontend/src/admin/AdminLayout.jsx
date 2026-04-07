import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import AdminSidebar from './components/AdminSidebar'
import AdminTopbar from './components/AdminTopbar'
import './admin.css'

export default function AdminLayout() {
  const { user } = useAuth()
  const [collapsed, setCollapsed]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!user) return <Navigate to="/admin/login" replace />

  function toggleSidebar() {
    if (window.innerWidth <= 768) setMobileOpen(o => !o)
    else setCollapsed(o => !o)
  }

  return (
    <div className="admin-root">
      <div className="admin-shell">
        {mobileOpen && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
        <AdminSidebar
          collapsed={collapsed}
          onCollapse={() => setCollapsed(o => !o)}
          mobileOpen={mobileOpen}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <AdminTopbar collapsed={collapsed} onToggleSidebar={toggleSidebar} />
          <main className={`admin-main ${collapsed ? 'collapsed' : ''}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
