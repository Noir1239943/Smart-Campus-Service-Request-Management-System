import { cn } from '@/lib/utils'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Avatar({ name, size = 'md', className }) {
  const sizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-14 w-14 text-lg',
  }
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-navy font-display font-semibold text-white',
        sizes[size],
        className
      )}
    >
      {initials(name)}
    </div>
  )
}
