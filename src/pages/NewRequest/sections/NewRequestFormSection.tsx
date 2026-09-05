import { Card, CardBody } from '@/components/ui/Card'
import RequestForm from '@/components/features/requests/RequestForm'
import type { CategoryItem } from '@/types'

interface NewRequestFormSectionProps {
  offices: CategoryItem[]
  requestTypes: CategoryItem[]
  onSubmitted?: () => void
}

export default function NewRequestFormSection({ offices, requestTypes, onSubmitted }: NewRequestFormSectionProps) {
  return (
    <Card>
      <CardBody>
        <RequestForm offices={offices} requestTypes={requestTypes} onSubmitted={onSubmitted} />
      </CardBody>
    </Card>
  )
}
