import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import Button from '@/components/ui/Button'
import RequestsFilterSection from '@/pages/Requests/sections/RequestsFilterSection'
import RequestsListSection from '@/pages/Requests/sections/RequestsListSection'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'
import type { ServiceRequest } from '@/types'

export default function RequestsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const params = new URLSearchParams()
    if (statusFilter !== 'all') params.set('status', statusFilter)
    if (query) params.set('search', query)

    // Debounce the search box so we're not firing a request per keystroke.
    const timeout = setTimeout(() => {
      api
        .get<unknown>(`/requests?${params.toString()}`)
        .then((data) => {
          if (cancelled) return
          setRequests(unwrapCollection<ServiceRequest>(data))
          setError(null)
        })
        .catch(() => !cancelled && setError('Could not load your requests right now.'))
        .finally(() => !cancelled && setLoading(false))
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [query, statusFilter])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Requests"
        title="My Requests"
        description="Every request you've filed with a campus office, and where it stands."
        action={
          <Button as={Link} to="/requests/new" icon={PlusCircle}>
            New request
          </Button>
        }
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
        <RequestsListSection requests={requests} />
      )}
    </div>
  )
}
