import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

export default function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gold">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-[28px]">{title}</h1>
        {description ? <p className="mt-1.5 max-w-xl text-sm text-ink-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
