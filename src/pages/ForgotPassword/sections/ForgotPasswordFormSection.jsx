import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, ArrowLeft } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, ApiError } from '@/lib/api'

export default function ForgotPasswordFormSection() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await api.post('/forgot-password', { email })
      setSent(true)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to send the reset link. Please try again.')
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

      <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Forgot your password?</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Enter the email on your account and we'll send you a link to reset it.
      </p>

      {sent ? (
        <p role="status" className="mt-8 rounded-lg bg-success-tint px-4 py-3 text-sm text-success">
          If an account matches that email, a reset link is on its way. Check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input
            id="email"
            type="email"
            label="Email address"
            placeholder="you@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && (
            <p role="alert" className="rounded-lg bg-danger-tint px-3.5 py-2.5 text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit" icon={Send} className="w-full" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      )}
    </div>
  )
}
