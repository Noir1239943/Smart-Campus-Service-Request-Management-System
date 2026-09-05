import cpcLogo from '@/assets/cpc-logo.png'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  iconOnly?: boolean
}

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <img src={cpcLogo} alt="Cordova Public College" className="h-9 w-9 shrink-0 object-contain" />

      {!iconOnly && (
        <span className="font-display text-lg font-semibold leading-none text-ink">
          Campus<span className="text-navy">Connect</span>
        </span>
      )}
    </div>
  )
}
