import { Building2, Calendar, Paperclip } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import StatusBadge from '@/components/features/requests/StatusBadge'

export default function RequestOverviewSection({ request }) {
  return (
    <Card>
      <CardBody className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-ink-faint">#{request.id}</p>
            <h2 className="mt-1 font-display text-xl font-semibold text-ink">
              {request.subject || request.type}
            </h2>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-ink-faint" />
            {request.office}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-ink-faint" />
            Submitted {request.submitted}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-ink-faint" />
            Last updated {request.updated}
          </span>
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-ink">Details</p>
          <p className="text-sm leading-relaxed text-ink-muted">{request.details || request.description}</p>
        </div>

        {request.attachment_url && (
          <a
            href={request.attachment_url}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border-strong bg-paper px-3.5 py-2.5 text-sm font-medium text-navy hover:border-navy"
          >
            <Paperclip className="h-4 w-4" />
            {request.attachment_name || 'View attachment'}
          </a>
        )}
      </CardBody>
    </Card>
  )
}
