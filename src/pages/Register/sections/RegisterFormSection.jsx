import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { ApiError } from '@/lib/api'

export default function RegisterFormSection() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setFieldErrors({})
    setSubmitting(true)

    const form = event.target
    const payload = {
      name: form.elements.name.value,
      student_id: form.elements['student-id'].value,
      email: form.elements.email.value,
      program: form.elements.program.value,
      password: form.elements.password.value,
      password_confirmation: form.elements['password-confirmation'].value,
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
        <Input id="name" name="name" label="Full name" placeholder="Juan Dela Cruz" required />
        {fieldErrors.name && <p className="-mt-3 text-xs text-danger">{fieldErrors.name[0]}</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Input id="student-id" label="Student ID" placeholder="e.g. 2023-04521" required />
            {fieldErrors.student_id && <p className="mt-1.5 text-xs text-danger">{fieldErrors.student_id[0]}</p>}
          </div>
          <div>
            <Input id="program" name="program" label="Program" placeholder="e.g. BS Computer Science" required />
            {fieldErrors.program && <p className="mt-1.5 text-xs text-danger">{fieldErrors.program[0]}</p>}
          </div>
        </div>

        <Input id="email" name="email" type="email" label="Email address" placeholder="you@school.edu" required />
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
