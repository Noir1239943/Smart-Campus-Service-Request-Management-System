import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FileWarning } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import RequestOverviewSection from '@/pages/RequestDetails/sections/RequestOverviewSection'
import RequestTimelineSection from '@/pages/RequestDetails/sections/RequestTimelineSection'
import { api } from '@/lib/api'
import { unwrapItem } from '@/lib/unwrap'

export default function RequestDetailsPage() {
  const { id } = useParams()
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    api
      .get(`/requests/${id}`)
      .then((data) => !cancelled && setRequest(unwrapItem(data)))
      .catch(() => !cancelled && setError('Could not load this request.'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div className="space-y-6">
      <Link
        to="/requests"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to my requests
      </Link>

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-64 animate-pulse rounded-card border border-border bg-surface lg:col-span-2" />
          <div className="h-64 animate-pulse rounded-card border border-border bg-surface" />
        </div>
      ) : error || !request ? (
        <EmptyState
          icon={FileWarning}
          title="Request not found"
          description={error ?? "This request doesn't exist, or you don't have access to it."}
        />
      ) : (
        <>
          <PageHeader eyebrow="Request" title={request.type} description={`Filed with ${request.office}`} />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RequestOverviewSection request={request} />
            </div>
            <RequestTimelineSection request={request} />
          </div>
        </>
      )}
    </div>
  )
}
