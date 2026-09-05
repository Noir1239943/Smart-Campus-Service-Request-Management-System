import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import type { ReportBreakdownRow, ReportData } from '@/types'

interface BreakdownTableProps {
  title: string
  rows: ReportBreakdownRow[]
  labelKey: 'name' | 'week'
}

function BreakdownTable({ title, rows, labelKey }: BreakdownTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        {!rows.length ? (
          <p className="text-sm text-ink-muted">No data yet.</p>
        ) : (
          <div className="space-y-2.5">
            {rows.map((row) => (
              <div key={row[labelKey]} className="flex items-center justify-between text-sm">
                <span className="text-ink">{row[labelKey]}</span>
                <span className="font-display font-semibold text-ink">{row.count}</span>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

interface ReportTablesSectionProps {
  byOffice: ReportData['by_office']
  byType: ReportData['by_type']
  byWeek: ReportData['by_week']
}

export default function ReportTablesSection({ byOffice, byType, byWeek }: ReportTablesSectionProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <BreakdownTable title="By office" rows={byOffice} labelKey="name" />
      <BreakdownTable title="By request type" rows={byType} labelKey="name" />
      <BreakdownTable title="By week" rows={byWeek} labelKey="week" />
    </div>
  )
}
