import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, getToken, setToken } from '@/lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    if (!getToken()) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const data = await api.get('/me')
      setUser(data.data ?? data)
    } catch {
      setToken(null)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  async function login({ studentId, email, password }) {
    const payload = { password, ...(studentId ? { student_id: studentId } : { email }) }
    const data = await api.post('/login', payload)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  async function register(fields) {
    const data = await api.post('/register', fields)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  async function logout() {
    try {
      await api.post('/logout')
    } catch {
      // token may already be invalid — clear local state regardless
    }
    setToken(null)
    setUser(null)
  }

  function updateUser(patch) {
    setUser((current) => ({ ...current, ...patch }))
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, register, logout, updateUser, refresh: loadUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
