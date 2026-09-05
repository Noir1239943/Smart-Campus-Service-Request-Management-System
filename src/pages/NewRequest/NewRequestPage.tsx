import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import NewRequestFormSection from '@/pages/NewRequest/sections/NewRequestFormSection'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'
import type { CategoryItem } from '@/types'

export default function NewRequestPage() {
  const [offices, setOffices] = useState<CategoryItem[]>([])
  const [requestTypes, setRequestTypes] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([api.get<unknown>('/offices'), api.get<unknown>('/request-types')])
      .then(([officesData, typesData]) => {
        if (cancelled) return
        setOffices(unwrapCollection<CategoryItem>(officesData))
        setRequestTypes(unwrapCollection<CategoryItem>(typesData))
      })
      .catch(() => !cancelled && setError('Could not load the request form right now.'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="New request"
        title="Submit a request"
        description="Choose an office and tell them what you need — you'll get notified at every step."
      />

      {error && (
        <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="h-96 animate-pulse rounded-card border border-border bg-surface" />
      ) : (
        <NewRequestFormSection offices={offices} requestTypes={requestTypes} />
      )}
    </div>
  )
}
