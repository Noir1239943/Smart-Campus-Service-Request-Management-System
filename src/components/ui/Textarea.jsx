import { cn } from '@/lib/utils'

export default function Textarea({ className, label, hint, id, rows = 4, ...props }) {
  return (
    <label htmlFor={id} className="block">
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      ) : null}
      <textarea
        id={id}
        rows={rows}
        className={cn(
          'w-full resize-none rounded-lg border border-border-strong bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint',
          'focus-ring focus-visible:border-navy',
          className
        )}
        {...props}
      />
      {hint ? <span className="mt-1.5 block text-xs text-ink-muted">{hint}</span> : null}
    </label>
  )
}
