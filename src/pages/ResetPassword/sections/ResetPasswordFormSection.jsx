import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, ApiError } from '@/lib/api'

export default function ResetPasswordFormSection() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const email = searchParams.get('email') ?? ''

  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const form = event.target
    const payload = {
      token,
      email,
      password: form.elements.password.value,
      password_confirmation: form.elements['password-confirmation'].value,
    }

    try {
      await api.post('/reset-password', payload)
      setDone(true)
      setTimeout(() => navigate('/login', { replace: true }), 1500)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to reset your password. The link may have expired.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Reset your password</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Choose a new password for {email || 'your account'}.</p>

      {done ? (
        <p role="status" className="mt-8 rounded-lg bg-success-tint px-4 py-3 text-sm text-success">
          Password reset. Redirecting you to sign in…
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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

      <p className="mt-6 text-center text-sm text-ink-muted">
        Remembered it after all?{' '}
        <Link to="/login" className="font-medium text-navy hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
