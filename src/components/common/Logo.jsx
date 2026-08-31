import { GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Logo({ className, iconOnly = false }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-gold">
        <GraduationCap className="h-5 w-5" />
      </span>
      {!iconOnly && (
        <span className="font-display text-lg font-semibold leading-none text-ink">
          Campus<span className="text-navy">Connect</span>
        </span>
      )}
    </div>
  )
}
