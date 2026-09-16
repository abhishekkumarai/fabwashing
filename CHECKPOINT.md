# PROJECT CHECKPOINT — WashNLaundry LaundryPro Clone

> Resume file. If context was reset, READ THIS FIRST, then continue from "NEXT STEPS".
> Last updated: 2026-07-21

## TASK (from user)
Clone the website https://fabwashing.sisplerp.com/login (a dummy app called **WashNLaundry LaundryPro**, a multi-branch laundry/dry-cleaning ERP).
- Frontend: **Next.js**
- Backend: **Django** with **database** support
- Deploy targets: **Vercel** (frontend) + **Render** (backend/DB)
- **Dockerize** the whole project
- **Test** the functionality
- Write a **PRD** into this directory (`C:\Users\abhi3\Documents\work\aditya\fabwashing`) that is **LLM-readable** so a future LLM does NOT need to re-explore the codebase.

## USER DECISIONS (locked)
1. **Clone scope = FULL APP** (every sidebar module functional + DB-backed). Build incrementally.
2. **Auth = SIMPLE BYPASS**. Clicking "Sign in" just enters the dashboard; no real backend auth check. Login page should still visually match the original (Phone OTP + Email/password tabs, static dev OTP 123456, prefilled phone 9999999999).
3. User asked to keep token/context reset in mind and work against this checkpoint.

