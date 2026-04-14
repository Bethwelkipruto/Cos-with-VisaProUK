import { createContext, useContext, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('admin_user')) } catch { return null }
  })

  async function login(email, password) {
    try {
      const data = await api.login(email, password)
      const userWithToken = { ...data.user, token: data.token }
      setUser(userWithToken)
      sessionStorage.setItem('admin_user', JSON.stringify(userWithToken))
      return true
    } catch {
      return false
    }
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
