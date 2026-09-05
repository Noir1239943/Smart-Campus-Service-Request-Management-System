import NotificationItem from '@/components/features/notifications/NotificationItem'
import type { Notification } from '@/types'

interface NotificationsListSectionProps {
  notifications: Notification[]
}

export default function NotificationsListSection({ notifications }: NotificationsListSectionProps) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
