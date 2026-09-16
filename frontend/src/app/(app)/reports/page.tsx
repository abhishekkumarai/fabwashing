"use client";

import { useEffect, useState } from "react";
import { BarChart3, IndianRupee, ShoppingBag, Receipt, CreditCard, Timer, Repeat, Sparkles, FileText } from "lucide-react";
import { api } from "@/lib/api";
import { Card, StatRow, Chips, money } from "@/components/ui";

type Rep = { revenue: number; orders: number; avg_order: number; collected: number; tat_median: number | null; repeat: number };

const RANGES = [
  { key: "7", label: "7 days" }, { key: "14", label: "14 days" }, { key: "30", label: "30 days" },
  { key: "90", label: "90 days" }, { key: "month", label: "This month" },
];
const TABS = ["Overview", "Revenue", "Service & pay", "TAT & ops", "Branches", "Staff", "Export"];

export default function ReportsPage() {
  const [rep, setRep] = useState<Rep | null>(null);
  const [range, setRange] = useState("30");
  const [tab, setTab] = useState("Overview");
  useEffect(() => { api.get<Rep>("/reports/summary").then(setRep).catch(() => {}); }, []);

  return (
    <div>
      <Card className="p-6 mb-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5"><BarChart3 size={12} /> BUSINESS INTELLIGENCE</span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Reports</h1>
            <p className="text-sm text-slate-500 mt-1">Executive scorecard, mix, TAT, branches, and staff — Last 30 days · all branches.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"><Sparkles size={15} /> Analytics</button>
            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Ops</button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"><FileText size={15} /> GSTR-1</button>
          </div>
        </div>
        <div className="mt-4"><Chips options={RANGES} value={range} onChange={setRange} /></div>
      </Card>

      <StatRow stats={[
        { label: "Revenue", value: money(rep?.revenue), sub: `${rep?.orders ?? 0} orders`, icon: IndianRupee, iconClass: "bg-blue-100 text-blue-600" },
        { label: "Orders", value: rep?.orders ?? 0, sub: "prior 0", icon: ShoppingBag, iconClass: "bg-purple-100 text-purple-600" },
        { label: "Avg order", value: money(rep?.avg_order), sub: "AOV", icon: Receipt, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "Collected", value: money(rep?.collected), sub: "0 payments", icon: CreditCard, iconClass: "bg-amber-100 text-amber-600" },
        { label: "TAT median", value: rep?.tat_median ?? "—", sub: "no sample", icon: Timer, iconClass: "bg-rose-100 text-rose-600" },
        { label: "Repeat", value: `${rep?.repeat ?? 0}%`, sub: "0/0 cust.", icon: Repeat, iconClass: "bg-indigo-100 text-indigo-600" },
      ]} />

      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((tt) => (
          <button key={tt} onClick={() => setTab(tt)} className={`rounded-lg px-3.5 py-2 text-sm font-medium ${tab === tt ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>{tt}</button>
        ))}
      </div>

      <Card className="p-10 text-center text-sm text-slate-400">
        {tab} — charts and tables populate here as orders and payments are recorded.
      </Card>
    </div>
  );
}
