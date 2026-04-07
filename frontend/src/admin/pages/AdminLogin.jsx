import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const ok = login(email, password)
      if (ok) { navigate('/admin') }
      else    { setError('Invalid email or password.'); setLoading(false) }
    }, 600)
  }

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <div className="admin-login-logo">
          <h1>🇬🇧 Hc-One</h1>
          <p>Immigration Services Ltd — Admin Portal</p>
        </div>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="admin@hcone.co.uk"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-admin btn-admin-gold"
            style={{ width: '100%', padding: '11px', marginTop: '8px', fontSize: '0.9rem' }}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p style={{ fontSize: '0.72rem', color: 'var(--a-muted)', textAlign: 'center', marginTop: '20px' }}>
          Demo — admin@hcone.co.uk / admin123
        </p>
      </div>
    </div>
  )
}
