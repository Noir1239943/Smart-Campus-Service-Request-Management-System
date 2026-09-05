import type { RequestStatus, BadgeTone } from '@/types'

export const REQUEST_STATUS: Record<RequestStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: 'Pending', tone: 'warning' },
  in_review: { label: 'In Review', tone: 'info' },
  completed: { label: 'Completed', tone: 'success' },
  rejected: { label: 'Rejected', tone: 'danger' },
}
