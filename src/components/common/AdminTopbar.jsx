import { Menu } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { useAuth } from '@/context/AuthContext'

const ROLE_BADGE_TONE = { admin: 'navy', staff: 'neutral' }
const ROLE_LABEL = { admin: 'Admin', staff: 'Staff' }

export default function AdminTopbar({ onMenuClick }) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="focus-ring rounded-md p-1.5 text-ink-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <p className="font-display text-sm font-semibold text-ink">Admin</p>

      <div className="ml-auto flex items-center gap-3">
        <Badge tone={ROLE_BADGE_TONE[user.role] ?? 'neutral'}>{ROLE_LABEL[user.role] ?? user.role}</Badge>
        <div className="flex items-center gap-2">
          <Avatar name={user.name} />
          <span className="hidden text-sm font-medium text-ink md:inline">{user.name}</span>
        </div>
      </div>
    </header>
  )
}
