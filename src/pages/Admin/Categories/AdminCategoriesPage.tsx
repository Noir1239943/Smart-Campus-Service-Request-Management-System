import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import CategoryManager from '@/pages/Admin/Categories/sections/CategoryManager'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'
import type { CategoryItem } from '@/types'

export default function AdminCategoriesPage() {
  const [offices, setOffices] = useState<CategoryItem[]>([])
  const [requestTypes, setRequestTypes] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([api.get<unknown>('/admin/offices'), api.get<unknown>('/admin/request-types')])
      .then(([officesData, typesData]) => {
        if (cancelled) return
        setOffices(unwrapCollection<CategoryItem>(officesData))
        setRequestTypes(unwrapCollection<CategoryItem>(typesData))
      })
      .catch(() => !cancelled && setError('Could not load categories right now.'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin"
        title="Categories"
        description="Manage the offices and request types students can choose from."
      />

      {error && (
        <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-card border border-border bg-surface" />
          <div className="h-64 animate-pulse rounded-card border border-border bg-surface" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <CategoryManager
            title="Offices"
            description="Where a request gets routed to."
            endpoint="/admin/offices"
            items={offices}
            onItemsChange={setOffices}
          />
          <CategoryManager
            title="Request types"
            description="What a student is asking for."
            endpoint="/admin/request-types"
            items={requestTypes}
            onItemsChange={setRequestTypes}
          />
        </div>
      )}
    </div>
  )
}
