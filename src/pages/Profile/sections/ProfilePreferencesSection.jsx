import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

const TOGGLES = [
  { key: 'email', field: 'notify_email', label: 'Email notifications', hint: 'Get an email when a request status changes.' },
  { key: 'sms', field: 'notify_sms', label: 'SMS alerts', hint: 'Text alerts for urgent updates only.' },
  { key: 'digest', field: 'notify_weekly_digest', label: 'Weekly digest', hint: 'A Monday summary of all open requests.' },
]

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className={cn(
        'focus-ring relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50',
        checked ? 'bg-navy' : 'bg-border-strong'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        )}
      />
    </button>
  )
}

export default function ProfilePreferencesSection() {
  const { user, updateUser } = useAuth()
  const [pending, setPending] = useState(null)

  if (!user) return null

  const prefs = user.preferences ?? { email: true, sms: false, digest: true }

  async function handleToggle(key, field) {
    const next = !prefs[key]
    setPending(key)
    // optimistic update
    updateUser({ preferences: { ...prefs, [key]: next } })
    try {
      await api.patch('/profile', { [field]: next })
    } catch {
      // revert on failure
      updateUser({ preferences: { ...prefs, [key]: !next } })
    } finally {
      setPending(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification preferences</CardTitle>
      </CardHeader>
      <CardBody className="divide-y divide-border">
        {TOGGLES.map(({ key, field, label, hint }) => (
          <div key={key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-ink">{label}</p>
              <p className="mt-0.5 text-xs text-ink-muted">{hint}</p>
            </div>
            <Toggle
              checked={prefs[key]}
              onChange={() => handleToggle(key, field)}
              disabled={pending === key}
            />
          </div>
        ))}
      </CardBody>
    </Card>
  )
}
