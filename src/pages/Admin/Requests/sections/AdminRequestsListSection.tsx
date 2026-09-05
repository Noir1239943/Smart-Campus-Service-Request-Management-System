import { SearchX } from 'lucide-react'
import AdminRequestRow from '@/components/features/requests/AdminRequestRow'
import EmptyState from '@/components/ui/EmptyState'
import type { ServiceRequest } from '@/types'

interface AdminRequestsListSectionProps {
  requests: ServiceRequest[]
  onUpdated?: (updated: ServiceRequest) => void
}

export default function AdminRequestsListSection({ requests, onUpdated }: AdminRequestsListSectionProps) {
  if (!requests.length) {
    return (
      <EmptyState
        icon={SearchX}
        title="No matching requests"
        description="Try a different search term or clear the status filter."
      />
    )
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <AdminRequestRow key={request.id} request={request} onUpdated={onUpdated} />
      ))}
    </div>
  )
}
