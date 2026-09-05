import Badge from '@/components/ui/Badge'
import { REQUEST_STATUS } from '@/lib/constants'

export default function StatusBadge({ status }) {
  const meta = REQUEST_STATUS[status] ?? { label: status, tone: 'neutral' }
  return (
    <Badge tone={meta.tone} dot>
      {meta.label}
    </Badge>
  )
}
