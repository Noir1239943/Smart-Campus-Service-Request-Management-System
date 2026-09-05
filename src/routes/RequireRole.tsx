import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { UserRole } from '@/types'

interface RequireRoleProps {
  allow: UserRole[]
  redirectTo?: string
}

export default function RequireRole({ allow, redirectTo = '/' }: RequireRoleProps) {
  // Guaranteed authenticated — this route only ever nests under RequireAuth.
  const { user } = useAuth()

  if (!allow.includes(user!.role)) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
