import { cn } from '@/lib/utils'

export default function Input({ className, label, hint, id, ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      ) : null}
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
