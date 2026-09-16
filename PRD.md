# PRD — WashNLaundry LaundryPro (Clone)

> **Purpose of this document:** Complete, self-contained product + engineering spec for a clone of the dummy app at
> `https://fabwashing.sisplerp.com`. It is written so an LLM (or engineer) can build, extend, or maintain the codebase
> **without re-exploring the original site or re-reading the whole codebase**. Every route, KPI, table, filter, model,
> and API endpoint is enumerated below. Treat this file as the source of truth.

---

## 1. Product summary

- **Product name:** WashNLaundry LaundryPro
- **Tagline / subtitle:** "Multi-branch · Franchise"
- **What it is:** A multi-branch / franchise **laundry & dry-cleaning ERP + POS**. It manages the full lifecycle of a
  garment order from counter booking → pickup → plant/wash-hub processing → QC → packing → delivery, plus CRM, catalog,
  inventory, staff/attendance, expenses/P&L, loyalty, franchise settlements, reports, cash reconciliation, and audit.
- **Region / conventions:** India. Currency **INR (₹)**. GST is "Auto-split CGST + SGST". Dates like "20 Jul 2026".
- **Demo org:** "Demo Laundry Patna", Bihar. Admin user shown in audit trail: "Rajesh Kumar".

### 1.1 Clone scope & non-goals (LOCKED DECISIONS)
- **Scope = FULL APP.** Every sidebar module is a real, DB-backed page (not a stub). Build incrementally but cover all.
- **Auth = SIMPLE BYPASS.** The login page visually matches the original but performs **no real authentication**.
  Clicking **Sign in** just routes to `/dashboard`. All API endpoints are open (`AllowAny`). No password hashing, no
  real OTP verification, no user accounts required. (A future hardening pass could add real auth; out of scope now.)
- **Not building:** real SMS/OTP delivery, real QR/OCR scanning hardware integration (Scan page is a UI shell),
  e-invoice/GST government filing (GSTR-1 is a UI/export placeholder), payment gateway. These are represented as UI +
  local data only.

### 1.2 Target platforms
- **Frontend:** Next.js → deploy to **Vercel**.
- **Backend:** Django + DRF + PostgreSQL → deploy to **Render** (web service + managed Postgres).
- **Local/dev:** Docker Compose (web + api + db). SQLite fallback for zero-config local runs.

---

## 2. Personas (for context only; not enforced by auth)
- **Org Super Admin** — full access, all branches (this is the default logged-in user in the clone).
- **Branch staff** — store counter operators (POS, orders, pickup/delivery).
- **Plant staff** — wash hub (plant intake, workshop batches, scan/QC, challans).
- **Rider** — last-mile pickup/delivery ("My Runs" / `/rider`).

---

## 3. Design system (visual spec)

- **Theme:** light. Page background very light gray (`#f7f8fa`-ish). Cards white, rounded (`rounded-xl`/`2xl`), soft
  shadow, thin light border.
- **Primary color:** blue `#2563eb` (buttons like "Sign in", "New order"). Dark buttons: near-black `#0b1220` (e.g.
  "New customer", "GSTR-1", "Generate period"). Accent gradients used on some primary CTAs (orange→amber on workshop
  "New batch", blue→teal on some headers).
- **Page header pattern (every module):** left = colored rounded-square **icon** + **title** (bold) + **subtitle**
  (muted). Right = contextual action buttons / status pills. A thin **gradient accent bar** sits directly under the
  header on most pages (blue→green→amber sweep).
- **KPI stat-card row:** a horizontal row of white cards, each = small ALL-CAPS label + tiny icon, a big value, and a
  muted sub-line. Present on nearly every module.
- **Filters:** a search input (often with `⌘K` hint + a "Go" button) followed by a row of **pill/chip filters**
  (rounded, active chip filled with brand/gradient color). Many pages also have `list / grid` view-toggle icons and
  dropdowns (branch, sort, payment, type).
- **Tables:** ALL-CAPS column headers, muted; rows with avatar/name, small inline icon action buttons on the right
  (`ACTIONS`), pagination footer ("1–1 of 1", page N/M).
- **Empty states:** centered large soft icon + bold line + muted helper line (e.g. "No orders match / Adjust filters…").
- **Top bar (authenticated shell):** left `Branch: [All branches ▾]`; right = language toggle **EN / HI** (translate
  icon), **Alerts** bell, the phone number `9999999999`, **Sign out** button.
- **Sidebar:** white, fixed left, ~260px. App title "WashNLaundry LaundryPro" + "Multi-branch · Franchise" at top. Grouped
  nav with ALL-CAPS section headers. Active item highlighted (light blue bg, blue text). lucide-react icons.
- **Icons:** lucide-react throughout. **Charts:** Recharts (line for revenue trends, etc.).
- **Fonts:** system/Inter-like sans.
- **i18n:** EN / HI toggle. HI = "Hinglish (Romanized Hindi)". Implement as a dictionary; default EN. Toggle persists
  in localStorage. (Only key strings need HI; untranslated fall back to EN.)

