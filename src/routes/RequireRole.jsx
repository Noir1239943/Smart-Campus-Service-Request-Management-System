import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function RequireRole({ allow, redirectTo = '/' }) {
  const { user } = useAuth()

  if (!allow.includes(user.role)) {
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
