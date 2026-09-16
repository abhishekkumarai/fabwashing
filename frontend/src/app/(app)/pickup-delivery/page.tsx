"use client";

import { useEffect, useState } from "react";
import { Truck, Bike, Plus, CheckCircle2 } from "lucide-react";
import { list } from "@/lib/api";
import { PageHeader, StatRow, StageCounters, Chips, SearchBar, DataTable, Button, Badge, money, EmptyState } from "@/components/ui";

type Job = { id: number; type: string; customer_name: string; area: string; status: string; cod_amount: string };

const CHIPS = [
  { key: "all", label: "All" }, { key: "open", label: "Open" }, { key: "pickup", label: "Pickups" },
  { key: "delivery", label: "Deliveries" }, { key: "no_rider", label: "No rider" }, { key: "cod", label: "COD due" },
  { key: "completed", label: "Completed" }, { key: "failed", label: "Failed" },
];

export default function PickupDeliveryPage() {
  const [rows, setRows] = useState<Job[]>([]);
  const [chip, setChip] = useState("all");
  const [q, setQ] = useState("");
  useEffect(() => { list<Job>("/jobs/").then(setRows); }, []);

  const day = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
  const c = (st: string) => rows.filter((r) => r.status === st).length;
  const filtered = rows.filter((r) => {
    if (chip === "pickup" || chip === "delivery") return r.type === chip;
    if (chip === "completed" || chip === "failed") return r.status === chip;
    return `${r.customer_name} ${r.area}`.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div>
      <PageHeader
        icon={Truck}
        iconClass="bg-teal-600"
        title="Pickup & Delivery"
        subtitle={`Last-mile dispatch for ${day} — riders work jobs on /rider`}
        actions={<><Badge tone="green"><CheckCircle2 size={13} className="inline mr-1" />On track</Badge><Badge>{rows.length} open</Badge><Button><Bike size={15} /> Rider app</Button><button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white"><Plus size={15} /> Book job</button></>}
      />

      <StatRow stats={[
        { label: "Today", value: rows.length, sub: "0 pickup · 0 deliv" },
        { label: "Open", value: rows.filter((r) => !["completed", "failed"].includes(r.status)).length, sub: "0 en route" },
        { label: "Pickups", value: rows.filter((r) => r.type === "pickup").length },
        { label: "Deliveries", value: rows.filter((r) => r.type === "delivery").length },
        { label: "Unassigned", value: 0 },
        { label: "COD due", value: money(rows.reduce((a, r) => a + parseFloat(r.cod_amount), 0)), sub: "0 jobs" },
      ]} />

      <StageCounters stages={[
        { label: "Scheduled", count: c("scheduled"), color: "bg-slate-300" },
        { label: "Assigned", count: c("assigned"), color: "bg-blue-400" },
        { label: "En route", count: c("en_route"), color: "bg-amber-400" },
        { label: "Arrived", count: c("arrived"), color: "bg-purple-400" },
        { label: "Completed", count: c("completed"), color: "bg-emerald-500" },
        { label: "Failed", count: c("failed"), color: "bg-red-500" },
      ]} />

      <div className="mb-3"><SearchBar placeholder="Customer, phone, invoice, area, rider…" value={q} onChange={setQ} /></div>
      <div className="mb-4 flex items-center justify-between"><Chips options={CHIPS} value={chip} onChange={setChip} /><span className="text-sm text-slate-400">{filtered.length} of {rows.length} jobs</span></div>

      <DataTable
        columns={["TYPE", "CUSTOMER", "AREA", "STATUS", "COD"]}
        rows={filtered}
        empty={<EmptyState icon={Truck} title="No jobs match" hint="Clear filters or book a new pickup / delivery." />}
        render={(r) => [<Badge key="t" tone="blue">{r.type}</Badge>, r.customer_name, r.area || "—", <Badge key="s">{r.status}</Badge>, money(r.cod_amount)]}
      />
    </div>
  );
}