---

## 4. Information architecture / navigation

Sidebar groups and items (label → route). Icons are lucide names (suggested).

| Group | Label | Route | Icon |
|---|---|---|---|
| (top) | Dashboard | `/dashboard` | home |
| (top) | Operations | `/operations` | activity |
| STORE COUNTER | New Order (POS) | `/pos` | shopping-cart |
| STORE COUNTER | Orders | `/orders` | list |
| STORE COUNTER | Bags & challans | `/transfers` | arrow-left-right |
| STORE COUNTER | Customer pickup / delivery | `/pickup-delivery` | truck |
| STORE COUNTER | Track order | `/timeline` | history |
| PLANT · WASH HUB | Plant intake | `/plant` | factory |
| PLANT · WASH HUB | Challans | `/transfers` | arrow-left-right |
| PLANT · WASH HUB | Workshop | `/workshop` | layout-dashboard |
| PLANT · WASH HUB | Scan / QC | `/scan` | scan-line |
| PLANT · WASH HUB | Orders in plant | `/orders` | list |
| PLANT · WASH HUB | Track order | `/timeline` | history |
| FIELD | My Runs | `/rider` | bike |
| CUSTOMERS | Customers | `/customers` | users |
| CUSTOMERS | Loyalty | `/loyalty` | gift |
| CUSTOMERS | Messages | `/messages` | message-circle | *(badge "soon", route is a "coming soon" placeholder)* |
| BUSINESS | Catalog | `/catalog` | layers |
| BUSINESS | Inventory | `/inventory` | box |
| BUSINESS | Expenses | `/expenses` | receipt |
| BUSINESS | Staff | `/staff` | user-cog |
| BUSINESS | Reports | `/reports` | bar-chart |
| BUSINESS | Franchise | `/franchise` | building-2 |
| BUSINESS | Cash close | `/cash-close` | wallet |
| SYSTEM | Clock in / out | `/clock-in` | clock |
| SYSTEM | Audit log | `/audit` | shield |
| SYSTEM | Settings | `/settings` | settings |

Notes: `/login` is the only unauthenticated page. `/rider` shows a rider job view; in the original it redirects
non-riders to `/dashboard?notRider=1` — in the clone, render a simple rider runs view (bypass = show it).

---

## 5. Seed data (must ship in DB via migration/management command)

**Organisation:** `Demo Laundry Patna`, state `Bihar`, GST enabled, currency INR.

**Branches (3):**
| Code | Name | Type | City |
|---|---|---|---|
| PAT01 | Patna-01 Boring Road | LIVE STORE | Patna, Bihar |
| PAT-PL | Patna Central Plant | PLANT | Patna, Bihar |
| PAT02 | Patna-02 Rajendranagar | STORE | Patna, Bihar |

**Customer (1):** `Aditya singh`, phone `9835555329`, created "Jul 2026", status New, 0 orders, LTV ₹0.

**Service category (1):** `Dry cleaning` (0 services under it initially).

**Staff (1):** `Org Super Admin` (full access, 1 admin). Audit-trail user name: `Rajesh Kumar`.

**Audit seed (2 events):** CREATE ServiceCategory (Dry cleaning) and CREATE Customer (Aditya singh) by Rajesh Kumar
on 20 Jul 2026.

**Loyalty rules:** Earn 1 pt / ₹100; Redeem 1 pt = ₹0.5; Referral +50 pts both sides; same-device/same-address
auto-blocked.

Login page defaults: phone prefilled `9999999999`, OTP prefilled `123456`. Banner: "Dev static OTP: 123456
(not used in production)". Top-bar phone label everywhere: `9999999999`.

---

## 6. Page specs (per route)

> Common to all authenticated pages: the app shell (sidebar + top bar) described in §3. Only the main content differs.
> "KPI:" lists the stat cards left→right. Values below are the seed/empty-state values.

### 6.1 `/login` (unauthenticated)
- Centered card. Title "WashNLaundry LaundryPro"; subtitle "Phone OTP or staff email & password".
- Tabs: **Phone OTP** (default) | **Email & password**.
  - Phone OTP: "Mobile number" input (prefill 9999999999; helper "10 digits, starts with 6–9"); "OTP" 6-digit boxed
    input (prefill 123456) + "Send OTP" button (helper "6-digit code sent on SMS").
  - Email & password: "Staff email" input + "Password" input.
- Full-width blue **Sign in** button → routes to `/dashboard` (no validation; bypass).
- Info banner: "Dev static OTP: 123456 (not used in production)".
- Footer: "Organisation signup is closed. Contact your admin for access."
- Language toggle EN/HI top-right of the card.

### 6.2 `/dashboard`
- Header hero card: pill "Live overview · last 30 days"; title "Today's snapshot"; line "Deep dive in **Reports**,
  audit trail in **Audit log**." Buttons: "**+ New customer**" (dark), "**New order →**".
