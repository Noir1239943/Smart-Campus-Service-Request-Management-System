import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { api, ApiError } from '@/lib/api'

type Status = 'verifying' | 'verified' | 'failed'

export default function VerifyEmailStatusSection() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<Status>('verifying')
  const [error, setError] = useState<string | null>(null)
  const requested = useRef(false)

  const id = searchParams.get('id')
  const hash = searchParams.get('hash')
  const expires = searchParams.get('expires')
  const signature = searchParams.get('signature')

  useEffect(() => {
    if (requested.current) return
    requested.current = true

    if (!id || !hash || !expires || !signature) {
      setStatus('failed')
      setError('This verification link is missing or incomplete.')
      return
    }

    api
      .get(`/email/verify/${id}/${hash}?expires=${expires}&signature=${encodeURIComponent(signature)}`)
      .then(() => setStatus('verified'))
      .catch((err) => {
        setStatus('failed')
        setError(
          err instanceof ApiError
            ? 'This verification link is invalid or has expired.'
            : 'Unable to verify your email right now. Please try again.'
        )
      })
  }, [id, hash, expires, signature])

  if (status === 'verifying') {
    return (
      <div className="flex flex-col items-center text-center">
        <Loader2 className="h-10 w-10 animate-spin text-navy" />
        <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Verifying your email…</h1>
      </div>
    )
  }

  if (status === 'verified') {
    return (
      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Email verified</h1>
        <p className="mt-1.5 text-sm text-ink-muted">Your account is fully activated. You can now submit requests.</p>
        <Link
          to="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-navy px-4 text-sm font-medium text-white hover:bg-navy-dark"
        >
          Go to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center text-center">
      <XCircle className="h-10 w-10 text-danger" />
      <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Verification failed</h1>
      <p role="alert" className="mt-1.5 text-sm text-ink-muted">
        {error}
      </p>
      <Link to="/login" className="mt-6 text-sm font-medium text-navy hover:underline">
        Back to sign in
      </Link>
    </div>
  )
}
