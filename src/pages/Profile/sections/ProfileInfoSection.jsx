import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, ApiError } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'

export default function ProfileInfoSection() {
  const { user, updateUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setSaved(false)
    setError(null)

    const form = event.target
    const payload = {
      name: form.elements.name.value,
      program: form.elements.program.value,
      year_level: form.elements['year-level'].value,
      email: form.elements.email.value,
      contact_number: form.elements.contact.value,
    }

    try {
      const data = await api.patch('/profile', payload)
      updateUser(data.data ?? data)
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