- KPI: **TODAY REVENUE** ₹0 (0 orders today, −0.0%) · **ORDERS TODAY** 0 (Auto-split CGST + SGST, −0.0%) ·
  **CUSTOMERS** 1 (Active profiles) · **REPEAT RATE** 0.0% (0/0 in last 90d).
- Charts row: "**REVENUE — LAST 30 DAYS**" line chart (x = last 30 daily dates, ₹0..₹4 y) + "avg ₹0" + Reports link;
  "**SERVICE MIX (30D)**" (No data in window).
- Second charts row: "**TURN-AROUND TIME (30D)**" (legend MEDIAN / P90) · "**PAYMENT MIX (30D)**" (No payments yet) ·
  "**TOP STAFF (30D)**" (No activity yet).
- "**Branches**" section (3 total): one card per branch with REVENUE ₹0 / ORDERS 0.

### 6.3 `/operations`
- Hero: pill "LIVE NETWORK"; title "Operations"; subtitle "Command center for pipeline bottlenecks, stuck orders, open
  challans, and MTD revenue." Buttons: Reports, Transfers, **Workshop** (dark).
- KPI: **REVENUE MTD** ₹0 · **ACTIVE PIPELINE** 0 · **OPEN CHALLANS** 0 · **CRITICAL ALERTS** 0 (0 stuck · 0 issues).
- "**30-day revenue trend**" (Network-wide order totals) line chart + "Full reports →".

### 6.4 `/pos` (New Order)
- Header: "New order" · "PAT01 · Patna-01 Boring Road · GST on"; right cart chip "0 lines".
- Left column steps: "**1 · CUSTOMER**" search ("Search by name or mobile…") + **Select** button. "**2 · SERVICES**"
  search ("Search services…") — locked with placeholder "Select a customer first / Look up by name or mobile above to
  unlock the service menu." until a customer is chosen; then show service tiles from Catalog.
- Right rail: "**Cart**" (0 lines). Empty: "Cart is empty / Tap a service tile to add it". Footer button "Add services
  first" (disabled) → becomes checkout when lines exist.
- Behavior: selecting customer + adding service lines → compute totals (GST auto-split CGST+SGST) → create Order.

### 6.5 `/orders` (also "Orders in plant")
- Header: "Orders" · "Pipeline, payments & due dates — counter and plant in one desk". Buttons: "On track" badge,
  "0 today", **Export**, "**+ New order**".
- KPI: **TODAY** 0 (₹0) · **NEW** 0 · **WORKSHOP** 0 · **READY** 0 · **OUTSTANDING** ₹0 (0 open · 0 unpaid) ·
  **OVERDUE** 0 (all on track).
- **Pipeline stage counters** (colored dots, each with count): Booking, Pickup, Picked, Received, Sorted, In, QC,
  Packed, Out, Delivered, Closed.
- Search "Invoice, customer name, or phone…" + Go. Dropdowns: All branches, All payments, Newest first; list/grid.
- Filter chips: All, New, Workshop, Ready, Overdue, Due today, Unpaid, Done. Count "0 orders".
- Table of orders (invoice, customer, stage, payment, due, total, actions). Empty: "No orders match".

### 6.6 `/customers`
- Header: "Customers" · "CRM, segments & LTV — laundry retention and re-engagement". Buttons: "LTV ₹0", Export,
  "**+ Add customer**".
- KPI: **TOTAL** 1 · **NEW** +1 (this month) · **ACTIVE** 0 (0% · 60d) · **AT RISK** 0 (60–120d) · **VIP** 0
  (≥ ₹10,000) · **BIRTHDAY** 0 (this month). Sub-line "PORTFOLIO LTV ₹0".
- Search "Search name, phone, or email…" + Go. Sort "Recently added". list/grid toggle.
- Chips: All, VIP, Active, At risk, Inactive, New 30d, Birthday.
- Table cols: **CUSTOMER** (avatar + name + "Since <month year>") · **CONTACT** (phone + msg/call icon buttons) ·
  **TAGS** · **ORDERS** · **LTV** · **LAST ORDER** · **STATUS** (New/Active/VIP/At risk…) · **ACTIONS** (row icons).
- Seed row: Aditya singh / 9835555329 / 0 / ₹0 / — / New.

### 6.7 `/catalog` (Service catalog)
- Header: "Service catalog" · "Categories & services for POS — pricing, TAT, piece rates". "0 services" chip + add.
- KPI: **CATEGORIES** 1 · **SERVICES** 0 · **PER KG** 0 · **PER PIECE** 0.
- Search "Search services, categories, or items…". Mode chips: All modes, Per KG, Per Piece, Flat, Per SqFt.
- Two-pane: left **CATEGORIES** list ("+ New"; seed "Dry cleaning" with count 0) | right services for selected
  category (title + "N services" + service tiles / add).
- Service fields: name, category, pricing mode (per_kg | per_piece | flat | per_sqft), rate (₹), TAT (turnaround),
  GST %.

