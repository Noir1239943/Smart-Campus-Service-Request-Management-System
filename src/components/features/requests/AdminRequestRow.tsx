import { useState, type ChangeEvent } from 'react'
import { Building2, User } from 'lucide-react'
import Select from '@/components/ui/Select'
import { REQUEST_STATUS } from '@/lib/constants'
import { unwrapItem } from '@/lib/unwrap'
import { api, ApiError } from '@/lib/api'
import type { RequestStatus, ServiceRequest } from '@/types'

function numericId(displayId: ServiceRequest['id']) {
  return Number(String(displayId).replace('REQ-', ''))
}

interface AdminRequestRowProps {
  request: ServiceRequest
  onUpdated?: (updated: ServiceRequest) => void
}

export default function AdminRequestRow({ request, onUpdated }: AdminRequestRowProps) {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    const status = event.target.value as RequestStatus
    setUpdating(true)
    setError(null)
    try {
      const data = await api.patch<unknown>(`/admin/requests/${numericId(request.id)}/status`, { status })
      onUpdated?.(unwrapItem<ServiceRequest>(data))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update this request.')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="font-display text-[15px] font-semibold text-ink">{request.type}</p>
          <span className="font-mono text-xs text-ink-faint">#{request.id}</span>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {request.requester?.name ?? 'Unknown'}
          </span>
          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5" />
            {request.office}
          </span>
        </p>
        {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Select
          value={request.status}
          onChange={handleStatusChange}
          disabled={updating}
          className="h-9 w-40"
          aria-label={`Status for ${request.id}`}
        >
          {Object.entries(REQUEST_STATUS).map(([key, meta]) => (
            <option key={key} value={key}>
              {meta.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
