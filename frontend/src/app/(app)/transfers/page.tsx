"use client";

import { useEffect, useState } from "react";
import { ArrowLeftRight, Download, Plus, CheckCircle2 } from "lucide-react";
import { list } from "@/lib/api";
import { PageHeader, StatRow, Chips, SearchBar, DataTable, Button, Badge, EmptyState } from "@/components/ui";

type Challan = { id: number; number: string; direction: string; status: string; items_count: number; notes: string };

const CHIPS = [
  { key: "all", label: "All" }, { key: "requested", label: "Requested" }, { key: "in_transit", label: "In transit" },
  { key: "received", label: "Received" }, { key: "missing", label: "Missing items" }, { key: "qc_issue", label: "QC issues" }, { key: "cancelled", label: "Cancelled" },
];

export default function TransfersPage() {
  const [rows, setRows] = useState<Challan[]>([]);
  const [chip, setChip] = useState("all");
  const [q, setQ] = useState("");
  useEffect(() => { list<Challan>("/challans/").then(setRows); }, []);

  const c = (st: string) => rows.filter((r) => r.status === st).length;
  const filtered = rows.filter((r) => (chip === "all" || r.status === chip) && `${r.number} ${r.notes}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader
        icon={ArrowLeftRight}
        iconClass="bg-orange-500"
        title="Transfers"
        subtitle="Challans moving garments store ↔ plant · scan out, run, scan in"
        actions={<><Badge tone="green"><CheckCircle2 size={13} className="inline mr-1" />Healthy</Badge><Badge>{rows.length} open</Badge><Button><Download size={15} /> Export</Button><button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 py-2 text-sm font-medium text-white"><Plus size={15} /> New challan</button></>}
      />

      <StatRow stats={[
        { label: "Open", value: rows.filter((r) => !["received", "cancelled"].includes(r.status)).length, sub: "0 pack · 0 road" },
        { label: "Requested", value: c("requested") },
        { label: "In transit", value: c("in_transit") },
        { label: "Received", value: c("received") },
        { label: "Missing", value: c("missing") },
        { label: "QC issues", value: c("qc_issue"), sub: "0 today" },
      ]} />

      <div className="mb-3"><SearchBar placeholder="Challan #, branch code, notes…" value={q} onChange={setQ} onGo={() => {}} /></div>
      <div className="mb-4 flex items-center justify-between"><Chips options={CHIPS} value={chip} onChange={setChip} /><span className="text-sm text-slate-400">{filtered.length} challans</span></div>

      <DataTable
        columns={["CHALLAN", "DIRECTION", "ITEMS", "STATUS", "NOTES"]}
        rows={filtered}
        empty={<EmptyState icon={ArrowLeftRight} title="No challans match" hint="Adjust filters or create a challan to move clothes between store and plant." />}
        render={(r) => [<span key="n" className="font-mono">{r.number}</span>, r.direction.replace(/_/g, " "), r.items_count, <Badge key="s" tone="blue">{r.status}</Badge>, r.notes || "—"]}
      />
    </div>
  );
}
