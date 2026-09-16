"use client";

import { useEffect, useState } from "react";
import { Receipt, Plus, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import { api, list } from "@/lib/api";
import { PageHeader, StatRow, Card, Button, Badge, DataTable, money, EmptyState } from "@/components/ui";

type Expense = { id: number; branch_code: string; category: string; amount: string; note: string; date: string };
type Branch = { id: number; code: string; name: string };

export default function ExpensesPage() {
  const [rows, setRows] = useState<Expense[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: "General", amount: "", note: "", branch: 0 });

  const load = () => list<Expense>("/expenses/").then(setRows);
  useEffect(() => { load(); list<Branch>("/branches/").then((b) => { setBranches(b); setForm((f) => ({ ...f, branch: b[0]?.id || 0 })); }); }, []);

  const period = new Date().toISOString().slice(0, 7);
  const addExpense = async () => {
    if (!form.amount) return;
    await api.post("/expenses/", { ...form, date: new Date().toISOString().slice(0, 10) });
    setForm((f) => ({ ...f, amount: "", note: "" })); setShowForm(false); load();
  };
  const total = rows.reduce((a, r) => a + parseFloat(r.amount), 0);

  return (
    <div>
      <PageHeader
        icon={Receipt}
        iconClass="bg-rose-600"
        title="Expenses & P&L"
        subtitle={`Branch profit & loss · ITC-eligible roll-up · period ${period}`}
        actions={<><Button>{period}</Button><Button>Categories</Button><Button variant="primary" onClick={() => setShowForm((v) => !v)}><Plus size={15} /> Add expense</Button></>}
      />

      <StatRow stats={[
        { label: "Revenue", value: money(0), sub: period, icon: TrendingUp, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "Expenses", value: money(total), sub: `${rows.length} recent`, icon: TrendingDown, iconClass: "bg-rose-100 text-rose-600" },
        { label: "Net profit", value: money(-total), sub: total > 0 ? "In the red" : "In the black", icon: IndianRupee, iconClass: "bg-blue-100 text-blue-600" },
      ]} />

      {showForm && (
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div><label className="text-xs text-slate-500">Category</label><input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm" /></div>
          <div><label className="text-xs text-slate-500">Amount</label><input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="mt-1 block w-28 rounded-lg border border-slate-200 px-3 py-2 text-sm" /></div>
          <div><label className="text-xs text-slate-500">Note</label><input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm" /></div>
          <div><label className="text-xs text-slate-500">Branch</label><select value={form.branch} onChange={(e) => setForm({ ...form, branch: +e.target.value })} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm">{branches.map((b) => <option key={b.id} value={b.id}>{b.code}</option>)}</select></div>
          <Button variant="primary" onClick={addExpense}>Save expense</Button>
        </div>
      )}

      <Card className="p-5 mb-4">
        <div className="font-semibold text-slate-900 mb-3">Per-branch P&amp;L <span className="text-slate-400 font-normal">{period}</span></div>
        <div className="grid grid-cols-3 gap-4">
          {branches.map((b) => {
            const exp = rows.filter((r) => r.branch_code === b.code).reduce((a, r) => a + parseFloat(r.amount), 0);
            return (
              <Card key={b.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div><div className="font-bold text-slate-900">{b.code}</div><div className="text-xs text-slate-400">{b.name}</div></div>
                  <Badge tone={exp > 0 ? "red" : "green"}>{exp > 0 ? "LOSS" : "PROFIT"}</Badge>
                </div>
                <div className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between text-slate-500"><span>REV</span><span>{money(0)}</span></div>
                  <div className="flex justify-between text-slate-500"><span>EXP</span><span>{money(exp)}</span></div>
                  <div className="flex justify-between font-bold border-t border-slate-100 pt-1"><span>NET</span><span>{money(-exp)}</span></div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      <div className="font-semibold text-slate-900 mb-2">Recent expenses <span className="text-slate-400 font-normal">{rows.length} of {rows.length}</span></div>
      <DataTable
        columns={["DATE", "BRANCH", "CATEGORY", "NOTE", "AMOUNT"]}
        rows={rows}
        empty={<EmptyState icon={Receipt} title="No expenses yet" hint="Add an expense to build your P&L." />}
        render={(r) => [r.date, <span key="b" className="font-mono text-xs">{r.branch_code}</span>, r.category, r.note || "—", <span key="a" className="font-semibold">{money(r.amount)}</span>]}
      />
    </div>
  );
}
