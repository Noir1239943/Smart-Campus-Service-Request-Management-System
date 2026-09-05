import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'
import { useAuth } from '@/context/AuthContext'
import type { Notification } from '@/types'

export function useNotificationsCount(): number {
  const { isAuthenticated } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isAuthenticated) return

    let cancelled = false

    api
      .get<unknown>('/notifications')
      .then((data) => {
        if (cancelled) return
        const items = unwrapCollection<Notification>(data)
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
