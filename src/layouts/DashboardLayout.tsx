import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/common/Sidebar'
import Topbar from '@/components/common/Topbar'
import EmailVerificationBanner from '@/components/common/EmailVerificationBanner'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-5xl">
            <EmailVerificationBanner />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
