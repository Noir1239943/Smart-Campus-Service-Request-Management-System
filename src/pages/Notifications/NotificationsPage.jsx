import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import NotificationsListSection from '@/pages/Notifications/sections/NotificationsListSection'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .get('/notifications')
      .then((data) => !cancelled && setNotifications(unwrapCollection(data)))
      .catch(() => !cancelled && setError('Could not load your notifications right now.'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Notifications"
        title="Notifications"
        description="Updates on your requests, in the order they happened."
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
        <NotificationsListSection notifications={notifications} />
      )}
    </div>
  )
}
