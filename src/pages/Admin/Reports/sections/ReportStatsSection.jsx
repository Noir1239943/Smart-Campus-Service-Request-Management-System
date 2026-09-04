import { Clock, Eye, CheckCircle2, XCircle } from 'lucide-react'
import StatCard from '@/components/features/dashboard/StatCard'

const CARDS = [
  { key: 'pending', label: 'Pending', icon: Clock, tone: 'gold' },
  { key: 'in_review', label: 'In review', icon: Eye, tone: 'info' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, tone: 'success' },
  { key: 'rejected', label: 'Rejected', icon: XCircle, tone: 'danger' },
]

export default function ReportStatsSection({ byStatus }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map(({ key, label, icon, tone }) => (
        <StatCard key={key} label={label} value={byStatus[key] ?? 0} icon={icon} tone={tone} />
      ))}
    </div>
  )
}
