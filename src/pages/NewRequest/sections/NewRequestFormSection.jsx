import { Card, CardBody } from '@/components/ui/Card'
import RequestForm from '@/components/features/requests/RequestForm'

export default function NewRequestFormSection({ offices, requestTypes, onSubmitted }) {
  return (
    <Card>
      <CardBody>
        <RequestForm offices={offices} requestTypes={requestTypes} onSubmitted={onSubmitted} />
      </CardBody>
    </Card>
  )
}
