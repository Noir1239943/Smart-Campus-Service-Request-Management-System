const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'
const TOKEN_KEY = 'campusconnect_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string | null): void {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export interface ApiErrorOptions {
  status?: number
  errors?: Record<string, string[]> | null
}

// A structured error so callers can read field-level validation messages
// the way Laravel returns them (422 responses with an `errors` object).
export class ApiError extends Error {
  status?: number
  errors: Record<string, string[]> | null

  constructor(message: string, { status, errors }: ApiErrorOptions = {}) {
    super(message)
    this.status = status
    this.errors = errors ?? null
  }
}

interface RequestOptions {
  method?: string
  body?: unknown
  isFormData?: boolean
}

async function request<T = unknown>(
  path: string,
  { method = 'GET', body, isFormData = false }: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (!isFormData && body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : isFormData ? (body as BodyInit) : JSON.stringify(body),
  })

  // 204 No Content, or empty body
  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new ApiError(data?.message ?? 'Something went wrong. Please try again.', {
      status: response.status,
      errors: data?.errors,
    })
  }

  return data as T
}

type BodyOptions = Omit<RequestOptions, 'method' | 'body'>

export const api = {
  get: <T = unknown>(path: string) => request<T>(path),
  post: <T = unknown>(path: string, body?: unknown, opts: BodyOptions = {}) =>
    request<T>(path, { method: 'POST', body, ...opts }),
  patch: <T = unknown>(path: string, body?: unknown, opts: BodyOptions = {}) =>
    request<T>(path, { method: 'PATCH', body, ...opts }),
  delete: <T = unknown>(path: string) => request<T>(path, { method: 'DELETE' }),
}
