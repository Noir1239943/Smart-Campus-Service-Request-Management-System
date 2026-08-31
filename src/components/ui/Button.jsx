import { cn } from '@/lib/utils'

const VARIANTS = {
  primary: 'bg-navy text-white hover:bg-navy-dark',
  gold: 'bg-gold text-navy-dark hover:brightness-95',
  outline: 'border border-border-strong text-ink bg-surface hover:bg-paper',
  ghost: 'text-ink-muted hover:bg-paper hover:text-ink',
  danger: 'bg-danger text-white hover:brightness-95',
}

const SIZES = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150',
        'focus-ring disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
      {children}
    </Component>
  )
}
