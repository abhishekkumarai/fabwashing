"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History, CheckCircle2, Plus } from "lucide-react";
import { api, list } from "@/lib/api";
import { PageHeader, StatRow, StageCounters, Chips, SearchBar, Button, Badge, EmptyState, Card } from "@/components/ui";

type Order = { id: number; invoice_no: string; customer_name: string; stage: string };
type Summary = { stages: Record<string, number> };

const CHIPS = [
  { key: "active", label: "Active" }, { key: "overdue", label: "Overdue" }, { key: "workshop", label: "Workshop" },
  { key: "ready", label: "Ready" }, { key: "slow", label: "Slow (>24h)" }, { key: "completed", label: "Completed" }, { key: "all", label: "All" },
];
const JOURNEY = [
  ["booking", "Order Received", "bg-blue-400"], ["pickup", "Pickup Assigned", "bg-sky-400"],
  ["picked", "Picked Up", "bg-amber-400"], ["sorted", "Washing Center", "bg-violet-400"],
  ["in", "Washing In", "bg-purple-400"], ["packed", "Packed & Ready", "bg-emerald-400"],
  ["out", "Out for Delivery", "bg-teal-400"], ["delivered", "Delivered", "bg-green-500"],
] as const;

export default function TimelinePage() {
  const [rows, setRows] = useState<Order[]>([]);
  const [sum, setSum] = useState<Summary | null>(null);
  const [chip, setChip] = useState("active");
  const [q, setQ] = useState("");
  useEffect(() => { list<Order>("/orders/").then(setRows); api.get<Summary>("/orders/summary").then(setSum).catch(() => {}); }, []);

  const active = rows.filter((r) => !["delivered", "closed"].includes(r.stage));
  const filtered = (chip === "all" ? rows : active).filter((r) => `${r.invoice_no} ${r.customer_name}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader
        icon={History}
        iconClass="bg-indigo-600"
        title="Order Timeline"
        subtitle="Journey tracker — dwell times, bottlenecks & SLA from counter to delivery"
        actions={<><Badge tone="green"><CheckCircle2 size={13} className="inline mr-1" />On track</Badge><Badge>{active.length} active</Badge><Link href="/orders" className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700">Orders</Link><Link href="/pos" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white"><Plus size={15} /> New order</Link></>}
      />

      <StatRow stats={[
        { label: "Active", value: active.length },
        { label: "Overdue", value: 0 },
        { label: "Workshop", value: sum?.stages?.in ?? 0 },
        { label: "Ready / Out", value: (sum?.stages?.packed ?? 0) + (sum?.stages?.out ?? 0) },
        { label: "Avg TAT", value: "—", sub: "on track" },
        { label: "Done today", value: 0 },
      ]} />

      <StageCounters stages={JOURNEY.map(([k, label, color]) => ({ label, count: sum?.stages?.[k] ?? 0, color }))} />

      <div className="mb-3"><SearchBar placeholder="Invoice, customer, phone…" value={q} onChange={setQ} onGo={() => {}} /></div>
      <div className="mb-4 flex items-center justify-between"><Chips options={CHIPS} value={chip} onChange={setChip} /><span className="text-sm text-slate-400">{filtered.length} on page</span></div>

      {filtered.length === 0 ? (
        <Card className="p-2"><EmptyState icon={History} title="No journeys match" hint="Try another filter or create an order at POS." /></Card>
      ) : (
        <Card className="p-4 space-y-2">
          {filtered.map((r) => (
            <div key={r.id} className="flex items-center justify-between text-sm border-b border-slate-50 pb-2">
              <span className="font-mono">{r.invoice_no}</span><span>{r.customer_name}</span><Badge tone="blue">{r.stage}</Badge>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
