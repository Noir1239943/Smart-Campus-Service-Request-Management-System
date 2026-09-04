import { Link } from 'react-router-dom'
import { Inbox } from 'lucide-react'
import StatusBadge from '@/components/features/requests/StatusBadge'
import EmptyState from '@/components/ui/EmptyState'

export default function AdminRecentActivitySection({ requests }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Recent activity</h2>
        <Link to="/admin/requests" className="focus-ring text-sm font-medium text-navy hover:underline">
          View all
        </Link>
      </div>

      {!requests.length ? (
        <EmptyState icon={Inbox} title="No requests yet" description="Submitted requests will show up here." />
      ) : (
        <div className="space-y-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col gap-3 rounded-card border border-border bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="font-display text-[15px] font-semibold text-ink">{request.type}</p>
                  <span className="font-mono text-xs text-ink-faint">#{request.id}</span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">
                  {request.requester?.name ?? 'Unknown'} · {request.office}
                </p>
              </div>
              <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-1.5">
                <StatusBadge status={request.status} />
                <p className="text-xs text-ink-faint">Updated {request.updated}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
