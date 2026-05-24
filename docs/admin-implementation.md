# Katmitra Admin — Implementation (code)

Admin UI lives in **`katmitra-web`** at `/admin/*`, backed by **`katmitra-backend`** (PostgreSQL).

## Run locally

1. Backend: `cd katmitra-backend && npm run dev` (default `http://localhost:3000`)
2. Web: `cd katmitra-web` — set `VITE_API_BASE_URL=http://localhost:3000/api` in `.env`
3. Create an admin user in DB: `User.role = 'admin'`, verified, with password hash
4. Open `http://localhost:5173/admin/login`

## Implemented

| Area | Status |
| --- | --- |
| Login (JWT via `/v1/signin`, `role === admin`) | Done |
| Dashboard stats (`GET /admin/v1/dashboard`) | Done |
| Users list + detail (search, filters, suspend, extend, offline payment) | Done |
| Subscriptions list (Razorpay rows, extend / activate / cancel) | Done |
| Payments list (Razorpay + offline, filters, mark paid, monthly revenue) | Done |
| Access codes (generate, list, disable) | Done |
| Bookings (list + read-only detail) | Done |
| Quotations (list + read-only detail) | Done |
| Notifications (compose + sent log) | Done |
| Support (contact inquiries, resolve/reopen) | Done |
| App version (iOS + Android config) | Done |
| Settings (app name, support email, payment details) | Done |
| Menu Categories CRUD (`/admin/v1/menu-categories`) | Done |
| Menu Items CRUD (`/admin/v1/menu-items`, global vs business scope) | Done |
| Supply Categories CRUD (`/admin/v1/supply-categories`) | Done |
| Supply Items CRUD (`/admin/v1/supply-items`) | Done |
| Units CRUD (`/admin/v1/units`) | Done |
| Service Types CRUD (`/admin/v1/service-types`) | Done |
| Extra Services CRUD (`/admin/v1/extra-services`, global vs business) | Done |
| Bulk Import (CSV hub, map columns, import menu/supply/categories) | Done |
| Sidebar nav (all Stitch modules linked) | Done |
| Logs (audit timeline) | Done |

## Backend admin routes

- `GET /api/admin/v1/dashboard`
- `GET /api/admin/v1/users` — list with `q`, `plan`, `status`, `page`, `limit`
- `GET /api/admin/v1/users/:id`
- `PATCH /api/admin/v1/users/:id/suspend`
- `PATCH /api/admin/v1/users/:id/subscription`
- `POST /api/admin/v1/users/:id/offline-payment`
- `GET /api/admin/v1/subscriptions`
- `GET|PATCH /api/admin/v1/subscriptions/:id`
- `GET /api/admin/v1/payments`
- `PATCH /api/admin/v1/payments/:id` (mark paid / update status)
- `GET|POST /api/admin/v1/access-codes`
- `PATCH /api/admin/v1/access-codes/:id`
- `GET /api/admin/v1/bookings`
- `GET /api/admin/v1/bookings/:id`
- `GET /api/admin/v1/quotations`
- `GET /api/admin/v1/quotations/:id`
- `GET|POST /api/admin/v1/notifications`
- `GET /api/admin/v1/support`
- `PATCH /api/admin/v1/support/:id` (`status`: `open` | `resolved`)
- `GET|PUT /api/admin/v1/app-version`
- `GET|PUT /api/admin/v1/settings`
- `GET /api/admin/v1/logs`

Run migrations: `cd katmitra-backend && npx prisma migrate deploy` (access codes, notification log, contact message status, app version config, app settings, activity log)
- `GET|POST /api/admin/v1/menu-categories`
- `PUT|DELETE /api/admin/v1/menu-categories/:id`
- `GET /api/admin/v1/businesses` — business picker
- `GET|POST /api/admin/v1/menu-items`
- `PUT|DELETE /api/admin/v1/menu-items/:id`
- `GET|POST /api/admin/v1/supply-categories`
- `PUT|DELETE /api/admin/v1/supply-categories/:id`
- `GET|POST /api/admin/v1/units`
- `PUT|DELETE /api/admin/v1/units/:id`
- `GET|POST /api/admin/v1/service-types`
- `PUT|DELETE /api/admin/v1/service-types/:id`
- `GET|POST /api/admin/v1/extra-services`
- `PUT|DELETE /api/admin/v1/extra-services/:id` (delete = deactivate)
- `GET /api/admin/v1/bulk-import/schemas`
- `GET /api/admin/v1/bulk-import/templates/:type` (CSV download)
- `POST /api/admin/v1/bulk-import` (JSON body: type, rows, mapping, options)
- `GET|POST /api/admin/v1/supply-items`
- `PUT|DELETE /api/admin/v1/supply-items/:id` (delete = deactivate)

All require `Authorization: Bearer <token>` and `User.role = admin`.

## Frontend layout

- `src/lib/adminAuth.ts` — token + login
- `src/lib/adminApi.ts` — authenticated fetch
- `src/services/adminService.ts` — admin API calls
