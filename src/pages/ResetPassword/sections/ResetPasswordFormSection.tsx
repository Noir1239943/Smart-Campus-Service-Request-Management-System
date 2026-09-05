import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { KeyRound, ArrowLeft } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, ApiError } from '@/lib/api'

export default function ResetPasswordFormSection() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!token || !email) {
    return (
      <div>
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

        <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Reset your password</h1>
        <p role="alert" className="mt-8 rounded-lg bg-danger-tint px-3.5 py-2.5 text-sm text-danger">
          This reset link is missing or incomplete. Please request a new one.
        </p>
        <Link to="/forgot-password" className="mt-4 inline-block text-sm font-medium text-navy hover:underline">
          Request a new reset link
        </Link>
      </div>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const elements = event.currentTarget.elements
    const payload = {
      token,
      email,
      password: (elements.namedItem('password') as HTMLInputElement).value,
      password_confirmation: (elements.namedItem('password-confirmation') as HTMLInputElement).value,
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

      <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Choose a new password</h1>
      <p className="mt-1.5 text-sm text-ink-muted">Resetting the password for {email}.</p>

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
    </div>
  )
}
