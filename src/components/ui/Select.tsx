import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export default function Select({ className, label, id, children, ...props }: SelectProps) {
  return (
    <label htmlFor={id} className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span> : null}
      <div className="relative">
        <select
          id={id}
          className={cn(
            'h-10 w-full appearance-none rounded-lg border border-border-strong bg-surface px-3 pr-9 text-sm text-ink',
            'focus-ring focus-visible:border-navy',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      </div>
    </label>
  )
}
