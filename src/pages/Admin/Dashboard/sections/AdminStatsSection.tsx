import { FileText, Clock, CheckCircle2, Users } from 'lucide-react'
import StatCard from '@/components/features/dashboard/StatCard'
import { useAuth } from '@/context/AuthContext'
import type { AdminDashboardStats } from '@/types'

interface AdminStatsSectionProps {
  stats: AdminDashboardStats
}

export default function AdminStatsSection({ stats }: AdminStatsSectionProps) {
  // Guaranteed authenticated — this section only renders under RequireAuth + RequireRole.
  const { user } = useAuth()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total requests" value={stats.total} icon={FileText} tone="navy" />
      <StatCard label="Awaiting action" value={stats.awaiting} icon={Clock} tone="gold" />
      <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} tone="success" />
      {user!.role === 'admin' && (
        <StatCard label="Total users" value={stats.total_users} icon={Users} tone="info" />
      )}
    </div>
  )
}
