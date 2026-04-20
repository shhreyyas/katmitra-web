# Katmitra Admin Panel

Next.js App Router admin panel for Katmitra SaaS operations.

## Setup

1. Copy env:
   - `cp .env.example .env.local`
2. Install:
   - `npm install`
3. Seed:
   - `npm run seed`
4. Run:
   - `npm run dev`

## Modules

- Admin Auth (JWT cookie + protected routes + forgot password API)
- Dashboard (stats + monthly revenue + user growth charts)
- Users (search, details, edit/suspend, soft delete API)
- Access Codes (single/bulk generate, disable, usage status)
- Subscriptions / Payments management
- Quotations & Bookings monitoring
- Notifications (send to all + logs)
- Support tickets
- Settings
- Logs (admin login / code usage / payment logs)
