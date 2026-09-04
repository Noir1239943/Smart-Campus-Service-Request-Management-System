import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import RequestsFilterSection from '@/pages/Requests/sections/RequestsFilterSection'
import AdminRequestsListSection from '@/pages/Admin/Requests/sections/AdminRequestsListSection'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'

export default function AdminRequestsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (query) params.set('search', query)

    const timeout = setTimeout(() => {
      api
        .get(`/admin/requests?${params.toString()}`)
        .then((data) => {
          if (cancelled) return
          setRequests(unwrapCollection(data))
          setError(null)
        })
        .catch(() => !cancelled && setError('Could not load requests right now.'))
        .finally(() => !cancelled && setLoading(false))
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [query, statusFilter])

  function handleUpdated(updatedRequest) {
    setRequests((current) => current.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin"
        title="All Requests"
        description="Every request filed across every campus office — update status as it moves."
      />

      <RequestsFilterSection
        query={query}
        onQueryChange={setQuery}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />

      {error && (
        <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-card border border-border bg-surface" />
          ))}
        </div>
      ) : (
        <AdminRequestsListSection requests={requests} onUpdated={handleUpdated} />
      )}
    </div>
  )
}
