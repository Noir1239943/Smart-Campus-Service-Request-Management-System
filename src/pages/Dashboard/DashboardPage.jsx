import { useEffect, useState } from 'react'
import WelcomeSection from '@/pages/Dashboard/sections/WelcomeSection'
import StatsSection from '@/pages/Dashboard/sections/StatsSection'
import RecentRequestsSection from '@/pages/Dashboard/sections/RecentRequestsSection'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ total: 0, awaiting: 0, completed: 0 })
  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .get('/dashboard')
      .then((data) => {
        if (cancelled) return
        setStats(data.stats)
        setRecentRequests(unwrapCollection(data.recent_requests))
      })
      .catch(() => !cancelled && setError('Could not load your dashboard right now.'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-8">
      <WelcomeSection studentName={user?.name ?? 'Student'} />

      {error && (
        <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-card border border-border bg-surface" />
          ))}
        </div>
      ) : (
        <>
          <StatsSection stats={stats} />
          <RecentRequestsSection requests={recentRequests} />
        </>
      )}
    </div>
  )
}
