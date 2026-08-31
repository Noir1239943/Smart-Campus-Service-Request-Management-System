import { Outlet } from 'react-router-dom'
import Logo from '@/components/common/Logo'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between p-6 sm:p-10">
        <Logo />
        <div className="mx-auto w-full max-w-sm py-12">
          <Outlet />
        </div>
        <p className="text-xs text-ink-faint">© 2026 CampusConnect. All rights reserved.</p>
      </div>

      <div className="relative hidden overflow-hidden bg-navy lg:block">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative flex h-full flex-col justify-end p-12">
          <p className="font-display text-3xl font-semibold leading-tight text-white">
            One place for every request, from submission to sign-off.
          </p>
          <p className="mt-4 max-w-md text-sm text-white/70">
            Transcripts, certificates, facility bookings and more — track everything
            you've filed with any campus office, in real time.
          </p>
        </div>
      </div>
    </div>
  )
}