### 6.8 `/inventory`
- Header: "Inventory & consumables" · "All branches · stock, alerts & transfers". "**+ Add item**".
- KPI: **TOTAL ITEMS** 0 (0 shown) · **STOCK VALUE** ₹0 · **ACTIVE ALERTS** 0 (all clear) · **BELOW REORDER** 0.
- Search "Search SKU or name…" + branch dropdown. Chips: All stock, Low stock, PAT01, PAT-PL, PAT02.
- "**Stock ledger**" table cols: SKU/ITEM · BRANCH · STOCK LEVEL · BALANCE · UNIT COST · VALUE · ACTIONS. "+ New item".
- Item fields: sku, name, branch, stock_level, balance/qty, unit_cost, reorder_level.

### 6.9 `/staff` (Staff & Attendance)
- Header: "Staff & Attendance" · "PIN clock-in · shift commissions · roster & lockouts". "1 staff" chip + "+ Add staff".
- KPI: **ROSTER** 1 (active users) · **PIN SET** 0 (0% of roster) · **LOCKED** 0 (wrong-PIN lockout) · **OPEN SHIFTS**
  0 (0 recent).
- "**Branches & Super Admins**" ("Super Admins see the whole org · branch staff only see their branch"): a card for
  **Org Super Admin** (FULL ACCESS; ADMINS 1; PIN SET 0; "+ Add Super Admin") + one card per branch (PAT01 LIVE STORE,
  PAT-PL PLANT, PAT02 STORE) each showing STAFF / PIN / LOCKED counts + "click to open roster".
- Staff fields: name, role, branch, pin (4-digit), is_super_admin, locked.

### 6.10 `/expenses` (Expenses & P&L)
- Header: "Expenses & P&L" · "Branch profit & loss · ITC-eligible roll-up · period 2026-07". Buttons: period selector
  (2026-07), Categories, "**+ Add expense**".
- KPI: **REVENUE** ₹0 (period) · **EXPENSES** ₹0 (0 recent) · **NET PROFIT** ₹0 (In the black).
- "**Per-branch P&L**" cards (PAT-PL, PAT01, PAT02): PROFIT/LOSS badge, REV bar, EXP bar, NET ₹0, "0 Orders / 0
  Expenses". list/grid toggle.
- "**Recent expenses**" table (0 of 0). Expense fields: date, branch, category, amount, note, itc_eligible.

### 6.11 `/reports`
- Hero: pill "BUSINESS INTELLIGENCE"; title "Reports"; subtitle "Executive scorecard, mix, TAT, branches, and staff —
  Last 30 days · all branches." + date range line "22 Jun 2026 → 22 Jul 2026". Buttons: Analytics, Ops, **GSTR-1**
  (dark).
- Range chips: 7 days, 14 days, 30 days (active), 90 days, This month + branch dropdown.
- KPI: **REVENUE** ₹0 (0 orders) · **ORDERS** 0 (prior 0) · **AVG ORDER** ₹0 (AOV) · **COLLECTED** ₹0 (0 payments) ·
  **TAT MEDIAN** — (no sample) · **REPEAT** 0% (0/0 cust).
- Sub-tabs: **Overview** (default), Revenue, Service & pay, TAT & ops, Branches, Staff, Export. Each tab renders
  charts/tables computed from orders/payments (empty until data exists).

### 6.12 `/franchise` (Franchise settlements)
- Hero: pill "FRANCHISE LEDGER"; title "Franchise settlements"; subtitle "Monthly commission, royalty, ad-fund & plant
  fees from franchise shops to HQ — generate, collect, export." + "Manage fee rules →". Buttons: Reports, month
  selector (‹ July 2026 ›), Export, "**⟳ Generate period**" (dark).
- KPI: **TOTAL DUE** ₹0 (0 settlements) · **COLLECTED** ₹0 (payments recorded) · **OUTSTANDING** ₹0 (all clear) ·
  **FRANCHISE SHOPS** 1 (with commission/royalty).
- Body: settlements list for the month. Empty: "No settlements for July 2026".
- Settlement fields: branch, period (month), commission, royalty, ad_fund, plant_fees, total_due, collected, status.

### 6.13 `/cash-close`
- Title "Cash close"; subtitle "End-of-day till reconciliation: expected cash from SUCCEEDED CASH payments vs counted
  drawer. Variance over ₹50 needs a reason."
- "**Open till for a day**" form: Branch dropdown, Business date (default today), "**Open till**" button.
- Table cols: DATE · BRANCH · EXPECTED · COUNTED · VARIANCE · STATUS · ACTIONS. Empty: "No cash closes yet. Open a
  till to start." CashClose fields: date, branch, expected, counted, variance, status, reason.

### 6.14 `/plant` (Plant intake)
- Header: "Plant intake" · "Bags & orders coming into the washing center — allot runner, dispatch pickup, receive".
  Right: Plant selector (default "PAT-PL — Patna Central Plant"). Badge "PAT-PL · Patna Central Plant".
