import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Users, Tags, BarChart3, Settings, X, LogOut } from 'lucide-react'
import Logo from '@/components/common/Logo'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true, roles: ['admin', 'staff'] },
  { to: '/admin/requests', label: 'All Requests', icon: FileText, roles: ['admin', 'staff'] },
  { to: '/admin/users', label: 'Users', icon: Users, roles: ['admin'] },
  { to: '/admin/categories', label: 'Categories', icon: Tags, roles: ['admin'] },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3, roles: ['admin'] },
  { to: '/admin/settings', label: 'Settings', icon: Settings, roles: ['admin'] },
]

export default function AdminSidebar({ open = false, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const navItems = NAV_ITEMS.filter((item) => item.roles.includes(user.role))

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform duration-200 lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="focus-ring rounded-md p-1 text-ink-muted lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  'focus-ring',
                  isActive
                    ? 'bg-navy-tint text-navy'
                    : 'text-ink-muted hover:bg-paper hover:text-ink'
                )
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-3 border-t border-border p-4">
          <button
            onClick={handleLogout}
            className="focus-ring flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-paper hover:text-danger"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
