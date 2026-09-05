import { Search } from 'lucide-react'
import { REQUEST_STATUS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const FILTERS = [
  { key: 'all', label: 'All' },
  ...Object.entries(REQUEST_STATUS).map(([key, v]) => ({ key, label: v.label })),
]

interface RequestsFilterSectionProps {
  query: string
  onQueryChange: (query: string) => void
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function RequestsFilterSection({
  query,
  onQueryChange,
  activeFilter,
  onFilterChange,
}: RequestsFilterSectionProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-xs flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by type or office…"
          className="focus-ring h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-faint focus-visible:border-navy"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={cn(
              'focus-ring rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
              activeFilter === key
                ? 'border-navy bg-navy text-white'
                : 'border-border text-ink-muted hover:border-border-strong hover:text-ink'
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