- KPI: **AWAITING ALLOT** 0 (Ready to assign runner) · **IN TRANSIT** 0 (On the way to plant) · **NEED CHALLAN** 0
  (Store orders, no bag yet).
- "**Plant workflow**" explainer: 1. Allot runner on waiting bag → 2. Dispatch pickup → runner delivers to plant →
  3. Receive on challan → workshop. Missing bag? Create pickup from **Need challan**.
- "**Awaiting allot / dispatch**" list. Empty: "No bags waiting at stores for this plant…".

### 6.15 `/workshop`
- Header: "Workshop" · "Batches, machines & QC — plant floor desk". Buttons: "Idle ready" badge, "0 active",
  **Scan floor**, "**+ New batch**".
- KPI: **ACTIVE** 0 (open batches) · **RUNNING** 0 · **AWAITING QC** 0 · **QC DONE** 0 · **IN PLANT** 0 (garments) ·
  **MACHINES FREE** 0/0 (0 running).
- Search "Batch code, machine, branch…" + list/grid. Chips: All, Created, Assigned, Running, Awaiting QC, QC done.
- **Kanban board** columns (drag-drop): **CREATED**, **ASSIGNED**, **RUNNING**, **COMPLETE** (each "Drop here" empty).
- Batch fields: code, machine, branch, status (created|assigned|running|awaiting_qc|qc_done|complete), garments count.

### 6.16 `/scan` (Scan / QC)
- Header: "Scan garment" · "QR, OCR or paste — advance garments · engine Tesseract.js (in-browser)". Buttons:
  "0 this session", QR, Workshop, Orders.
- KPI: **RECENT TRAIL** 0 (last events loaded) · **THIS SESSION** 0 (successful records) · **INPUT MODE** QR (live) ·
  **TARGET STAGE** Sorted (quick-pick or full list).
- Input tabs: **QR camera** (camera viewport box), **OCR tag**, **Paste / type**. Right rail "**RECENT SCANS**" (0)
  with filter "Filter tag, invoice…". Empty: "No scans yet this session."
- Clone note: implement as a UI shell; "Paste / type" tab can create a scan event advancing an order's stage. No real
  camera/OCR required.

### 6.17 `/transfers` (Bags & challans / Challans)
- Header: "Transfers" · "Challans moving garments store ↔ plant · scan out, run, scan in". Buttons: "Healthy" badge,
  "0 open", Export, "**+ New challan**".
- KPI: **OPEN** 0 (0 pack · 0 road) · **REQUESTED** 0 · **IN TRANSIT** 0 · **RECEIVED** 0 · **MISSING** 0 ·
  **QC ISSUES** 0 (0 today).
- Search "Challan #, branch code, notes…" + Go. Dropdowns: All directions, All branches, Newest first; list/grid.
- Chips: All, Requested, In transit, Received, Missing items, QC issues, Cancelled. Count "0 challans".
- Empty: "No challans match / … create a challan to move clothes between store and plant." Challan fields: number,
  from_branch, to_branch, direction, status, items count, notes.

### 6.18 `/pickup-delivery`
- Header: "Pickup & Delivery" · "Last-mile dispatch for <weekday, date> — riders work jobs on /rider". Buttons:
  "On track" badge, "0 open", **Rider app**, "**+ Book job**".
- KPI: **TODAY** 0 (0 pickup · 0 deliv) · **OPEN** 0 (0 en route) · **PICKUPS** 0 · **DELIVERIES** 0 · **UNASSIGNED**
  0 · **COD DUE** ₹0 (0 jobs).
- Stage counters (dots): Scheduled, Assigned, En route, Arrived, Completed, Failed.
- Search "Customer, phone, invoice, area, rider…" + type dropdown; list/grid. Chips: All, Open, Pickups, Deliveries,
  No rider, COD due, Completed, Failed. Count "0 of 0 jobs". Empty: "No jobs match…".
- Job fields: type (pickup|delivery), customer, phone, invoice, area, rider, status, cod_amount, scheduled_for.

### 6.19 `/timeline` (Track order / Order Timeline)
- Header: "Order Timeline" · "Journey tracker — dwell times, bottlenecks & SLA from counter to delivery". Buttons:
  "On track" badge, "0 active", Orders, "**New order**".
- KPI: **ACTIVE** 0 · **OVERDUE** 0 · **WORKSHOP** 0 · **READY / OUT** 0 · **AVG TAT** — (on track) · **DONE TODAY** 0.
- Stage counters (dots): Order Received, Pickup Assigned, Picked Up, Washing Center, Washing In, Packed & Ready,
  Out for Delivery, Delivered.
- Search "Invoice, customer, phone…" + Go. Chips: Active, Overdue, Workshop, Ready, Slow (>24h), Completed, All.
  Empty: "No journeys match / Try another filter or create an order at POS."

### 6.20 `/loyalty`
- Header: "Loyalty & referrals" · "Points, redeem rates & referral rewards — laundry retention engine". Buttons:
  "1 pts / ₹100", Rules, Customers.
