import { useState, type FormEvent } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, ApiError } from '@/lib/api'
import { unwrapItem } from '@/lib/unwrap'
import { useAuth } from '@/context/AuthContext'
import type { User } from '@/types'

export default function ProfileInfoSection() {
  const { user, updateUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setSaved(false)
    setError(null)

    const elements = event.currentTarget.elements
    const payload = {
      name: (elements.namedItem('name') as HTMLInputElement).value,
      program: (elements.namedItem('program') as HTMLInputElement).value,
      year_level: (elements.namedItem('year-level') as HTMLInputElement).value,
      email: (elements.namedItem('email') as HTMLInputElement).value,
      contact_number: (elements.namedItem('contact') as HTMLInputElement).value,
    }

    try {
      const data = await api.patch<unknown>('/profile', payload)
      updateUser(unwrapItem<User>(data))
      setSaved(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save your changes.')
    } finally {
      setSaving(false)
    }
  }

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal information</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} size="lg" />
            <div>
              <p className="font-display text-base font-semibold text-ink">{user.name}</p>
              <p className="text-sm text-ink-muted">
                {user.program} · {user.year_level}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="name" name="name" label="Full name" defaultValue={user.name} />
            <Input id="student-id" label="Student ID" defaultValue={user.student_id} disabled />
            <Input id="program" name="program" label="Program" defaultValue={user.program} />
            <Input id="year-level" name="year-level" label="Year level" defaultValue={user.year_level} />
            <Input id="email" name="email" type="email" label="Email address" defaultValue={user.email} />
            <Input id="contact" name="contact" label="Contact number" defaultValue={user.contact_number} />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
              {error}
            </p>
          )}
          {saved && (
            <p role="status" className="rounded-lg bg-success-tint px-4 py-3 text-sm text-success">
              Your changes have been saved.
            </p>
          )}

          <div className="flex justify-end border-t border-border pt-5">
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
