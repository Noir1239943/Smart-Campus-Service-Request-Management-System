import type { ComponentPropsWithoutRef, ElementType } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-dark',
  gold: 'bg-gold text-navy-dark hover:brightness-95',
  outline: 'border border-border-strong text-ink bg-surface hover:bg-paper',
  ghost: 'text-ink-muted hover:bg-paper hover:text-ink',
  danger: 'bg-danger text-white hover:brightness-95',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

type ButtonOwnProps<C extends ElementType> = {
  as?: C
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  className?: string
}

type ButtonProps<C extends ElementType> = ButtonOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps<C>>

export default function Button<C extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  children,
  ...props
}: ButtonProps<C>) {
  const Component = as || 'button'
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
