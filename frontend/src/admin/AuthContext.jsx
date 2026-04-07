import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock admin credentials — replaced with real JWT auth when backend is ready
const MOCK_USERS = [
  { email: 'admin@hcone.co.uk',  password: 'admin123',  name: 'Admin User',   role: 'Admin',  initials: 'AU' },
  { email: 'editor@hcone.co.uk', password: 'editor123', name: 'Editor User',  role: 'Editor', initials: 'EU' },
  { email: 'viewer@hcone.co.uk', password: 'viewer123', name: 'Viewer User',  role: 'Viewer', initials: 'VU' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('admin_user')) } catch { return null }
  })

  function login(email, password) {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (!found) return false
    const { password: _, ...safe } = found
    setUser(safe)
    sessionStorage.setItem('admin_user', JSON.stringify(safe))
    return true
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('admin_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
