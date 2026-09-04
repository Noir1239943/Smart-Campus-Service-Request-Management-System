import { useState } from 'react'
import { Plus, Trash2, Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { api, ApiError } from '@/lib/api'

function CategoryRow({ item, endpoint, onChange, onDelete }) {
  const [name, setName] = useState(item.name)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const dirty = name.trim() !== item.name

  async function save() {
    if (!name.trim() || saving) return
    setSaving(true)
    setError(null)
    try {
      const data = await api.patch(`${endpoint}/${item.id}`, { name: name.trim() })
      onChange(data.data ?? data)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save.')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive() {
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

  async function remove() {
    setSaving(true)
    setError(null)
    try {
      await api.delete(`${endpoint}/${item.id}`)
      onDelete(item.id)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not delete.')
      setSaving(false)
    }
  }

  return (
    <div className="flex items-center gap-2 border-b border-border py-2.5 last:border-b-0">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={saving}
        className="h-9"
        aria-label="Name"
      />
      {dirty && (
        <button
          onClick={save}
          disabled={saving}
          aria-label="Save"
          className="focus-ring shrink-0 rounded-md p-1.5 text-success hover:bg-success-tint disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={toggleActive}
        disabled={saving}
        className="shrink-0"
        aria-label={item.is_active ? 'Disable' : 'Enable'}
      >
        <Badge tone={item.is_active ? 'success' : 'neutral'}>{item.is_active ? 'Active' : 'Inactive'}</Badge>
      </button>
      <button
        onClick={remove}
        disabled={saving}
        aria-label="Delete"
        className="focus-ring shrink-0 rounded-md p-1.5 text-ink-faint hover:bg-danger-tint hover:text-danger disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      {error && <p className="ml-2 shrink-0 text-xs text-danger">{error}</p>}
    </div>
  )
}

export default function CategoryManager({ title, description, endpoint, items, onItemsChange }) {
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState(null)

  async function addItem(event) {
    event.preventDefault()
    if (!newName.trim() || adding) return
    setAdding(true)
    setError(null)
    try {
      const data = await api.post(endpoint, { name: newName.trim() })
      onItemsChange([...items, data.data ?? data])
      setNewName('')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not add.')
    } finally {
      setAdding(false)
    }
  }

  function handleChange(updated) {
    onItemsChange(items.map((item) => (item.id === updated.id ? updated : item)))
  }

  function handleDelete(id) {
    onItemsChange(items.filter((item) => item.id !== id))
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
        <div className="mb-2">
          {items.map((item) => (
            <CategoryRow key={item.id} item={item} endpoint={endpoint} onChange={handleChange} onDelete={handleDelete} />
          ))}
        </div>

        <form onSubmit={addItem} className="flex items-center gap-2 border-t border-border pt-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Add new…"
            className="h-9"
            disabled={adding}
            aria-label={`New ${title.toLowerCase()} name`}
          />
          <Button type="submit" size="sm" icon={Plus} disabled={adding}>
            Add
          </Button>
        </form>
        {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      </CardBody>
    </Card>
  )
}
