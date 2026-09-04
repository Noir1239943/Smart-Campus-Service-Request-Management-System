import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import StatusBadge from '@/components/features/requests/StatusBadge'
import { cn } from '@/lib/utils'

const RAIL_TONE = {
  pending: 'bg-warning',
  in_review: 'bg-info',
  completed: 'bg-success',
  rejected: 'bg-danger',
}

export default function RequestRow({ request }) {
  return (
    <Link
      to={`/requests/${request.id}`}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-card border border-border bg-surface pl-4 pr-4 py-4 transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:justify-between sm:pl-5"
    >
      <span
        className={cn('absolute inset-y-0 left-0 w-1', RAIL_TONE[request.status])}
        aria-hidden="true"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="font-display text-[15px] font-semibold text-ink">{request.type}</p>
          <span className="font-mono text-xs text-ink-faint">#{request.id}</span>
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
          <Building2 className="h-3.5 w-3.5" />
          {request.office}
        </p>
        <p className="mt-1.5 line-clamp-1 text-sm text-ink-muted">{request.description}</p>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-1.5">
        <StatusBadge status={request.status} />
        <p className="text-xs text-ink-faint">Updated {request.updated}</p>
      </div>
    </Link>
  )
}
