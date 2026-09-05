import Badge from '@/components/ui/Badge'
import { REQUEST_STATUS } from '@/lib/constants'
import type { BadgeTone, RequestStatus } from '@/types'

interface StatusBadgeProps {
  status: RequestStatus | string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const meta = REQUEST_STATUS[status as RequestStatus] ?? ({ label: status, tone: 'neutral' } as { label: string; tone: BadgeTone })
  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  )
}
