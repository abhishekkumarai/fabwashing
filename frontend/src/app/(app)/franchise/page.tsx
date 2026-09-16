"use client";

import { useEffect, useState } from "react";
import { Building2, IndianRupee, CheckCircle2, AlertCircle, Store, RefreshCw, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { list } from "@/lib/api";
import { PageHeader, StatRow, Card, Button, money, EmptyState } from "@/components/ui";

type Settlement = { id: number; branch_code: string; period: string; total_due: string; collected: string; status: string };
type Branch = { id: number; code: string };

export default function FranchisePage() {
  const [rows, setRows] = useState<Settlement[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  useEffect(() => { list<Settlement>("/settlements/").then(setRows); list<Branch>("/branches/").then(setBranches); }, []);

  const month = new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const totalDue = rows.reduce((a, r) => a + parseFloat(r.total_due), 0);
  const collected = rows.reduce((a, r) => a + parseFloat(r.collected), 0);

  return (
    <div>
      <Card className="p-6 mb-5 bg-gradient-to-r from-amber-50/50 to-white">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-white rounded-full px-2 py-0.5"><Building2 size={12} /> FRANCHISE LEDGER</span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Franchise settlements</h1>
            <p className="text-sm text-slate-500 mt-1 max-w-md">Monthly commission, royalty, ad-fund &amp; plant fees from franchise shops to HQ — generate, collect, export.</p>
            <a className="text-sm text-blue-600 font-medium">Manage fee rules →</a>
          </div>
          <div className="flex items-center gap-2">
            <Button>Reports</Button>
            <div className="flex items-center rounded-lg border border-slate-200 bg-white text-sm">
              <button className="px-2 py-2 text-slate-400"><ChevronLeft size={16} /></button>
              <span className="px-2 font-medium">{month}</span>
              <button className="px-2 py-2 text-slate-400"><ChevronRight size={16} /></button>
            </div>
            <Button><Download size={15} /> Export</Button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white"><RefreshCw size={15} /> Generate period</button>
          </div>
        </div>
      </Card>

      <StatRow stats={[
        { label: "Total due", value: money(totalDue), sub: `${rows.length} settlements`, icon: IndianRupee, iconClass: "bg-blue-100 text-blue-600" },
        { label: "Collected", value: money(collected), sub: "payments recorded", icon: CheckCircle2, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "Outstanding", value: money(totalDue - collected), sub: totalDue - collected > 0 ? "" : "all clear", icon: AlertCircle, iconClass: "bg-slate-100 text-slate-500" },
        { label: "Franchise shops", value: branches.length, sub: "with commission/royalty", icon: Store, iconClass: "bg-amber-100 text-amber-600" },
      ]} />

      {rows.length === 0 ? (
        <Card className="p-2"><EmptyState icon={RefreshCw} title={`No settlements for ${month}`} hint="Use “Generate period” to create settlements." /></Card>
      ) : (
        <Card className="p-4">
          {rows.map((r) => (
            <div key={r.id} className="flex justify-between py-2 border-b border-slate-50 text-sm">
              <span className="font-mono">{r.branch_code}</span><span>{r.period}</span><span className="font-semibold">{money(r.total_due)}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
