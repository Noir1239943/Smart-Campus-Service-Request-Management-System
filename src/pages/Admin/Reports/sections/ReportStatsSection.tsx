import { Clock, Eye, CheckCircle2, XCircle, type LucideIcon } from 'lucide-react'
import StatCard, { type StatCardTone } from '@/components/features/dashboard/StatCard'
import type { RequestStatus, ReportData } from '@/types'

interface CardConfig {
  key: RequestStatus
  label: string
  icon: LucideIcon
  tone: StatCardTone
}

const CARDS: CardConfig[] = [
  { key: 'pending', label: 'Pending', icon: Clock, tone: 'gold' },
  { key: 'in_review', label: 'In review', icon: Eye, tone: 'info' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, tone: 'success' },
  { key: 'rejected', label: 'Rejected', icon: XCircle, tone: 'danger' },
]

interface ReportStatsSectionProps {
  byStatus: ReportData['by_status']
}

export default function ReportStatsSection({ byStatus }: ReportStatsSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map(({ key, label, icon, tone }) => (
        <StatCard key={key} label={label} value={byStatus[key] ?? 0} icon={icon} tone={tone} />
      ))}
    </div>
  )
}
