import { CheckCircle2, Circle, XCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import type { ServiceRequest } from '@/types'

const STEPS = [
  { key: 'pending', label: 'Submitted' },
  { key: 'in_review', label: 'In review' },
  { key: 'completed', label: 'Completed' },
] as const

interface RequestTimelineSectionProps {
  request: ServiceRequest
}

export default function RequestTimelineSection({ request }: RequestTimelineSectionProps) {
  const rejected = request.status === 'rejected'
  const currentIndex = rejected ? 1 : STEPS.findIndex((step) => step.key === request.status)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status timeline</CardTitle>
      </CardHeader>
      <CardBody>
        <ol className="space-y-0">
          {STEPS.map((step, index) => {
            if (rejected && index === 2) {
              return (
                <li key="rejected" className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <XCircle className="h-5 w-5 text-danger" />
                  </div>
                  <div className="pb-1">
                    <p className="text-sm font-medium text-danger">Rejected</p>
                    <p className="text-xs text-ink-faint">{request.updated}</p>
                  </div>
                </li>
              )
            }

            const done = index < currentIndex || (index === currentIndex && !rejected)
            const isLast = index === STEPS.length - 1 && !rejected

            return (
              <li key={step.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {done ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Circle className="h-5 w-5 text-border-strong" />
                  )}
                  {!isLast && <span className={cn('w-px flex-1', done ? 'bg-success' : 'bg-border')} />}
                </div>
                <div className="pb-6 last:pb-0">
                  <p className={cn('text-sm font-medium', done ? 'text-ink' : 'text-ink-faint')}>{step.label}</p>
                  {index === currentIndex && <p className="text-xs text-ink-faint">{request.updated}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </CardBody>
    </Card>
  )
}
