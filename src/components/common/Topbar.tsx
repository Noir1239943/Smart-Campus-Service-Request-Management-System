import { Link } from 'react-router-dom'
import { Menu, Search, Bell } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import { useAuth } from '@/context/AuthContext'
import { useNotificationsCount } from '@/hooks/useNotificationsCount'

interface TopbarProps {
  onMenuClick?: () => void
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { user } = useAuth()
  const unreadCount = useNotificationsCount()
  const studentName = user?.name ?? 'Student'

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="focus-ring rounded-md p-1.5 text-ink-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          placeholder="Search your requests…"
          className="focus-ring h-10 w-full rounded-lg border border-border bg-paper pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus-visible:border-navy"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="focus-ring relative rounded-full p-2 text-ink-muted hover:bg-paper hover:text-ink"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </Link>
        <Link to="/profile" className="focus-ring flex items-center gap-2 rounded-full">
          <Avatar name={studentName} />
          <span className="hidden text-sm font-medium text-ink md:inline">{studentName}</span>
        </Link>
      </div>
    </header>
  )
}
