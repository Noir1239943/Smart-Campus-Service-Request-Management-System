import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, ApiError } from '@/lib/api'

export default function ForgotPasswordFormSection() {
  const [identifier, setIdentifier] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    const isEmail = identifier.includes('@')
    const payload = isEmail ? { email: identifier } : { student_id: identifier }

    try {
      await api.post('/forgot-password', payload)
      setDone(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to send a reset link. Please try again.')
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
        Enter your Student ID or email and we&apos;ll send you a link to reset your password.
      </p>

      {done ? (
        <p role="status" className="mt-8 rounded-lg bg-success-tint px-4 py-3 text-sm text-success">
          If an account matches that Student ID or email, a password reset link has been sent.
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

          {error && (
            <p role="alert" className="rounded-lg bg-danger-tint px-3.5 py-2.5 text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit" icon={Mail} className="w-full" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      )}
    </div>
  )
}
