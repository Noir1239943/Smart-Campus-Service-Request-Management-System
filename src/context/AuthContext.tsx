import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { api, getToken, setToken } from '@/lib/api'
import { unwrapItem } from '@/lib/unwrap'
import type { User } from '@/types'

interface LoginPayload {
  studentId?: string
  email?: string
  password: string
}

interface RegisterPayload {
  name: string
  student_id: string
  email: string
  program: string
  password: string
  password_confirmation: string
}

interface AuthContextValue {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<User>
  register: (fields: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
  updateUser: (patch: Partial<User>) => void
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    if (!getToken()) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const data = await api.get<unknown>('/me')
      setUser(unwrapItem<User>(data))
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

  async function login({ studentId, email, password }: LoginPayload): Promise<User> {
    const payload = { password, ...(studentId ? { student_id: studentId } : { email }) }
    const data = await api.post<{ token: string; user: User }>('/login', payload)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  async function register(fields: RegisterPayload): Promise<void> {
    const data = await api.post<{ token: string }>('/register', fields)
    setToken(data.token)
    await loadUser()
  }

  async function logout(): Promise<void> {
    try {
      await api.post('/logout')
    } catch {
      // token may already be invalid — clear local state regardless
    }
    setToken(null)
    setUser(null)
  }

  function updateUser(patch: Partial<User>): void {
    setUser((current) => (current ? { ...current, ...patch } : current))
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, login, register, logout, updateUser, refresh: loadUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
