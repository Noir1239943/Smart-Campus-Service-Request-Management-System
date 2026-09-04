import { cn } from '@/lib/utils'

export default function StatCard({ label, value, icon: Icon, tone = 'navy' }) {
  const tones = {
    navy: 'bg-navy-tint text-navy',
    gold: 'bg-gold-tint text-[#8A6A21]',
    success: 'bg-success-tint text-success',
    warning: 'bg-warning-tint text-warning',
    danger: 'bg-danger-tint text-danger',
    info: 'bg-info-tint text-info',
  }
  return (
    <div className="flex items-center gap-4 rounded-card border border-border bg-surface p-5">
      <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-lg', tones[tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold leading-none text-ink">{value}</p>
        <p className="mt-1.5 text-sm text-ink-muted">{label}</p>
      </div>
    </div>
  )
}
