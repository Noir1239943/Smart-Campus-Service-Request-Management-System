import PageHeader from '@/components/common/PageHeader'
import ProfileInfoSection from '@/pages/Profile/sections/ProfileInfoSection'
import ProfilePreferencesSection from '@/pages/Profile/sections/ProfilePreferencesSection'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Settings"
        title="Profile & settings"
        description="Manage your personal details and how you'd like to be notified."
      />
      <ProfileInfoSection />
      <ProfilePreferencesSection />
    </div>
  )
}
