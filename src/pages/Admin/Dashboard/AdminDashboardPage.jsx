import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import AdminStatsSection from '@/pages/Admin/Dashboard/sections/AdminStatsSection'
import AdminRecentActivitySection from '@/pages/Admin/Dashboard/sections/AdminRecentActivitySection'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ total: 0, awaiting: 0, completed: 0, total_users: 0 })
  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .get('/admin/dashboard')
      .then((data) => {
        if (cancelled) return
        setStats(data.stats)
        setRecentRequests(unwrapCollection(data.recent_requests))
      })
      .catch(() => !cancelled && setError('Could not load the dashboard right now.'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin"
        title="Dashboard"
        description="A live view of every request filed across campus offices."
      />

      {error && (
        <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-card border border-border bg-surface" />
          ))}
        </div>
      ) : (
        <>
          <AdminStatsSection stats={stats} />
          <AdminRecentActivitySection requests={recentRequests} />
        </>
      )}
    </div>
  )
}
