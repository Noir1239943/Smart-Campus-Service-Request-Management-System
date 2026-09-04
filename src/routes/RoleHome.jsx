import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import DashboardPage from '@/pages/Dashboard/DashboardPage'

export default function RoleHome() {
  const { user } = useAuth()

  if (user.role !== 'student') {
    return <Navigate to="/admin" replace />
  }

  return <DashboardPage />
}
