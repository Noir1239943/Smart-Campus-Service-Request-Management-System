import { PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Button from '@/components/ui/Button'

interface WelcomeSectionProps {
  studentName: string
}

export default function WelcomeSection({ studentName }: WelcomeSectionProps) {
  return (
    <PageHeader
      eyebrow="Dashboard"
      title={`Good afternoon, ${studentName.split(' ')[0]}`}
      description="Here's what's happening with your requests across campus offices."
      action={
        <Button as={Link} to="/requests/new" icon={PlusCircle}>
          New request
        </Button>
      }
    />
  )
}
