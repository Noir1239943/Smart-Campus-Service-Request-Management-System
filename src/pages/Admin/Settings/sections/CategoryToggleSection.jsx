import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { api, ApiError } from '@/lib/api'

function ToggleRow({ item, endpoint, onChange }) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function toggle() {
    setSaving(true)
    setError(null)
    try {
      const data = await api.patch(`${endpoint}/${item.id}`, { is_active: !item.is_active })
      onChange(data.data ?? data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not update.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-b-0">
      <span className="text-sm text-ink">{item.name}</span>
      <div className="flex items-center gap-2">
        {error && <span className="text-xs text-danger">{error}</span>}
        <button onClick={toggle} disabled={saving} aria-label={item.is_active ? 'Disable' : 'Enable'}>
          <Badge tone={item.is_active ? 'success' : 'neutral'}>{item.is_active ? 'Active' : 'Inactive'}</Badge>
        </button>
      </div>
    </div>
  )
}

export default function CategoryToggleSection({ title, description, endpoint, items, onItemsChange }) {
  function handleChange(updated) {
    onItemsChange(items.map((item) => (item.id === updated.id ? updated : item)))
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="mt-1 text-sm text-ink-muted">{description}</p>
        </div>
      </CardHeader>
      <CardBody>
        {items.map((item) => (
          <ToggleRow key={item.id} item={item} endpoint={endpoint} onChange={handleChange} />
        ))}
      </CardBody>
    </Card>
  )
}
