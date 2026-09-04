import { SearchX } from 'lucide-react'
import AdminRequestRow from '@/components/features/requests/AdminRequestRow'
import EmptyState from '@/components/ui/EmptyState'

export default function AdminRequestsListSection({ requests, onUpdated }) {
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