- KPI: **ACCOUNTS** 0 (0 with balance) · **IN CIRCULATION** 0 (≈ ₹0 redeemable) · **LIFETIME EARNED** 0 ·
  **LIFETIME REDEEMED** 0 · **REFERRALS** 0 (0 rewarded) · **PENDING / BLOCKED** 0 / 0.
- Rule chips: "Earn 1 pt / ₹100", "Redeem 1 pt = ₹0.5", "Referral +50 pts both sides", note "Same-device /
  same-address auto-blocked".
- Panels: "**Top loyalty accounts**" (0 accounts; "All customers →"; empty "Accounts are created automatically when a
  customer first earns points at POS.") + "**Referrals**" (0 total · 0 rewarded · 0 pending; empty).

### 6.21 `/staff` — see §6.9. `/clock-in`
- Title "Clock in / out"; subtitle "Tap your name → enter PIN". Body: staff tiles; if none have a PIN → empty
  "No PIN set. Ask the manager." Attendance fields: staff, clock_in_at, clock_out_at.

### 6.22 `/audit` (Audit Log)
- Title "Audit Log"; subtitle "Complete, append-only chronological record of all system mutations. Review user
  activities, data changes, and access patterns with high-fidelity historical state."
- Filter bar: **All Entities** dropdown, **All Actions** dropdown, **All users** dropdown, date range (dd-mm-yyyy to
  dd-mm-yyyy), **Filter** button (blue).
- "Showing N events" vertical timeline. Each event card: action pill (CREATE/UPDATE/DELETE), entity name + record id
  chip, actor name, timestamp ("20 Jul 2026, 7:52 am"), expand chevron. Seed: 2 CREATE events (ServiceCategory,
  Customer) by Rajesh Kumar.
- AuditLog fields: action, entity, record_id, actor, timestamp, payload(json).

### 6.23 `/settings`
- Hero: pill "CONTROL CENTER"; title "Settings"; subtitle "**Demo Laundry Patna** · Bihar · Configure identity,
  branches, pricing, and notifications in one place." Right: **SETUP HEALTH** ring (86%, "6/7 essentials ready, 1 item
  left"). Search "Search settings… ⌘K". "FINISH SETUP" chip(s): "Services catalogued".
- "**BUSINESS IDENTITY**" section (5 cards): **Organisation & tax** ("Legal name, GSTIN, billing state, e-invoice IRN,
  and invoice branding."), **Financial years** ("Set up financial accounting periods…"), **Branches** ("Shops and
  washing centers, addresses, franchise commission or royalty terms."), + 2 more (Pricing/Notifications). Additional
  sections below (Pricing, Notifications, Devices, etc.). Each card links to a settings sub-view.

### 6.24 `/rider` (My Runs)
- Rider's assigned pickup/delivery jobs (mobile-friendly). Original redirects non-riders to `/dashboard?notRider=1`;
  clone (bypass) simply renders the runs list.

### 6.25 `/messages` and unknown routes
- `/messages` → "Coming soon" placeholder (sidebar badge "soon").
- Any unknown route → Next.js 404 ("404 | This page could not be found").

---

## 7. Data model (Django)

Suggested apps and models. Use `id` PKs; add `created_at`, `updated_at` to most. All FKs `on_delete=CASCADE` unless
noted. Money fields = `DecimalField(max_digits=12, decimal_places=2)`.

- **core**: `Organisation`(name, state, gst_enabled, currency, gstin, legal_name), `Branch`(code, name, type[store|
  plant|live_store], city, state, address, commission_pct, royalty_pct), `Settings`(org, key, value json),
  `AuditLog`(action, entity, record_id, actor_name, payload json, created_at).
- **catalog**: `ServiceCategory`(name, icon), `Service`(category FK, name, pricing_mode[per_kg|per_piece|flat|per_sqft],
  rate, tat_hours, gst_pct, active).
- **customers**: `Customer`(name, phone, email, address, tags json, status[new|active|vip|at_risk|inactive],
  created_at), computed LTV/orders_count via aggregation.
- **orders**: `Order`(invoice_no, customer FK, branch FK, stage[booking|pickup|picked|received|sorted|in|qc|packed|out|
  delivered|closed], payment_status[unpaid|partial|paid], subtotal, cgst, sgst, total, due_at, created_at),
  `OrderLine`(order FK, service FK, qty, unit_rate, amount), `OrderStageEvent`(order FK, stage, at, note),
  `Payment`(order FK, mode[cash|card|upi|online], amount, status[succeeded|failed], at).
- **inventory**: `InventoryItem`(sku, name, branch FK, unit_cost, reorder_level), `StockLedgerEntry`(item FK, delta,
  balance, reason, at).
- **staff**: `Staff`(name, role, branch FK null, pin, is_super_admin, locked), `Attendance`(staff FK, clock_in_at,
  clock_out_at).
- **plant/wash**: `Challan`(number, from_branch FK, to_branch FK, direction[store_to_plant|plant_to_store], status
  [requested|in_transit|received|missing|qc_issue|cancelled], notes), `ChallanItem`(challan FK, order FK/qty),
  `Batch`(code, machine, branch FK, status[created|assigned|running|awaiting_qc|qc_done|complete], garments),
  `ScanEvent`(order FK, stage, mode[qr|ocr|manual], at).
- **logistics**: `Job`(type[pickup|delivery], customer FK, order FK null, area, rider FK(Staff) null, status
  [scheduled|assigned|en_route|arrived|completed|failed], cod_amount, scheduled_for).
- **expenses**: `Expense`(branch FK, category, amount, note, itc_eligible, date).
- **loyalty**: `LoyaltyAccount`(customer FK, balance, lifetime_earned, lifetime_redeemed),
  `LoyaltyTxn`(account FK, delta, reason, at), `Referral`(referrer FK, referee FK, status[pending|rewarded|blocked]).
- **franchise**: `Settlement`(branch FK, period[YYYY-MM], commission, royalty, ad_fund, plant_fees, total_due,
  collected, status[open|collected]).
- **cash**: `CashClose`(branch FK, date, expected, counted, variance, status[open|closed], reason).

---

## 8. API (Django REST Framework)

- Base path: `/api/`. All endpoints `permission_classes = [AllowAny]` (bypass). CORS allows the Vercel origin
  (`CORS_ALLOWED_ORIGINS` from env) + localhost.
- **Auth (bypass):** `POST /api/auth/login` → accepts any body, returns `{ "token": "dev-bypass", "user": {...} }`.
  `POST /api/auth/logout` → 200. Frontend stores a flag in localStorage; middleware/route-guard just checks the flag,
  and even without it, `/login` "Sign in" sets it and routes to `/dashboard`.
- **Resource endpoints:** standard DRF `ModelViewSet`s (list/create/retrieve/update/delete) for every model in §7,
  registered on a router, e.g.:
  - `/api/branches/`, `/api/customers/`, `/api/service-categories/`, `/api/services/`, `/api/orders/`,
    `/api/orders/{id}/lines/`, `/api/payments/`, `/api/inventory-items/`, `/api/stock-entries/`, `/api/staff/`,
    `/api/attendance/`, `/api/challans/`, `/api/batches/`, `/api/scan-events/`, `/api/jobs/`, `/api/expenses/`,
    `/api/loyalty-accounts/`, `/api/loyalty-txns/`, `/api/referrals/`, `/api/settlements/`, `/api/cash-closes/`,
    `/api/audit/`, `/api/settings/`.
- **Aggregate/summary endpoints** (read-only, power the KPI cards & charts):
  - `GET /api/dashboard/summary?branch=&range=` → today revenue, orders today, customers, repeat rate, revenue series,
    service mix, TAT, payment mix, top staff, per-branch cards.
  - `GET /api/operations/summary` → revenue MTD, active pipeline, open challans, critical alerts, 30d trend.
  - `GET /api/orders/summary` → pipeline stage counts + KPI (today/new/workshop/ready/outstanding/overdue).
  - `GET /api/customers/summary` → total/new/active/at-risk/vip/birthday/portfolio LTV.
  - `GET /api/reports/summary?range=&branch=` → revenue/orders/AOV/collected/TAT median/repeat + per-tab data.
  - `GET /api/workshop/summary`, `GET /api/transfers/summary`, `GET /api/pickup-delivery/summary`,
    `GET /api/timeline/summary`, `GET /api/loyalty/summary`, `GET /api/expenses/summary`, `GET /api/franchise/summary`,
    `GET /api/plant/summary`, `GET /api/scan/summary`.
- **Mutations that also write AuditLog:** all create/update/delete should append an AuditLog row (via DRF
  `perform_create/update/destroy` or a mixin).
- **Filtering:** support `?branch=<code>`, `?status=`, `?q=<search>`, `?range=7|14|30|90|month` query params.

---

## 9. Frontend architecture (Next.js)

- **Next.js App Router** + **TypeScript** + **Tailwind CSS**. `lucide-react` icons, `recharts` charts.
- Layout: `app/(app)/layout.tsx` renders the shell (Sidebar + TopBar) around all authenticated routes; `app/login`
  stands alone. A lightweight client guard checks the localStorage bypass flag; if missing, `/login` still works and
  "Sign in" sets it.
- **State:** React Context (or Zustand) for: selected branch (default "All branches"), language (EN/HI). Persist both
  to localStorage.
- **Data:** a small `api.ts` fetch wrapper using `NEXT_PUBLIC_API_URL`. Use SWR or React Query (optional) or plain
  fetch in server/client components. KPI cards + charts pull from the summary endpoints.
- **i18n:** `lib/i18n.ts` with `{ en: {...}, hi: {...} }` dictionaries and a `t(key)` helper; toggle in TopBar.
- **Reusable components:** `PageHeader`, `StatCard`, `FilterChips`, `SearchBar`, `DataTable`, `EmptyState`,
  `StageCounters`, `KanbanBoard`, `Sidebar`, `TopBar`, `BranchSelect`, `Chart*`.
- **Env:** `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8000` local, Render URL in prod).

Suggested structure:
```
frontend/
  app/
    login/page.tsx
    (app)/layout.tsx
    (app)/dashboard/page.tsx
    (app)/operations/page.tsx
    (app)/pos/page.tsx
    (app)/orders/page.tsx
    (app)/customers/page.tsx
    (app)/catalog/page.tsx
    (app)/inventory/page.tsx
    (app)/staff/page.tsx
    (app)/expenses/page.tsx
    (app)/reports/page.tsx
    (app)/franchise/page.tsx
    (app)/cash-close/page.tsx
    (app)/plant/page.tsx
    (app)/workshop/page.tsx
    (app)/scan/page.tsx
    (app)/transfers/page.tsx
    (app)/pickup-delivery/page.tsx
    (app)/timeline/page.tsx
    (app)/loyalty/page.tsx
    (app)/clock-in/page.tsx
    (app)/audit/page.tsx
    (app)/settings/page.tsx
    (app)/rider/page.tsx
    (app)/messages/page.tsx   # coming soon
  components/  lib/  styles/
```

---

## 10. Deployment

### 10.1 Docker (local + portable)
- `docker-compose.yml` services: **db** (postgres:16, volume), **api** (Django + gunicorn, runs migrate + seed on
  start), **web** (Next.js). `.env` / `.env.example` for secrets & URLs.
- `backend/Dockerfile` (python:3.12-slim, gunicorn), `frontend/Dockerfile` (node:20-alpine, `next build`/`next start`).
- `docker compose up` → web on :3000, api on :8000, db on :5432.

### 10.2 Render (backend + DB)
- `backend/render.yaml`: a **web service** (Django/gunicorn, build = pip install + collectstatic + migrate + seed) and
  a **managed Postgres**. Env: `DATABASE_URL`, `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`,
  `DEBUG=0`. Use `dj-database-url` + `whitenoise`.

### 10.3 Vercel (frontend)
- Import `frontend/` as a Next.js project. Env `NEXT_PUBLIC_API_URL` = Render API URL. Auto build/deploy.

---

## 11. Testing / acceptance criteria

Functional checks the build must pass (run locally via Docker):
1. **Login bypass:** `/login` renders with both tabs + prefilled phone/OTP; clicking **Sign in** routes to
   `/dashboard`. No credentials required.
2. **Shell:** sidebar with all groups/links, top bar (branch selector, EN/HI toggle, phone, Sign out) on every
   authenticated page. Active nav item highlights.
3. **All routes render** without error and match the specs in §6 (header, KPI cards, filters, table/empty state).
   `/messages` shows "coming soon"; unknown route shows 404.
4. **Seed data present:** 3 branches, 1 customer (Aditya singh), 1 category (Dry cleaning), 2 audit events, loyalty
   rules — visible in the relevant pages.
5. **CRUD works end-to-end for at least:** Customers (add customer → appears in list + TOTAL increments + audit event),
   Catalog (add service under Dry cleaning → SERVICES count increments), Orders/POS (select customer + add service line
   → order created with GST split → shows in Orders + pipeline counter).
6. **i18n:** EN/HI toggle switches key strings and persists across reload.
7. **API:** summary endpoints return correct aggregates reflected in KPI cards.
8. **Docker:** `docker compose up` brings up all three services; migrations + seed run automatically.

Record the actual results of these checks in `README.md` / a test log after building.

---

## 12. Build order (recommended for incremental delivery)
1. Backend scaffold: Django project, `core` app, Branch/Organisation/AuditLog, settings (CORS, DRF, dj-database-url),
   seed command, `/api/auth/login` bypass.
2. Remaining apps + models + viewsets + router + summary endpoints + audit-on-mutation mixin. Seed everything.
3. Frontend scaffold: Next.js + Tailwind + shell (Sidebar/TopBar) + login + i18n + branch/lang context + api wrapper.
4. Build pages in this priority: dashboard → customers → catalog → orders/pos → inventory → staff → reports → the rest
   (operations, plant, workshop, scan, transfers, pickup-delivery, timeline, loyalty, expenses, franchise, cash-close,
   audit, settings, clock-in, rider, messages).
5. Docker compose + Render + Vercel configs.
6. Run acceptance checks (§11); fix; document results.

---

## 13. Reference: original app facts (do not need to re-verify)
- Original URL: `https://fabwashing.sisplerp.com` (login at `/login`). It is a dummy/demo; session auto-persists;
  "Sign out" in the demo does not clear the session. Dev static OTP 123456.
- Framework of original: Next.js (404 page is the Next default). Charts look like Recharts. Icons lucide.
- All monetary values in the demo are ₹0 and most lists are empty (fresh demo tenant) — the clone should render the
  same rich empty states, and populate as the user creates data.
