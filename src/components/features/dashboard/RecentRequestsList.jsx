import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import RequestRow from '@/components/features/requests/RequestRow'
import EmptyState from '@/components/ui/EmptyState'

export default function RecentRequestsList({ requests }) {
  if (!requests.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No requests yet"
        description="Once you submit a request, it'll show up here so you can track its status."
        action={
          <Link
            to="/requests/new"
            className="focus-ring text-sm font-medium text-navy underline underline-offset-4"
          >
            Submit your first request
          </Link>
        }
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
