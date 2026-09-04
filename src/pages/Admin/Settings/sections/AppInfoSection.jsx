import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'

export default function AppInfoSection({ activeOfficeCount, activeRequestTypeCount }) {
  const rows = [
    { label: 'Application', value: 'CampusConnect' },
    { label: 'Active offices', value: activeOfficeCount },
    { label: 'Active request types', value: activeRequestTypeCount },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>App info</CardTitle>
      </CardHeader>
      <CardBody className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">{row.label}</span>
            <span className="font-medium text-ink">{row.value}</span>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}