## TARGET APP OVERVIEW
- Name: **WashNLaundry LaundryPro** — subtitle "Multi-branch · Franchise"
- Login title: "WashNLaundry LaundryPro" / "Phone OTP or staff email & password"
- Language toggle EN / HI (Hinglish/Romanized Hindi) top-right on every page.
- Top bar: `Branch: [All branches]` selector (left), language toggle, Alerts bell, phone number `9999999999`, `Sign out` (right).
- Currency: INR (₹). GST: "Auto-split CGST + SGST", "GST on".
- Seed branches (3): **PAT01** Patna-01 Boring Road, **PAT-PL** Patna Central Plant, **PAT02** Patna-02 Rajendranagar — all Patna, Bihar.
- Seed customer: **Aditya singh**, phone 9835555329, "Since Jul 2026", status New.
- Design: light theme, white cards, rounded corners, soft shadows, blue primary (#2563eb-ish "Sign in" button), gradient accent bars under page headers, KPI stat cards row, lucide-style icons. Sidebar is white with grouped sections.

## LOGIN PAGE DETAILS (/login)
- Card centered. Title "WashNLaundry LaundryPro", subtitle "Phone OTP or staff email & password".
- Tabs: **Phone OTP** (active) | **Email & password**.
- Phone OTP tab: "Mobile number" input (prefilled 9999999999, helper "10 digits, starts with 6–9"), "OTP" 6-box input (prefilled 123456) + "Send OTP" button (helper "6-digit code sent on SMS").
- Blue "Sign in" button (full width).
- Info banner: "Dev static OTP: 123456 (not used in production)".
- Footer: "Organisation signup is closed. Contact your admin for access."
- Clicking "Sign in" -> navigates to /dashboard.

## SIDEBAR NAVIGATION (full, grouped)
Header: "WashNLaundry LaundryPro" / "Multi-branch · Franchise"
- (top) **Dashboard** `/dashboard`, **Operations** `/operations`
- **STORE COUNTER**: New Order (POS) `/pos`, Orders `/orders`, Bags & challans `/transfers`, Customer pickup / delivery `/pickup-delivery`, Track order `/timeline`
- **PLANT · WASH HUB**: Plant intake `/plant`, Challans `/transfers`, Workshop `/workshop`, Scan / QC `/scan`, Orders in plant `/orders`, Track order `/timeline`
- **FIELD**: My Runs `/runs` (href TBD, guess)
- **CUSTOMERS**: Customers `/customers`, Loyalty `/loyalty`, Messages `/messages` (badge "soon")
- **BUSINESS**: Catalog `/catalog`, Inventory `/inventory`, Expenses `/expenses`, Staff `/staff`, Reports `/reports`, Franchise `/franchise`, Cash close `/cash-close`
- **SYSTEM**: Clock in / out `/clock-in`, Audit log `/audit`, Settings `/settings`

## MODULE DETAILS CAPTURED (screenshots reviewed)
Common page pattern: header row (icon + title + subtitle + right-side action buttons), gradient accent bar, row of KPI stat cards, search bar + filter chips + view toggles (list/grid), then a table or empty-state.

- **/dashboard**: "Today's snapshot" (Live overview · last 30 days). Buttons: "+ New customer", "New order →". Links: Reports, Audit log. KPI cards: TODAY REVENUE ₹0 / ORDERS TODAY 0 (Auto-split CGST+SGST) / CUSTOMERS 1 (Active profiles) / REPEAT RATE 0.0%. Charts: "REVENUE — LAST 30 DAYS" (line chart, x=dates 06-23..07-21), "SERVICE MIX (30D)" (No data), "TURN-AROUND TIME (30D)" (MEDIAN / P90 legend), "PAYMENT MIX (30D)" (No payments yet), "TOP STAFF (30D)" (No activity yet). "Branches" section: 3 cards (revenue/orders per branch).
- **/pos** (New Order): Header "New order · PAT01 · Patna-01 Boring Road · GST on", right "0 lines" cart chip. Step "1 · CUSTOMER" search "Search by name or mobile…" + Select button. Step "2 · SERVICES" search "Search services…" (locked until customer selected). Right rail = Cart (empty state "Cart is empty / Tap a service tile to add it", "Add services first" button).
- **/orders**: Header "Orders — Pipeline, payments & due dates — counter and plant in one desk". Buttons: On track badge, "0 today", Export, "+ New order". KPI cards: TODAY 0 (₹0), NEW 0, WORKSHOP 0, READY 0, OUTSTANDING ₹0 (0 open · 0 unpaid), OVERDUE 0. Pipeline stage counters: Booking, Pickup, Picked, Received, Sorted, In, QC, Packed, Out, Delivered, Closed (each with count + colored dot). Search "Invoice, customer name, or phone…" + Go. Filters: All branches, All payments, Newest first, list/grid toggle. Chips: All, New, Workshop, Ready, Overdue, Due today, Unpaid, Done. Empty: "No orders match".
- **/customers**: Header "Customers — CRM, segments & LTV — laundry retention and re-engagement". Buttons: "LTV ₹0", Export, "+ Add customer". KPI cards: TOTAL 1, NEW +1 this month, ACTIVE 0 (0% · 60d), AT RISK 0 (60-120d), VIP 0 (≥₹10,000), BIRTHDAY 0. "PORTFOLIO LTV ₹0". Search + filter chips: All, VIP, Active, At risk, Inactive, New 30d, Birthday. Sort "Recently added". Table cols: CUSTOMER (avatar+name+since), CONTACT (phone + msg/call icons), TAGS, ORDERS, LTV, LAST ORDER, STATUS, ACTIONS (row action icons). Seed row: Aditya singh / 9835555329 / 0 orders / ₹0 / New.
- **/catalog**: Header "Service catalog — Categories & services for POS — pricing, TAT, piece rates". "0 services" chip + add. KPI cards: CATEGORIES 1, SERVICES 0, PER KG 0, PER PIECE 0. Search. Mode filter chips: All modes, Per KG, Per Piece, Flat, Per SqFt. Two-pane: CATEGORIES list (seed "Dry cleaning", "+ New") | services panel for selected category ("Dry cleaning / 0 services").
- **/inventory**: Header "Inventory & consumables — All branches · stock, alerts & transfers". "+ Add item". KPI cards: TOTAL ITEMS 0, STOCK VALUE ₹0, ACTIVE ALERTS 0 (all clear), BELOW REORDER 0. Search "Search SKU or name…", branch filter. Chips: All stock, Low stock, PAT01, PAT-PL, PAT02. "Stock ledger" table cols: SKU/ITEM, BRANCH, STOCK LEVEL, BALANCE, UNIT COST, VALUE, ACTIONS. Empty state.
- **/staff**: Header "Staff & Attendance — PIN clock-in · shift commissions · roster & lockouts". "1 staff" chip + "+ Add staff". KPI cards: ROSTER 1, PIN SET 0, LOCKED 0, OPEN SHIFTS 0. "Branches & Super Admins" — cards: Org Super Admin (FULL ACCESS, ADMINS 1, PIN SET 0, "+ Add Super Admin"), then per-branch cards (PAT01 LIVE STORE, PAT-PL PLANT, PAT02 STORE) each with STAFF/PIN/LOCKED counts + "click to open roster".

## MODULES CAPTURED (all remaining — full coverage now complete)
- **/operations**: LIVE NETWORK badge. "Command center for pipeline bottlenecks, stuck orders, open challans, and MTD revenue." Buttons: Reports, Transfers, Workshop. KPI: REVENUE MTD ₹0, ACTIVE PIPELINE 0, OPEN CHALLANS 0, CRITICAL ALERTS 0 (0 stuck · 0 issues). "30-day revenue trend" chart + Full reports link.
- **/plant** (Plant intake): "Bags & orders coming into the washing center — allot runner, dispatch pickup, receive". Plant selector (PAT-PL default). KPI: AWAITING ALLOT 0 / IN TRANSIT 0 / NEED CHALLAN 0. "Plant workflow" 3-step explainer. "Awaiting allot / dispatch" empty list.
- **/workshop**: "Batches, machines & QC — plant floor desk". Buttons: Idle ready, 0 active, Scan floor, "+ New batch". KPI: ACTIVE / RUNNING / AWAITING QC / QC DONE / IN PLANT / MACHINES FREE (0/0). Search + chips (All, Created, Assigned, Running, Awaiting QC, QC done). **Kanban board** cols: CREATED, ASSIGNED, RUNNING, COMPLETE (drag-drop "Drop here").
- **/scan** (Scan/QC): "Scan garment — QR, OCR or paste — advance garments · engine Tesseract.js". Buttons: 0 this session, QR, Workshop, Orders. KPI: RECENT TRAIL / THIS SESSION / INPUT MODE (QR) / TARGET STAGE (Sorted). Input tabs: QR camera, OCR tag, Paste/type. Camera viewport + RECENT SCANS rail.
- **/transfers** (Bags & challans AND Challans): "Transfers — Challans moving garments store ↔ plant · scan out, run, scan in". Buttons: Healthy, 0 open, Export, "+ New challan". KPI: OPEN / REQUESTED / IN TRANSIT / RECEIVED / MISSING / QC ISSUES. Search + Go, dir/branch/sort filters, chips (All, Requested, In transit, Received, Missing items, QC issues, Cancelled). Table/empty.
- **/pickup-delivery**: "Pickup & Delivery — Last-mile dispatch ... riders work jobs on /rider". Buttons: On track, 0 open, Rider app, "+ Book job". KPI: TODAY / OPEN / PICKUPS / DELIVERIES / UNASSIGNED / COD DUE. Stage counters: Scheduled, Assigned, En route, Arrived, Completed, Failed. chips (All, Open, Pickups, Deliveries, No rider, COD due, Completed, Failed).
- **/timeline** (Track order): "Order Timeline — Journey tracker — dwell times, bottlenecks & SLA from counter to delivery". KPI: ACTIVE / OVERDUE / WORKSHOP / READY-OUT / AVG TAT / DONE TODAY. Stage counters: Order Received, Pickup Assigned, Picked Up, Washing Center, Washing In, Packed & Ready, Out for Delivery, Delivered. chips (Active, Overdue, Workshop, Ready, Slow (>24h), Completed, All).
- **/loyalty**: "Loyalty & referrals — Points, redeem rates & referral rewards". Buttons: 1 pts/₹100, Rules, Customers. KPI: ACCOUNTS / IN CIRCULATION / LIFETIME EARNED / LIFETIME REDEEMED / REFERRALS / PENDING-BLOCKED. Rule chips: Earn 1 pt/₹100, Redeem 1 pt = ₹0.5, Referral +50 pts both sides. Panels: Top loyalty accounts, Referrals.
- **/expenses**: "Expenses & P&L — Branch profit & loss · ITC-eligible roll-up · period 2026-07". Buttons: period, Categories, "+ Add expense". KPI: REVENUE / EXPENSES / NET PROFIT. "Per-branch P&L" cards (PAT-PL/PAT01/PAT02, PROFIT badge, REV/EXP bars, NET, orders/expenses count). "Recent expenses" table.
- **/reports**: BUSINESS INTELLIGENCE badge. "Executive scorecard, mix, TAT, branches, and staff — Last 30 days". Buttons: Analytics, Ops, GSTR-1. Range chips: 7/14/30/90 days, This month + branch dropdown. KPI: REVENUE / ORDERS / AVG ORDER / COLLECTED / TAT MEDIAN / REPEAT. Sub-tabs: Overview, Revenue, Service & pay, TAT & ops, Branches, Staff, Export.
- **/franchise**: FRANCHISE LEDGER badge. "Franchise settlements — Monthly commission, royalty, ad-fund & plant fees ... generate, collect, export." "Manage fee rules →". Buttons: Reports, month selector, Export, "Generate period". KPI: TOTAL DUE / COLLECTED / OUTSTANDING / FRANCHISE SHOPS.
- **/cash-close**: "End-of-day till reconciliation: expected cash from SUCCEEDED CASH payments vs counted drawer. Variance over ₹50 needs a reason." "Open till for a day" form (Branch, Business date, Open till). Table: DATE/BRANCH/EXPECTED/COUNTED/VARIANCE/STATUS/ACTIONS.
- **/clock-in**: "Clock in / out — Tap your name → enter PIN". Empty "No PIN set. Ask the manager."
- **/audit**: "Audit Log — Complete, append-only chronological record of all system mutations." Filters: All Entities / All Actions / All users / date range + Filter. Timeline events (CREATE ServiceCategory, CREATE Customer by Rajesh Kumar, 20 Jul 2026). Entities include ServiceCategory, Customer; action CREATE.
- **/settings**: CONTROL CENTER badge. "Settings — Demo Laundry Patna · Bihar". SETUP HEALTH ring 86% (6/7 essentials, 1 left). Search. FINISH SETUP chip. BUSINESS IDENTITY cards: Organisation & tax (Legal name, GSTIN, billing state, e-invoice IRN), Financial years, Branches, + more (5 total).
- **/rider** (My Runs): redirects non-riders to /dashboard?notRider=1. Rider mobile job view.
- **/runs, /messages**: 404 (Next.js default "404 | This page could not be found"). Messages sidebar item has "soon" badge = not implemented.
- **Login Email tab**: (inferred, session auto-persisted so couldn't re-view) swaps Phone/OTP for "Staff email" + "Password" fields + Sign in.
- Org name in Settings: **Demo Laundry Patna**. Admin user in audit: **Rajesh Kumar**.

## PROPOSED TECH ARCHITECTURE
- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS. lucide-react icons. Recharts for charts. Zustand or React Context for branch/language state. i18n EN/HI (simple dictionary). Talks to Django REST API via env `NEXT_PUBLIC_API_URL`.
- **Backend**: Django + Django REST Framework. Postgres (Render managed DB) in prod, SQLite for local/dev fallback. Apps: `core` (branches, org, settings), `catalog`, `customers`, `orders` (+ pipeline stages, POS), `inventory`, `staff`, `expenses`, `loyalty`, `reports` (aggregations), `audit`. CORS for the Vercel domain. Simple-bypass auth: a `/api/auth/login` that accepts anything and returns a fake token; DRF endpoints open/AllowAny.
- **DB models (draft)**: Branch, Customer, ServiceCategory, Service, Order, OrderLine, OrderStageEvent, Payment, InventoryItem, StockLedgerEntry, Staff, Expense, LoyaltyEntry, AuditLog, Settings.
- **Seed data**: 3 branches, 1 customer (Aditya singh), 1 category (Dry cleaning) via Django migration/fixture/management command.
- **Docker**: `docker-compose.yml` with services: `web` (Next.js), `api` (Django/gunicorn), `db` (Postgres). Dockerfile per app. `.env.example`.
- **Deploy**: Vercel for `frontend/` (Next.js). Render `render.yaml` for Django web service + managed Postgres. Document both in PRD/README.

## PLANNED DELIVERABLES / DIRECTORY LAYOUT
```
fabwashing/
  PRD.md                <- main deliverable (LLM-readable spec)
  CHECKPOINT.md         <- this file
  README.md             <- run/deploy instructions
  docker-compose.yml
  .env.example
  frontend/             <- Next.js app
  backend/              <- Django project
    render.yaml
```

## PROGRESS — ALL COMPLETE ✅
- [x] Explored ALL modules (findings above + in PRD.md §6).
- [x] Wrote **PRD.md** (comprehensive, LLM-readable — the source of truth for the build).
- [x] Backend built (`backend/`): Django 5 + DRF, single `api` app — all models/viewsets/summary/seed/auth-bypass. Verified.
- [x] Frontend built (`frontend/`): Next.js 16 (App Router) + Tailwind v4 + shell + all 24 routes + EN/HI i18n. `next build` passes (26 routes).
- [x] Docker: `docker-compose.yml` (db+api+web) + Dockerfiles + entrypoint + `.env.example`. **Built & ran successfully.**
- [x] Deploy configs: `backend/render.yaml` (web + Postgres) + Vercel steps in README.
- [x] Acceptance tests (PRD §11) — ALL PASS. Recorded in README.md table. Verified in browser + dockerized stack.

## KEY IMPLEMENTATION NOTES (for future edits)
- Frontend is **Next.js 16 / React 19 / Tailwind v4** (pre-existing scaffold; `frontend/AGENTS.md` says read `node_modules/next/dist/docs/` before coding — Next 16 has async request APIs, `middleware`→`proxy`, Turbopack default). Pages are all `"use client"` components calling the Django API via `src/lib/api.ts` (`NEXT_PUBLIC_API_URL`).
- Auth bypass lives in `src/lib/app-context.tsx` (localStorage `authed` flag); `(app)/layout.tsx` guards, login sets it.
- Backend consolidated into ONE app `api` (models/serializers/views/urls). Auth-on-mutation via `AuditedModelViewSet`. Order GST auto-split in `Order.recompute()` + `OrderSerializer` (uses `NestedOrderLineSerializer` for inline lines; `invoice_no` auto = `INV-00001`).
- Local backend uses SQLite (db.sqlite3) when `DATABASE_URL` unset; Docker/Render use Postgres. NOTE: the local SQLite and the Docker Postgres are SEPARATE DBs (each seeded independently).
- To run: `docker compose up --build` (web :3000, api :8000, db :5432). Web needed `HOSTNAME=0.0.0.0` in compose for Next standalone to bind publicly.

## NEXT STEPS (resume here)
1. Build `backend/` per PRD §7/§8/§12. Consolidate into ONE Django app named `api` (not 12 apps) for simplicity.
2. Build `frontend/` per PRD §9. Shell + login + all ~24 routes.
3. Docker + Render (`render.yaml`) + Vercel configs.
4. `docker compose up`, run acceptance checks (PRD §11), document in README.md.

## ENVIRONMENT NOTES
- OS: Windows 11, shell PowerShell (Bash tool also available). Project dir is NOT a git repo yet.
- Tooling present: Node v24.13.0, npm 11.6.2, Python 3.12.6 (also `py`), pip 26.1.2, Docker 29.5.2, git 2.46.
- Browser automation: navigate + standalone screenshot works; navigate+wait+screenshot inside browser_batch tends to time out on the screenshot — take screenshots as standalone calls.
- Tab in use for exploration: tabId 1498390298 (may differ after reset — call tabs_context_mcp).
- DELIVERABLES SO FAR: PRD.md (done), CHECKPOINT.md (this).
```
