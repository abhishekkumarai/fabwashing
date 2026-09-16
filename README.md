# WashNLaundry LaundryPro — Clone

A full clone of the dummy laundry/dry-cleaning ERP at `https://fabwashing.sisplerp.com`.
**Next.js** (frontend) + **Django REST Framework** (backend) + **PostgreSQL**, dockerized and
deployable to **Vercel** (frontend) + **Render** (backend + DB).

> **Auth is intentionally bypassed** (per the brief): the login page matches the original visually,
> but clicking **Sign in** just enters the dashboard — no real credentials are checked. See `PRD.md §1.1`.

- **`PRD.md`** — the complete product/engineering spec. Every route, KPI, table, model, and endpoint is
  documented there so an LLM can extend this project **without re-exploring the codebase**. Read it first.
- **`CHECKPOINT.md`** — build progress / resume notes.

## Repo layout
```
fabwashing/
  PRD.md                 # source-of-truth spec
  CHECKPOINT.md          # progress notes
  docker-compose.yml     # db + api + web
  .env.example
  backend/               # Django + DRF (single `api` app)
    render.yaml          # Render blueprint (web service + Postgres)
    Dockerfile, entrypoint.sh
  frontend/              # Next.js 16 (App Router) + Tailwind v4
    Dockerfile
```

## Quick start — Docker (recommended)
```bash
docker compose up --build
```
- Frontend: http://localhost:3000  (redirects to `/login`; click **Sign in**)
- API:      http://localhost:8000/api/
- Postgres: localhost:5432
The API container runs migrations + seed automatically on start.

## Quick start — local (no Docker)
**Backend** (uses SQLite when `DATABASE_URL` is unset):
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed
python manage.py runserver 127.0.0.1:8000
```
**Frontend:**
```bash
cd frontend
npm install --legacy-peer-deps
# .env.local already sets NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev      # or: npm run build && npm run start
```
Open http://localhost:3000.

## Seed data (matches the original demo tenant)
- Org **Demo Laundry Patna** (Bihar)
- 3 branches: **PAT01** Patna-01 Boring Road, **PAT-PL** Patna Central Plant, **PAT02** Patna-02 Rajendranagar
- 1 customer: **Aditya singh** (9835555329)
- 1 service category: **Dry cleaning**
- 1 staff: **Org Super Admin**; 2 seed audit events (by Rajesh Kumar)

## Deployment

### Backend + DB → Render
1. Push this repo to GitHub.
2. In Render: **New + → Blueprint**, select the repo. `backend/render.yaml` provisions a free web
   service + managed Postgres, runs migrate + seed on deploy.
3. After the frontend is on Vercel, set the API service's **`CORS_ALLOWED_ORIGINS`** env var to your
   Vercel URL (e.g. `https://your-app.vercel.app`).

### Frontend → Vercel
1. In Vercel: **Add New → Project**, import the repo, set **Root Directory = `frontend`**.
2. Env var **`NEXT_PUBLIC_API_URL`** = your Render API URL (e.g. `https://laundrypro-api.onrender.com`).
   (Must be set before build — it is inlined into the client bundle.)
3. Deploy.

## API surface
`/api/auth/login` (bypass), full CRUD ViewSets for every model, plus summary endpoints
(`/api/dashboard/summary`, `/api/orders/summary`, `/api/customers/summary`, `/api/reports/summary`,
`/api/operations/summary`, `/api/counts`). All endpoints are `AllowAny`. See `PRD.md §8`.

## Verified functionality (acceptance tests — PRD §11)
All checked against the running stack:

| Check | Result |
|---|---|
| Login bypass: `/login` → **Sign in** → `/dashboard`, no credentials | ✅ |
| App shell (sidebar groups, top bar: branch selector, EN/HI, phone, Sign out) on every page | ✅ |
| All 24 module routes render (KPIs, filters, tables/empty states); `/messages` = "coming soon" | ✅ |
| Seed data present (3 branches, Aditya singh, Dry cleaning, 2 audit events) | ✅ |
| **Customers CRUD**: add "Priya Sharma" → row appears, TOTAL 1→2, audit event written | ✅ |
| **Catalog**: add service under Dry cleaning → SERVICES count increments | ✅ |
| **Orders/POS**: create order (2 × ₹200) → INV-00001, subtotal ₹400, CGST ₹36, SGST ₹36, total ₹472 | ✅ |
| Summary endpoints reflect created data (orders TODAY 1, OUTSTANDING ₹472, Booking 1) | ✅ |
| Mutations append AuditLog rows | ✅ |
| Frontend production build (`next build`) — 26 routes, TypeScript passes | ✅ |
| i18n EN/HI toggle switches strings and persists (localStorage) | ✅ |

## Notes / limitations (by design)
- No real OTP/SMS, no payment gateway, Scan uses a UI shell (no real QR/OCR hardware), GSTR-1 is a
  UI/export placeholder — see `PRD.md §1.1`.
- Frontend is Next.js 16 (App Router, Tailwind v4). Pages are client components that call the Django API.
