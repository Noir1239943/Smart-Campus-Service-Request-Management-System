import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import CategoryToggleSection from '@/pages/Admin/Settings/sections/CategoryToggleSection'
import AppInfoSection from '@/pages/Admin/Settings/sections/AppInfoSection'
import { api } from '@/lib/api'
import { unwrapCollection } from '@/lib/unwrap'

export default function AdminSettingsPage() {
  const [offices, setOffices] = useState([])
  const [requestTypes, setRequestTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([api.get('/admin/offices'), api.get('/admin/request-types')])
      .then(([officesData, typesData]) => {
        if (cancelled) return
        setOffices(unwrapCollection(officesData))
        setRequestTypes(unwrapCollection(typesData))
      })
      .catch(() => !cancelled && setError('Could not load settings right now.'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin"
        title="Settings"
        description="Enable or disable categories without losing their request history."
      />

      {error && (
        <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-48 animate-pulse rounded-card border border-border bg-surface lg:col-span-1" />
          <div className="h-48 animate-pulse rounded-card border border-border bg-surface lg:col-span-2" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <AppInfoSection
            activeOfficeCount={offices.filter((o) => o.is_active).length}
            activeRequestTypeCount={requestTypes.filter((t) => t.is_active).length}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            <CategoryToggleSection
              title="Offices"
              description="Only active offices appear on the New Request form."
              endpoint="/admin/offices"
              items={offices}
              onItemsChange={setOffices}
            />
            <CategoryToggleSection
              title="Request types"
              description="Only active types appear on the New Request form."
              endpoint="/admin/request-types"
              items={requestTypes}
              onItemsChange={setRequestTypes}
            />
          </div>
        </div>
      )}
    </div>
  )
}
