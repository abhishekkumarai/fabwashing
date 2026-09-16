"use client";

import { useEffect, useState } from "react";
import { Box, Plus, IndianRupee, AlertTriangle, TrendingDown } from "lucide-react";
import { api, list } from "@/lib/api";
import { PageHeader, StatRow, Chips, SearchBar, DataTable, Button, money, EmptyState } from "@/components/ui";

type Item = { id: number; sku: string; name: string; branch_code: string; balance: string; unit_cost: string; value: number; reorder_level: string };
type Branch = { id: number; code: string; name: string };

export default function InventoryPage() {
  const [rows, setRows] = useState<Item[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [chip, setChip] = useState("all");
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ sku: "", name: "", balance: "", unit_cost: "", branch: 0 });

  const load = () => list<Item>("/inventory-items/").then(setRows);
  useEffect(() => {
    load();
    list<Branch>("/branches/").then((b) => { setBranches(b); setForm((f) => ({ ...f, branch: b[0]?.id || 0 })); });
  }, []);

  const addItem = async () => {
    if (!form.name.trim()) return;
    await api.post("/inventory-items/", { ...form, balance: form.balance || 0, unit_cost: form.unit_cost || 0 });
    setForm((f) => ({ ...f, sku: "", name: "", balance: "", unit_cost: "" }));
    setShowForm(false);
    load();
  };

  const stockValue = rows.reduce((a, r) => a + (r.value || 0), 0);
  const belowReorder = rows.filter((r) => parseFloat(r.balance) < parseFloat(r.reorder_level)).length;
  const chips = [{ key: "all", label: "All stock" }, { key: "low", label: "Low stock" }, ...branches.map((b) => ({ key: b.code, label: b.code }))];
  const filtered = rows.filter((r) => (chip === "all" || chip === "low" || r.branch_code === chip) && `${r.sku} ${r.name}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader
        icon={Box}
        iconClass="bg-teal-600"
        title="Inventory & consumables"
        subtitle="All branches · stock, alerts & transfers"
        actions={<Button variant="primary" onClick={() => setShowForm((v) => !v)}><Plus size={15} /> Add item</Button>}
      />

      <StatRow stats={[
        { label: "Total items", value: rows.length, sub: `${filtered.length} shown`, icon: Box, iconClass: "bg-teal-100 text-teal-600" },
        { label: "Stock value", value: money(stockValue), icon: IndianRupee, iconClass: "bg-blue-100 text-blue-600" },
        { label: "Active alerts", value: 0, sub: "all clear", icon: AlertTriangle, iconClass: "bg-amber-100 text-amber-600" },
        { label: "Below reorder", value: belowReorder, icon: TrendingDown, iconClass: "bg-red-100 text-red-600" },
      ]} />

      {showForm && (
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <Field label="SKU" v={form.sku} set={(v) => setForm({ ...form, sku: v })} />
          <Field label="Name" v={form.name} set={(v) => setForm({ ...form, name: v })} />
          <Field label="Qty" v={form.balance} set={(v) => setForm({ ...form, balance: v })} w="w-20" />
          <Field label="Unit cost" v={form.unit_cost} set={(v) => setForm({ ...form, unit_cost: v })} w="w-24" />
          <div>
            <label className="text-xs text-slate-500">Branch</label>
            <select value={form.branch} onChange={(e) => setForm({ ...form, branch: +e.target.value })} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {branches.map((b) => <option key={b.id} value={b.id}>{b.code}</option>)}
            </select>
          </div>
          <Button variant="primary" onClick={addItem}>Save item</Button>
        </div>
      )}

      <div className="mb-3"><SearchBar placeholder="Search SKU or name…" value={q} onChange={setQ} /></div>
      <div className="mb-4"><Chips options={chips} value={chip} onChange={setChip} /></div>

      <DataTable
        columns={["SKU / ITEM", "BRANCH", "STOCK LEVEL", "BALANCE", "UNIT COST", "VALUE"]}
        rows={filtered}
        empty={<EmptyState icon={Box} title="No items match your filters" hint="Try clearing search or branch filters" />}
        render={(r) => [
          <div key="s"><div className="font-medium text-slate-800">{r.name}</div><div className="text-xs text-slate-400 font-mono">{r.sku}</div></div>,
          <span key="b" className="font-mono text-xs">{r.branch_code}</span>,
          parseFloat(r.balance) < parseFloat(r.reorder_level) ? <span className="text-red-500">Low</span> : <span className="text-emerald-600">OK</span>,
          r.balance,
          money(r.unit_cost),
          money(r.value),
        ]}
      />
    </div>
  );
}

function Field({ label, v, set, w = "w-32" }: { label: string; v: string; set: (v: string) => void; w?: string }) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <input value={v} onChange={(e) => set(e.target.value)} className={`mt-1 block ${w} rounded-lg border border-slate-200 px-3 py-2 text-sm`} />
    </div>
  );
}
