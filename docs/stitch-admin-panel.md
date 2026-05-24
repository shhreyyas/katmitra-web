# Katmitra Admin Panel — Stitch (Google)

This folder tracks **design generation payloads** used with Google Stitch MCP (`tools/call`).

## Stitch project

| Field | Value |
| --- | --- |
| **Title** | Katmitra Admin Panel *(use this spelling unless you intentionally want “Catmira”)* |
| **Project resource** | `projects/13574437747058455058` |
| **Project ID** (for API) | `13574437747058455058` |
| **Design system asset** | `assets/11681309600308476629` — *Katmitra Admin — Dark Slate + Gold* |
| **Device** | DESKTOP |

Open the project in the Stitch web UI (same Google account as your API key). The canvas should show the latest thumbnails after generation runs.

## What was generated

| Screen | Script | Status |
| --- | --- | --- |
| Admin login | `stitch-generate-login.json.req` | Done |
| Dashboard (v1 shell) | `stitch-generate-dashboard.json.req` | Done — superseded by complete version |
| **Dashboard (complete)** | `stitch-generate-dashboard-complete.json.req` | Done |
| **Users list** | `stitch-generate-users-list.json.req` | Done |
| **User detail** | `stitch-generate-users-detail.json.req` | Done |
| **Menu Categories list** | `stitch-generate-menu-categories-list.json.req` | Done |
| **Menu Category — Add** (drawer) | `stitch-generate-menu-category-form.json.req` | Done |
| **Menu Category — Edit** (drawer) | `stitch-generate-menu-category-edit.json.req` | Done |

### Dashboard checklist (complete screen)

- 6 KPI cards (users, active subs, expired, revenue, bookings, quotations)
- Monthly revenue chart + user growth chart
- Recent bookings table + support inbox preview
- Quick actions (access codes, notification, export CSV)
- Top bar (search, notifications badge, avatar)

### Users tab checklist

- List: search, plan/status filters, data table, pagination, View/Suspend actions
- Detail: business + subscription info, extend/cancel/suspend, offline payment, history

### Menu Categories checklist

- List: search, status filter, sort, Global badge, thumbnail, slug, sort order, item count, Edit/Delete
- Add drawer: image upload, EN / HI / Kutchi tabs, slug, sort order, active toggle, global helper text
- Edit drawer: prefilled names, delete danger zone (linked items warning)

### Menu Items (one module — not separate “global” screen)

**Product rule:** Admin-created items default to **Global** (`isGlobal`, no `businessId`). When a caterer asks for a private item, admin picks **Business only** and selects that caterer → stored with `businessId` + `isGlobal = false`.

| Stitch screen | Script |
| --- | --- |
| Menu Items list (filters: Global / Business-specific + business picker) | `stitch-generate-menu-items-list.json.req` |
| Add Menu Item (Availability: Global vs Business only) | `stitch-generate-menu-item-form.json.req` |

Backend already supports scope via `MenuItem.businessId` + `isGlobal` in `katmitra-backend`.

### Supply Categories checklist

| Stitch screen | Script |
| --- | --- |
| Supply Categories list | `stitch-generate-supply-categories-list.json.req` |
| Add Supply Category drawer | `stitch-generate-supply-category-form.json.req` |

### Supply Items (ingredients + utensils — one module)

**Product rule:** Same as menu items — admin default **Global**; **Business only** when a caterer requests a private supply row (`SupplyItem.businessId` + `isGlobal` in backend).

| Stitch screen | Script |
| --- | --- |
| Supply Items list (Ingredients \| Utensils tabs, filters) | `stitch-generate-supply-items-list.json.req` |
| Add Supply Item (type, availability, units, photo) | `stitch-generate-supply-item-form.json.req` |
| Edit Supply Item | `stitch-generate-supply-item-edit.json.req` |

### Units (global only)

**Product rule:** Units are always global (`Unit` table — name + slug). No per-business scope.

| Stitch screen | Script |
| --- | --- |
| Units list | `stitch-generate-units-list.json.req` |
| Add Unit | `stitch-generate-unit-form.json.req` |
| Edit Unit | `stitch-generate-unit-edit.json.req` |

