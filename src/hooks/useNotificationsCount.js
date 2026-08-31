import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

export function useNotificationsCount() {
  const { isAuthenticated } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isAuthenticated) return

    let cancelled = false

    api
      .get('/notifications')
      .then((data) => {
        if (cancelled) return
        const items = data.data ?? data
        setCount(items.filter((n) => n.unread).length)
      })
      .catch(() => {
        // fail quietly — the badge just won't show
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated])

  return count
}
