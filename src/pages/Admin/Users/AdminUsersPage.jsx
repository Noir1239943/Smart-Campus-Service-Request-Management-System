import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import PageHeader from '@/components/common/PageHeader'
import AdminUsersListSection from '@/pages/Admin/Users/sections/AdminUsersListSection'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'

export default function AdminUsersPage() {
  const [query, setQuery] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const params = new URLSearchParams()
    if (query) params.set('search', query)

    const timeout = setTimeout(() => {
      api
        .get(`/admin/users?${params.toString()}`)
        .then((data) => {
          if (cancelled) return
          setUsers(unwrapCollection(data))
          setError(null)
        })
        .catch(() => !cancelled && setError('Could not load users right now.'))
        .finally(() => !cancelled && setLoading(false))
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [query])

  function handleUpdated(updatedUser) {
    setUsers((current) => current.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Admin" title="Users" description="Every registered account and its role." />

      <div className="relative max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, ID, or email…"
          className="focus-ring h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus-visible:border-navy"
        />
      </div>

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
        <AdminUsersListSection users={users} onUpdated={handleUpdated} />
      )}
    </div>
  )
}