### Service Types (global — registration onboarding)

**Product rule:** Global only. Shown when caterers register/select catering types (`ServiceType` — localized name JSON, slug, icon, status).

| Stitch screen | Script |
| --- | --- |
| Service Types list | `stitch-generate-service-types-list.json.req` |
| Add Service Type | `stitch-generate-service-type-form.json.req` |
| Edit Service Type | `stitch-generate-service-type-edit.json.req` |

### Extra Services (booking add-ons)

**Product rule:** Same availability pattern — **Global** template for all caterers, or **Business only** when one caterer needs a private add-on. Fields: title, description, pricing type (Fixed / Per guest / Per unit), price, optional flag, active.

| Stitch screen | Script |
| --- | --- |
| Extra Services list | `stitch-generate-extra-services-list.json.req` |
| Add Extra Service | `stitch-generate-extra-service-form.json.req` |
| Edit Extra Service | `stitch-generate-extra-service-edit.json.req` |

### Bulk Import

**Flow:** Hub → Upload file (CSV/XLSX) → Map columns → Import → Results with error report.

| Stitch screen | Script |
| --- | --- |
| Import hub (Menu / Supply / Categories cards + recent imports) | `stitch-generate-bulk-import-hub.json.req` |
| Upload + column mapping (stepper) | `stitch-generate-bulk-import-map.json.req` |
| Import results (success/skip/fail + error CSV) | `stitch-generate-bulk-import-results.json.req` |

PDF import noted as coming soon in hub design.

### Billing

| Stitch screen | Script |
| --- | --- |
| Subscriptions list | `stitch-generate-subscriptions-list.json.req` |
| Payments list | `stitch-generate-payments-list.json.req` |
| Access codes (generate + table) | `stitch-generate-access-codes.json.req` |

### Bookings & Quotations (monitor)

| Stitch screen | Script |
| --- | --- |
| Bookings list | `stitch-generate-bookings-list.json.req` |
| Booking detail (read-only) | `stitch-generate-booking-detail.json.req` |
| Quotations list | `stitch-generate-quotations-list.json.req` |
| Quotation detail (read-only) | `stitch-generate-quotation-detail.json.req` |

### Notifications, Support, System

| Stitch screen | Script |
| --- | --- |
| Notifications (compose + sent log) | `stitch-generate-notifications.json.req` |
| Support (inbox + contact settings tabs) | `stitch-generate-support.json.req` |
| App version (iOS + Android) | `stitch-generate-app-version.json.req` |
| General settings | `stitch-generate-settings.json.req` |

### Optional (not generated yet)

- **Logs** — admin login, code usage, payment/webhook audit table

---

**Stitch UI coverage:** All planned admin modules now have at least one screen in project `13574437747058455058`. Review in [Stitch](https://stitch.withgoogle.com/) → **Katmitra Admin Panel**.

## Local API request templates

JSON-RPC bodies for Cursor / scripts (API key stays in **`~/.cursor/mcp.json`**, never commit it):

- `stitch-generate-login.json.req` — login screen prompt  
- `stitch-generate-dashboard.json.req` — dashboard shell prompt  

Replay with:

```bash
API_KEY="$(python3 -c 'import json; print(json.load(open("/Users/harsh/.cursor/mcp.json"))[\"mcpServers\"][\"stitch\"][\"headers\"][\"X-Goog-Api-Key\"])')"
curl -sS -m 600 -X POST "https://stitch.googleapis.com/mcp" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Goog-Api-Key: $API_KEY" \
  -d @katmitra-web/scripts/stitch-generate-login.json.req
```

Adjust `prompt` inside the `.req` file and rerun for variations.

## MCP in Cursor

`~/.cursor/mcp.json` should keep:

```json
{
  "mcpServers": {
    "stitch": {
      "url": "https://stitch.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "<your-key-from-stitch.withgoogle.com/settings>"
      }
    }
  }
}
```

Restart Cursor after changes. If Stitch shows errors, confirm the API key is still valid.
