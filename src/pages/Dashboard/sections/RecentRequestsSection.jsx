import { Link } from 'react-router-dom'
import RecentRequestsList from '@/components/features/dashboard/RecentRequestsList'

export default function RecentRequestsSection({ requests }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Recent requests</h2>
        <Link to="/requests" className="focus-ring text-sm font-medium text-navy hover:underline">
          View all
        </Link>
      </div>
      <RecentRequestsList requests={requests} />
    </div>
  )
}
