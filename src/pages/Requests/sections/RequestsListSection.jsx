import { SearchX } from 'lucide-react'
import RequestRow from '@/components/features/requests/RequestRow'
import EmptyState from '@/components/ui/EmptyState'

export default function RequestsListSection({ requests }) {
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
        <RequestRow key={request.id} request={request} />
      ))}
    </div>
  )
}
