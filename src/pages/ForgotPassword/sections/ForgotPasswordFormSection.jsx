import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KeyRound, ArrowLeft } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, ApiError } from '@/lib/api'

export default function ForgotPasswordFormSection() {
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = event.target
    const isEmail = identifier.includes('@')
    const payload = {
      ...(isEmail ? { email: identifier } : { student_id: identifier }),
      password: form.elements.password.value,
      password_confirmation: form.elements['password-confirmation'].value,
    }

    try {
      await api.post('/reset-password', payload)
      setDone(true)
      setTimeout(() => navigate('/login', { replace: true }), 1500)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to reset your password. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>

      <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Reset your password</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Enter your Student ID or email, then choose a new password.
      </p>

      {done ? (
        <p role="status" className="mt-8 rounded-lg bg-success-tint px-4 py-3 text-sm text-success">
          Password reset. Redirecting you to sign in…
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input
            id="identifier"
            label="Student ID or Email"
            placeholder="ID or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <Input id="password" type="password" label="New password" placeholder="••••••••" required />
          <Input
            id="password-confirmation"
            type="password"
            label="Confirm new password"
            placeholder="••••••••"
            required
          />

          {error && (
            <p role="alert" className="rounded-lg bg-danger-tint px-3.5 py-2.5 text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit" icon={KeyRound} className="w-full" disabled={submitting}>
            {submitting ? 'Resetting…' : 'Reset password'}
          </Button>
        </form>
      )}
    </div>
  )
}
