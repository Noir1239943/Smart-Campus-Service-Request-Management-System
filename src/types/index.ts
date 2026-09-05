export type UserRole = 'admin' | 'staff' | 'student'

export interface UserPreferences {
  email: boolean
  sms: boolean
  digest: boolean
}

export interface User {
  id: number
  name: string
  role: UserRole
  student_id: string
  email: string
  program?: string
  year_level?: string
  contact_number?: string
  preferences?: UserPreferences
}

export type RequestStatus = 'pending' | 'in_review' | 'completed' | 'rejected'

export interface ServiceRequest {
  id: number | string
  type: string
  office: string
  status: RequestStatus
  description?: string
  details?: string
  subject?: string
  submitted?: string
  updated: string
  attachment_url?: string | null
  attachment_name?: string | null
  requester?: { name: string } | null
}

export interface Notification {
  id: number | string
  title: string
  detail: string
  time: string
  unread: boolean
  tone: 'success' | 'info' | 'danger'
}

export interface CategoryItem {
  id: number | string
  name: string
  is_active: boolean
}

export interface DashboardStats {
  total: number
  awaiting: number
  completed: number
}

export interface AdminDashboardStats extends DashboardStats {
  total_users: number
}

export interface ReportBreakdownRow {
  name?: string
  week?: string
  count: number
}

export interface ReportData {
  by_status: Partial<Record<RequestStatus, number>>
  by_office: ReportBreakdownRow[]
  by_type: ReportBreakdownRow[]
  by_week: ReportBreakdownRow[]
}

export type FieldErrors = Record<string, string[]>

export type BadgeTone = 'neutral' | 'navy' | 'gold' | 'success' | 'warning' | 'danger' | 'info'
