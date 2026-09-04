import { useEffect, useState } from 'react'
import PageHeader from '@/components/common/PageHeader'
import ReportStatsSection from '@/pages/Admin/Reports/sections/ReportStatsSection'
import ReportTablesSection from '@/pages/Admin/Reports/sections/ReportTablesSection'
import { api } from '@/lib/api'

export default function AdminReportsPage() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    api
      .get('/admin/reports')
      .then((data) => !cancelled && setReport(data.data ?? data))
      .catch(() => !cancelled && setError('Could not load reports right now.'))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Admin"
        title="Reports"
        description="Breakdowns of every request filed across campus offices."
      />

      {error && (
        <p role="alert" className="rounded-lg bg-danger-tint px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-card border border-border bg-surface" />
          ))}
        </div>
      ) : (
        report && (
          <>
            <ReportStatsSection byStatus={report.by_status} />
            <ReportTablesSection byOffice={report.by_office} byType={report.by_type} byWeek={report.by_week} />
          </>
        )
      )}
    </div>
  )
}
