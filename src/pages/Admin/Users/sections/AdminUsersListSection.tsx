import { useState, type ChangeEvent } from 'react'
import { UserX } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { useAuth } from '@/context/AuthContext'
import { api, ApiError } from '@/lib/api'
import { unwrapItem } from '@/lib/unwrap'
import type { User, UserRole } from '@/types'

const ROLES: UserRole[] = ['student', 'staff', 'admin']

interface UserRowProps {
  user: User
  onUpdated?: (updated: User) => void
}

function UserRow({ user, onUpdated }: UserRowProps) {
  // Guaranteed authenticated — this section only renders under RequireAuth + RequireRole('admin').
  const { user: currentUser } = useAuth()
  const isSelf = user.id === currentUser!.id
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) {
    const role = event.target.value as UserRole
    setUpdating(true)
    setError(null)
    try {
      const data = await api.patch<unknown>(`/admin/users/${user.id}/role`, { role })
      onUpdated?.(unwrapItem<User>(data))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update this user.')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={user.name} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-[15px] font-semibold text-ink">{user.name}</p>
            {isSelf && <Badge tone="neutral">You</Badge>}
          </div>
          <p className="text-xs text-ink-muted">
            {user.student_id} · {user.email}
          </p>
          {error && <p className="mt-1 text-xs text-danger">{error}</p>}
        </div>
      </div>

      <Select
        value={user.role}
        onChange={handleRoleChange}
        disabled={updating || isSelf}
        className="h-9 w-32 shrink-0"
        aria-label={`Role for ${user.name}`}
      >
        {ROLES.map((role) => (
          <option key={role} value={role}>
            {role[0].toUpperCase() + role.slice(1)}
          </option>
        ))}
      </Select>
    </div>
  )
}

interface AdminUsersListSectionProps {
  users: User[]
  onUpdated?: (updated: User) => void
}

export default function AdminUsersListSection({ users, onUpdated }: AdminUsersListSectionProps) {
  if (!users.length) {
    return <EmptyState icon={UserX} title="No matching users" description="Try a different search term." />
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <UserRow key={user.id} user={user} onUpdated={onUpdated} />
      ))}
    </div>
  )
}
