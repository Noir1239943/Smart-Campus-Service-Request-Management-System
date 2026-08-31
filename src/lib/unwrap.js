// Laravel API Resource collections wrap their array in { data: [...] }.
// Plain Eloquent collections returned via ->get() don't. This normalizes both
// so pages don't need to know which shape a given endpoint happens to use.
export function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}
