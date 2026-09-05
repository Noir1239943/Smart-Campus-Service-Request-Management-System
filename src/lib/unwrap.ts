interface WrappedCollection<T> {
  data: T[]
}

interface WrappedItem<T> {
  data: T
}

// Laravel API Resource collections wrap their array in { data: [...] }.
// Plain Eloquent collections returned via ->get() don't. This normalizes both
// so pages don't need to know which shape a given endpoint happens to use.
export function unwrapCollection<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[]
  if (payload && Array.isArray((payload as WrappedCollection<T>).data)) {
    return (payload as WrappedCollection<T>).data
  }
  return []
}

// Same idea, but for a single Eloquent model / API Resource response.
export function unwrapItem<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in payload && !Array.isArray((payload as WrappedItem<T>).data)) {
    return (payload as WrappedItem<T>).data
  }
  return payload as T
}
