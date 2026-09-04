import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import AdminLayout from '@/layouts/AdminLayout'
import AuthLayout from '@/layouts/AuthLayout'
import RequireAuth from '@/routes/RequireAuth'
import RequireRole from '@/routes/RequireRole'
import RoleHome from '@/routes/RoleHome'
import LoginPage from '@/pages/Login/LoginPage'
import RegisterPage from '@/pages/Register/RegisterPage'
import ForgotPasswordPage from '@/pages/ForgotPassword/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/ResetPassword/ResetPasswordPage'
import RequestsPage from '@/pages/Requests/RequestsPage'
import NewRequestPage from '@/pages/NewRequest/NewRequestPage'
import RequestDetailsPage from '@/pages/RequestDetails/RequestDetailsPage'
import NotificationsPage from '@/pages/Notifications/NotificationsPage'
import ProfilePage from '@/pages/Profile/ProfilePage'
import AdminDashboardPage from '@/pages/Admin/Dashboard/AdminDashboardPage'
import AdminRequestsPage from '@/pages/Admin/Requests/AdminRequestsPage'
import AdminUsersPage from '@/pages/Admin/Users/AdminUsersPage'
import AdminCategoriesPage from '@/pages/Admin/Categories/AdminCategoriesPage'
import AdminReportsPage from '@/pages/Admin/Reports/AdminReportsPage'
import AdminSettingsPage from '@/pages/Admin/Settings/AdminSettingsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<RoleHome />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/requests/new" element={<NewRequestPage />} />
          <Route path="/requests/:id" element={<RequestDetailsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<RequireRole allow={['admin', 'staff']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/requests" element={<AdminRequestsPage />} />

            <Route element={<RequireRole allow={['admin']} redirectTo="/admin" />}>
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/categories" element={<AdminCategoriesPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
