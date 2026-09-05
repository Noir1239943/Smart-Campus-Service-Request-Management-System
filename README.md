# CampusConnect — Frontend

React + Vite + Tailwind frontend for CampusConnect, now wired to the Laravel backend.

## Connecting to the backend

1. Get the backend running first (see its own README) — `php artisan serve` on `http://localhost:8000`.
2. This project reads its API base URL from `.env`:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```
   Change it if your backend runs elsewhere.
3. `npm install && npm run dev`

## How the sync works

- **`src/lib/api.ts`** — a small typed fetch wrapper. Attaches the Sanctum bearer
  token (from `localStorage`) to every request, throws a typed `ApiError` with
  Laravel's validation `errors` object attached when a request fails.
- **`src/context/AuthContext.tsx`** — holds the logged-in user, exposes
  `login`, `register`, `logout`, `updateUser`. On load, if a token exists in
  `localStorage` it calls `GET /me` to restore the session.
- **`src/routes/RequireAuth.tsx`** — redirects to `/login` if there's no
  authenticated user; wraps every page except Login in `AppRoutes.tsx`.
- **`src/lib/unwrap.ts`** — normalizes Laravel's two response shapes (plain
  arrays vs. `{ data: [...] }` resource collections) into one array, since
  different endpoints in the backend return each.
- **`src/types/index.ts`** — shared domain types (`User`, `ServiceRequest`,
  `Notification`, `CategoryItem`, etc.) used across pages and components.

## What's live

Every page fetches from the API:

| Page | Endpoint(s) |
|---|---|
| Login | `POST /api/login` |
| Register | `POST /api/register` |
| Forgot password | `POST /api/forgot-password` |
| Reset password | `POST /api/reset-password` |
| Dashboard | `GET /api/dashboard` |
| My Requests | `GET /api/requests?status=&search=` (debounced) |
| New Request | `GET /api/offices`, `GET /api/request-types`, `POST /api/requests` (multipart) |
| Notifications | `GET /api/notifications` |
| Profile | `PATCH /api/profile` |
| Topbar bell badge | `GET /api/notifications` (unread count) |
| Admin dashboard/requests/users/categories/reports/settings | `GET/PATCH/POST/DELETE /api/admin/*` |

## Try it

Backend seeds a demo account: **Student ID `2023-04521`**, password `password`.

## Known gaps (not wired yet)

- The Topbar search box is decorative — it doesn't hit `/api/requests?search=` yet (only the My Requests page's own search box does).
- No global toast/error boundary — errors show inline per-page.
