import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ApiError } from '@/lib/api'
import type { FieldErrors } from '@/types'

export default function RegisterFormSection() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setFieldErrors({})
    setSubmitting(true)

    const elements = event.currentTarget.elements
    const payload = {
      name: (elements.namedItem('name') as HTMLInputElement).value,
      student_id: (elements.namedItem('student-id') as HTMLInputElement).value,
      email: (elements.namedItem('email') as HTMLInputElement).value,
      program: (elements.namedItem('program') as HTMLInputElement).value,
      password: (elements.namedItem('password') as HTMLInputElement).value,
      password_confirmation: (elements.namedItem('password-confirmation') as HTMLInputElement).value,
    }

    try {
      await register(payload)
      navigate('/', { replace: true })
    } catch (err) {
      if (err instanceof ApiError && err.errors) {
        setFieldErrors(err.errors)
      } else {
        setError(err instanceof ApiError ? err.message : 'Unable to create your account. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Activate your account</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Register with your student ID to start filing and tracking requests.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <Input id="name" name="name" label="Full name" placeholder="Name" required />
        {fieldErrors.name && <p className="-mt-3 text-xs text-danger">{fieldErrors.name[0]}</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input id="student-id" label="Student ID" placeholder="ID Number" required />
            {fieldErrors.student_id && <p className="mt-1.5 text-xs text-danger">{fieldErrors.student_id[0]}</p>}
          </div>
          <div>
            <Input id="program" name="program" label="Program" placeholder="BS " required />
            {fieldErrors.program && <p className="mt-1.5 text-xs text-danger">{fieldErrors.program[0]}</p>}
          </div>
        </div>

        <Input
          id="email"
          name="email"
          type="email"
          label="Email address"
          placeholder="Username"
          hint="Use an email you can access — you'll need it to verify your account and reset your password."
          required
        />
        {fieldErrors.email && <p className="-mt-3 text-xs text-danger">{fieldErrors.email[0]}</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input id="password" type="password" label="Password" placeholder="••••••••" required />
            {fieldErrors.password && <p className="mt-1.5 text-xs text-danger">{fieldErrors.password[0]}</p>}
          </div>
          <Input
            id="password-confirmation"
            type="password"
            label="Confirm password"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-danger-tint px-3.5 py-2.5 text-sm text-danger">
            {error}
          </p>
        )}

        <Button type="submit" icon={UserPlus} className="w-full" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-navy hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
