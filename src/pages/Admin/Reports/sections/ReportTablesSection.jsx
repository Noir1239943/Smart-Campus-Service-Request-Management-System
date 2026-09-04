import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'

function BreakdownTable({ title, rows, labelKey, countKey = 'count' }) {
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
                <span className="font-display font-semibold text-ink">{row[countKey]}</span>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default function ReportTablesSection({ byOffice, byType, byWeek }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <BreakdownTable title="By office" rows={byOffice} labelKey="name" />
      <BreakdownTable title="By request type" rows={byType} labelKey="name" />
      <BreakdownTable title="By week" rows={byWeek} labelKey="week" />
    </div>
  )
}
