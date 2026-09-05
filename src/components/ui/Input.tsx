import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
}

export default function Input({ className, label, hint, id, ...props }: InputProps) {
  return (
    <label htmlFor={id} className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span> : null}
      <input
        id={id}
        className={cn(
          'h-10 w-full rounded-lg border border-border-strong bg-surface px-3 text-sm text-ink placeholder:text-ink-faint',
          'focus-ring focus-visible:border-navy',
          className
        )}
        {...props}
      />
      {hint ? <span className="mt-1.5 block text-xs text-ink-muted">{hint}</span> : null}
    </label>
  )
}
