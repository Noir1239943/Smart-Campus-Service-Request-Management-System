import { useState } from 'react'
import { MailWarning } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'

export default function EmailVerificationBanner() {
  const { user } = useAuth()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  if (!user || user.email_verified) return null

  async function handleResend() {
    setStatus('sending')
    try {
      await api.post('/email/verification-notification')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      role="alert"
      className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-warning/30 bg-warning-tint px-4 py-3 text-sm text-warning"
    >
      <MailWarning className="h-4.5 w-4.5 shrink-0" />
      <p className="flex-1">
        Verify your email ({user.email}) to submit requests — check your inbox for the link we sent when you signed
        up.
      </p>

      {status === 'sent' ? (
        <span className="font-medium">Verification email sent.</span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={status === 'sending'}
          className="font-medium underline underline-offset-2 hover:no-underline disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Resend email'}
        </button>
      )}
      {status === 'error' && <span className="w-full text-xs">Something went wrong. Please try again.</span>}
    </div>
  )
}
