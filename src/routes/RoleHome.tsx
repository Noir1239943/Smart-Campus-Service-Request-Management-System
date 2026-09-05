import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import DashboardPage from '@/pages/Dashboard/DashboardPage'

export default function RoleHome() {
  // Guaranteed authenticated — this route only ever nests under RequireAuth.
  const { user } = useAuth()

  if (user!.role === 'admin' || user!.role === 'staff') {
    return <Navigate to="/admin" replace />
  }

  return <DashboardPage />
}
