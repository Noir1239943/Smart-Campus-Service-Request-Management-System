import { cn } from '@/lib/utils'

const TONES = {
  neutral: 'bg-paper text-ink-muted border-border',
  navy: 'bg-navy-tint text-navy border-navy/10',
  gold: 'bg-gold-tint text-[#8A6A21] border-gold/30',
  success: 'bg-success-tint text-success border-success/20',
  warning: 'bg-warning-tint text-warning border-warning/20',
  danger: 'bg-danger-tint text-danger border-danger/20',
  info: 'bg-info-tint text-info border-info/20',
}

export default function Badge({ tone = 'neutral', dot = false, className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        TONES[tone],
        className
      )}
      {...props}
    >
      {dot ? <span className={cn('h-1.5 w-1.5 rounded-full', {
        'bg-ink-muted': tone === 'neutral',
        'bg-navy': tone === 'navy',
        'bg-gold': tone === 'gold',
        'bg-success': tone === 'success',
        'bg-warning': tone === 'warning',
        'bg-danger': tone === 'danger',
        'bg-info': tone === 'info',
      })} /> : null}
      {children}
    </span>
  )
}
