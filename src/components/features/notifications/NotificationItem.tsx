import { CheckCircle2, Info, XCircle, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Notification } from '@/types'

const ICONS: Record<Notification['tone'], LucideIcon> = {
  success: CheckCircle2,
  info: Info,
  danger: XCircle,
}

const TONES: Record<Notification['tone'], string> = {
  success: 'bg-success-tint text-success',
  info: 'bg-info-tint text-info',
  danger: 'bg-danger-tint text-danger',
}

interface NotificationItemProps {
  notification: Notification
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const Icon = ICONS[notification.tone] ?? Info

  return (
    <div
      className={cn(
        'flex gap-3.5 rounded-card border border-border bg-surface p-4',
        notification.unread && 'ring-1 ring-navy/10'
      )}
    >
      <div
        className={cn(
          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          TONES[notification.tone]
        )}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-ink">{notification.title}</p>
          {notification.unread && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" aria-label="Unread" />
          )}
        </div>
        <p className="mt-1 text-sm text-ink-muted">{notification.detail}</p>
        <p className="mt-1.5 text-xs text-ink-faint">{notification.time}</p>
      </div>
    </div>
  )
}
