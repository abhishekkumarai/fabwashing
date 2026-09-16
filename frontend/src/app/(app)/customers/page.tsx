"use client";

import { useEffect, useState } from "react";
import { Users, Plus, Download, UserPlus, Sparkles, AlertTriangle, Crown, Cake } from "lucide-react";
import { api, list } from "@/lib/api";
import { PageHeader, StatRow, Button, Chips, SearchBar, DataTable, Badge, money, EmptyState } from "@/components/ui";

type Customer = {
  id: number; name: string; phone: string; email: string;
  status: string; orders_count: number; ltv: number; created_at: string;
};
type Summary = {
  total: number; new_this_month: number; active: number;
  at_risk: number; vip: number; birthday: number; portfolio_ltv: number;
};

const CHIPS = [
  { key: "all", label: "All" }, { key: "vip", label: "VIP" }, { key: "active", label: "Active" },
  { key: "at_risk", label: "At risk" }, { key: "inactive", label: "Inactive" },
  { key: "new", label: "New 30d" }, { key: "birthday", label: "Birthday" },
];

export default function CustomersPage() {
  const [rows, setRows] = useState<Customer[]>([]);
  const [sum, setSum] = useState<Summary | null>(null);
  const [chip, setChip] = useState("all");
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const load = () => {
    list<Customer>("/customers/").then(setRows).catch(() => {});
    api.get<Summary>("/customers/summary").then(setSum).catch(() => {});
  };
  useEffect(load, []);

  const addCustomer = async () => {
    if (!name.trim()) return;
    await api.post("/customers/", { name, phone, status: "new" });
    setName(""); setPhone(""); setShowForm(false);
    load();
  };

  const filtered = rows.filter((r) => {
    if (chip !== "all" && chip !== "birthday" && chip !== "new" && r.status !== chip) return false;
    if (q && !`${r.name} ${r.phone} ${r.email}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        icon={Users}
        iconClass="bg-purple-600"
        title="Customers"
        subtitle="CRM, segments & LTV — laundry retention and re-engagement"
        actions={
          <>
            <Button>LTV {money(sum?.portfolio_ltv)}</Button>
            <Button><Download size={15} /> Export</Button>
            <Button variant="primary" onClick={() => setShowForm((v) => !v)}><Plus size={15} /> Add customer</Button>
          </>
        }
      />

      <StatRow stats={[
        { label: "Total", value: sum?.total ?? 0, icon: Users, iconClass: "bg-slate-100 text-slate-500" },
        { label: "New", value: `+${sum?.new_this_month ?? 0}`, sub: "this month", icon: UserPlus, iconClass: "bg-blue-100 text-blue-600" },
        { label: "Active", value: sum?.active ?? 0, sub: "0% · 60d", icon: Sparkles, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "At risk", value: sum?.at_risk ?? 0, sub: "60–120d", icon: AlertTriangle, iconClass: "bg-amber-100 text-amber-600" },
        { label: "VIP", value: sum?.vip ?? 0, sub: "≥ ₹10,000", icon: Crown, iconClass: "bg-purple-100 text-purple-600" },
        { label: "Birthday", value: sum?.birthday ?? 0, sub: "this month", icon: Cake, iconClass: "bg-pink-100 text-pink-600" },
      ]} />

      {showForm && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-end gap-3">
          <div>
            <label className="text-xs text-slate-500">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Customer name" />
          </div>
          <div>
            <label className="text-xs text-slate-500">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="98xxxxxxxx" />
          </div>
          <Button variant="primary" onClick={addCustomer}>Save customer</Button>
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
        </div>
      )}

      <div className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase mb-2">Portfolio LTV {money(sum?.portfolio_ltv)}</div>
      <div className="mb-3"><SearchBar placeholder="Search name, phone, or email…" value={q} onChange={setQ} onGo={() => {}} /></div>
      <div className="mb-4 flex items-center justify-between">
        <Chips options={CHIPS} value={chip} onChange={setChip} />
        <span className="text-sm text-slate-400">{filtered.length} customer{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <DataTable
        columns={["CUSTOMER", "CONTACT", "TAGS", "ORDERS", "LTV", "LAST ORDER", "STATUS"]}
        rows={filtered}
        empty={<EmptyState icon={Users} title="No customers match" hint="Adjust filters or add a customer." />}
        render={(r) => [
          <div key="c" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-orange-400 text-white grid place-items-center text-xs font-bold">
              {r.name.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-slate-800">{r.name}</div>
              <div className="text-xs text-slate-400">Since {new Date(r.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
            </div>
          </div>,
          <span key="p" className="text-slate-600">{r.phone || "—"}</span>,
          <span key="t">—</span>,
          r.orders_count,
          money(r.ltv),
          "—",
          <Badge key="s" tone={r.status === "vip" ? "purple" : r.status === "active" ? "green" : "blue"}>{r.status}</Badge>,
        ]}
      />
    </div>
  );
}
