import NotificationItem from '@/components/features/notifications/NotificationItem'

export default function NotificationsListSection({ notifications }) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
