"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, Download, Plus, CheckCircle2, Clock, Factory, PackageCheck, IndianRupee, AlertTriangle } from "lucide-react";
import { api, list } from "@/lib/api";
import { PageHeader, StatRow, Chips, SearchBar, DataTable, Badge, money, EmptyState } from "@/components/ui";

type Order = {
  id: number; invoice_no: string; customer_name: string; branch_code: string;
  stage: string; payment_status: string; total: string; created_at: string;
};
type Summary = {
  today: number; today_revenue: number; new: number; workshop: number; ready: number;
  outstanding: number; overdue: number; stages: Record<string, number>;
};

const STAGES = ["booking", "pickup", "picked", "received", "sorted", "in", "qc", "packed", "out", "delivered", "closed"];
const STAGE_COLORS: Record<string, string> = {
  booking: "bg-slate-300", pickup: "bg-blue-400", picked: "bg-sky-400", received: "bg-violet-400",
  sorted: "bg-purple-400", in: "bg-amber-400", qc: "bg-yellow-400", packed: "bg-emerald-400",
  out: "bg-teal-400", delivered: "bg-green-500", closed: "bg-slate-300",
};
const CHIPS = [
  { key: "all", label: "All" }, { key: "booking", label: "New" }, { key: "in", label: "Workshop" },
  { key: "packed", label: "Ready" }, { key: "overdue", label: "Overdue" }, { key: "due", label: "Due today" },
  { key: "unpaid", label: "Unpaid" }, { key: "closed", label: "Done" },
];

export default function OrdersPage() {
  const [rows, setRows] = useState<Order[]>([]);
  const [sum, setSum] = useState<Summary | null>(null);
  const [chip, setChip] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    list<Order>("/orders/").then(setRows).catch(() => {});
    api.get<Summary>("/orders/summary").then(setSum).catch(() => {});
  }, []);

  const filtered = rows.filter((r) => {
    if (chip === "unpaid" && r.payment_status === "paid") return false;
    if (["booking", "in", "packed", "closed"].includes(chip) && r.stage !== chip) return false;
    if (q && !`${r.invoice_no} ${r.customer_name}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        icon={List}
        title="Orders"
        subtitle="Pipeline, payments & due dates — counter and plant in one desk"
        actions={
          <>
            <Badge tone="green"><CheckCircle2 size={13} className="inline mr-1" />On track</Badge>
            <Badge>{sum?.today ?? 0} today</Badge>
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700"><Download size={15} /> Export</button>
            <Link href="/pos" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white"><Plus size={15} /> New order</Link>
          </>
        }
      />

      <StatRow stats={[
        { label: "Today", value: sum?.today ?? 0, sub: money(sum?.today_revenue), icon: Clock, iconClass: "bg-blue-100 text-blue-600" },
        { label: "New", value: sum?.new ?? 0, icon: Plus, iconClass: "bg-purple-100 text-purple-600" },
        { label: "Workshop", value: sum?.workshop ?? 0, icon: Factory, iconClass: "bg-amber-100 text-amber-600" },
        { label: "Ready", value: sum?.ready ?? 0, icon: PackageCheck, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "Outstanding", value: money(sum?.outstanding), sub: "0 open · 0 unpaid", icon: IndianRupee, iconClass: "bg-slate-100 text-slate-500" },
        { label: "Overdue", value: sum?.overdue ?? 0, sub: "all on track", icon: AlertTriangle, iconClass: "bg-red-100 text-red-600" },
      ]} />

      <div className="flex flex-wrap gap-x-6 gap-y-3 mb-5">
        {STAGES.map((st) => (
          <div key={st} className="text-center min-w-14">
            <div className={`mx-auto h-2 w-2 rounded-full mb-1 ${STAGE_COLORS[st]}`} />
            <div className="text-base font-bold text-slate-900 leading-none">{sum?.stages?.[st] ?? 0}</div>
            <div className="text-[11px] text-slate-400 mt-1 capitalize">{st}</div>
          </div>
        ))}
      </div>

      <div className="mb-3"><SearchBar placeholder="Invoice, customer name, or phone…" value={q} onChange={setQ} onGo={() => {}} /></div>
      <div className="mb-4 flex items-center justify-between">
        <Chips options={CHIPS} value={chip} onChange={setChip} />
        <span className="text-sm text-slate-400">{filtered.length} orders</span>
      </div>

      <DataTable
        columns={["INVOICE", "CUSTOMER", "BRANCH", "STAGE", "PAYMENT", "TOTAL"]}
        rows={filtered}
        empty={<EmptyState icon={List} title="No orders match" hint="Adjust filters or create a new order at the counter." />}
        render={(r) => [
          <span key="i" className="font-mono text-slate-700">{r.invoice_no}</span>,
          r.customer_name,
          <span key="b" className="font-mono text-xs">{r.branch_code}</span>,
          <Badge key="s" tone="blue">{r.stage}</Badge>,
          <Badge key="p" tone={r.payment_status === "paid" ? "green" : "amber"}>{r.payment_status}</Badge>,
          <span key="t" className="font-semibold">{money(r.total)}</span>,
        ]}
      />
    </div>
  );
}
