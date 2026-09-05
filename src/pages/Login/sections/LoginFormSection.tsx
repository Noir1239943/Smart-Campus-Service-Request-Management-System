import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation, Link, type Location } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ApiError } from '@/lib/api'

interface LocationState {
  from?: Location
}

export default function LoginFormSection() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const isEmail = identifier.includes('@')
      await login(isEmail ? { email: identifier, password } : { studentId: identifier, password })
      const state = location.state as LocationState | null
      navigate(state?.from?.pathname ?? '/', { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Welcome back</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Sign in with your student ID or email to submit and track requests.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input
          id="identifier"
          label="Student ID or Email"
          placeholder="ID or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p role="alert" className="rounded-lg bg-danger-tint px-3.5 py-2.5 text-sm text-danger">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-muted">
            <input type="checkbox" className="h-4 w-4 rounded border-border-strong text-navy focus-ring" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-navy hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" icon={LogIn} className="w-full" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        New student?{' '}
        <Link to="/register" className="font-medium text-navy hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}
