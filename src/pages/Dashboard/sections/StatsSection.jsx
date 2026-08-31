import { FileText, Clock, CheckCircle2 } from 'lucide-react'
import StatCard from '@/components/features/dashboard/StatCard'

export default function StatsSection({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="Total requests" value={stats.total} icon={FileText} tone="navy" />
      <StatCard label="Awaiting action" value={stats.awaiting} icon={Clock} tone="gold" />
      <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} tone="success" />
    </div>
  )
}
