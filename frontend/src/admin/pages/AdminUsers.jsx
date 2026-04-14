import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { api } from '../../api'

const EMPTY = { name: '', email: '', role: 'Viewer', status: 'Active', password: '' }

export default function AdminUsers() {
  const { user: authUser } = useAuth()
  const isAdmin = authUser?.role === 'Admin'

  const [users, setUsers]   = useState([])
  const [search, setSearch] = useState('')
  const [modal, setModal]   = useState(null)
  const [form, setForm]     = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState('')

  useEffect(() => { fetchUsers() }, [])

  async function fetchUsers() {
    try {
      const data = await api.getUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  function openCreate() { setForm(EMPTY); setEditId(null); setModal('create') }
  function openEdit(u)  { setForm({ name: u.name, email: u.email, role: u.role, status: u.status, password: '' }); setEditId(u.id); setModal('edit') }

  async function saveUser() {
    try {
      if (modal === 'create') {
        const created = await api.createUser(form)
        setUsers(prev => [created, ...prev])
      } else {
        const updated = await api.updateUser(editId, form)
        setUsers(prev => prev.map(u => u.id === editId ? updated : u))
      }
      setModal(null)
    } catch (err) {
      alert(err.message)
    }
  }

  async function deleteUser(id) {
    if (!window.confirm('Delete this user?')) return
    try {
      await api.deleteUser(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  async function toggleStatus(u) {
    const newStatus = u.status === 'Active' ? 'Suspended' : 'Active'
    try {
      const updated = await api.updateUser(u.id, { ...u, status: newStatus })
      setUsers(prev => prev.map(x => x.id === u.id ? updated : x))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="admin-page-header"><p>Loading users…</p></div>
  if (error)   return <div className="admin-page-header"><p style={{ color: 'red' }}>{error}</p></div>

  return (
    <>
      <div className="admin-page-header">
        <h1>User Management</h1>
        <p>View, create, edit, suspend and manage all user accounts.</p>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <h3>All Users ({filtered.length})</h3>
          <div className="admin-table-search">
            <span style={{ color: 'var(--a-muted)' }}>🔍</span>
            <input placeholder="Search name or email…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {isAdmin && (
            <button className="btn-admin btn-admin-gold" onClick={openCreate}>+ Add User</button>
          )}
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Last Login</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td style={{ fontWeight: 600 }}>{u.name}</td>
                <td style={{ color: 'var(--a-muted)' }}>{u.email}</td>
                <td><span className={`badge badge-${u.role.toLowerCase()}`}>{u.role}</span></td>
                <td><span className={`badge badge-${u.status.toLowerCase()}`}>{u.status}</span></td>
                <td style={{ color: 'var(--a-muted)' }}>{u.joined?.slice(0, 10)}</td>
                <td style={{ color: 'var(--a-muted)' }}>{u.last_login ? u.last_login.slice(0, 10) : '—'}</td>
                {isAdmin && (
                  <td>
                    <div className="btn-row">
                      <button className="btn-admin btn-admin-ghost" onClick={() => openEdit(u)}>Edit</button>
                      <button
                        className={`btn-admin ${u.status === 'Active' ? 'btn-admin-danger' : 'btn-admin-success'}`}
                        onClick={() => toggleStatus(u)}
                      >
                        {u.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                      <button className="btn-admin btn-admin-danger" onClick={() => deleteUser(u.id)}>Delete</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <h2>{modal === 'create' ? 'Create New User' : 'Edit User'}</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" />
            </div>
            {modal === 'create' && (
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" />
              </div>
            )}
            <div className="form-group">
              <label>Role</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                <option>Admin</option><option>Editor</option><option>Viewer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option>Active</option><option>Suspended</option>
              </select>
            </div>
            <div className="btn-row" style={{ marginTop: '8px' }}>
              <button className="btn-admin btn-admin-gold" onClick={saveUser} style={{ flex: 1 }}>
                {modal === 'create' ? 'Create User' : 'Save Changes'}
              </button>
              <button className="btn-admin btn-admin-ghost" onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
