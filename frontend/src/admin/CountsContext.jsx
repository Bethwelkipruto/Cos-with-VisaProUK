import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api'

const CountsContext = createContext({})

export function CountsProvider({ children }) {
  const [counts, setCounts] = useState({ messages: 0, applications: 0, notifications: 0, payments: 0 })

  async function refresh() {
    try {
      const [messages, applications, notifications, payments] = await Promise.all([
        api.getMessages(),
        api.getApplications(),
        api.getNotifications(),
        api.getPayments(),
      ])
      setCounts({
        messages:      messages.length,
        applications:  applications.filter(a => a.status === 'Pending').length,
        notifications: notifications.filter(n => !n.read).length,
        payments:      payments.filter(p => p.status === 'Pending').length,
      })
    } catch {}
  }

  useEffect(() => { refresh() }, [])

  return (
    <CountsContext.Provider value={{ counts, refresh }}>
      {children}
    </CountsContext.Provider>
  )
}

export function useCounts() {
  return useContext(CountsContext)
}
