"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, Plus, ScanLine, CheckCircle2 } from "lucide-react";
import { api, list } from "@/lib/api";
import { PageHeader, StatRow, Card, Button, Badge, Chips } from "@/components/ui";

type Batch = { id: number; code: string; machine: string; status: string; garments: number };
type Branch = { id: number; code: string };

const COLUMNS = [
  { key: "created", label: "CREATED", tone: "bg-slate-50" },
  { key: "assigned", label: "ASSIGNED", tone: "bg-blue-50" },
  { key: "running", label: "RUNNING", tone: "bg-amber-50" },
  { key: "complete", label: "COMPLETE", tone: "bg-emerald-50" },
];
const CHIPS = [
  { key: "all", label: "All" }, { key: "created", label: "Created" }, { key: "assigned", label: "Assigned" },
  { key: "running", label: "Running" }, { key: "awaiting_qc", label: "Awaiting QC" }, { key: "qc_done", label: "QC done" },
];

export default function WorkshopPage() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [chip, setChip] = useState("all");

  const load = () => list<Batch>("/batches/").then(setBatches);
  useEffect(() => { load(); list<Branch>("/branches/").then(setBranches); }, []);

  const newBatch = async () => {
    const b = branches[0];
    if (!b) return;
    await api.post("/batches/", { code: `B-${Date.now().toString().slice(-5)}`, branch: b.id, machine: "M1", status: "created", garments: 0 });
    load();
  };

  const count = (st: string) => batches.filter((b) => b.status === st).length;

  return (
    <div>
      <PageHeader
        icon={LayoutDashboard}
        iconClass="bg-orange-500"
        title="Workshop"
        subtitle="Batches, machines & QC — plant floor desk"
        actions={
          <>
            <Badge tone="green"><CheckCircle2 size={13} className="inline mr-1" />Idle ready</Badge>
            <Badge>{count("running")} active</Badge>
            <Button><ScanLine size={15} /> Scan floor</Button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 px-3.5 py-2 text-sm font-medium text-white" onClick={newBatch}><Plus size={15} /> New batch</button>
          </>
        }
      />

      <StatRow stats={[
        { label: "Active", value: batches.filter((b) => b.status !== "complete").length, sub: "open batches" },
        { label: "Running", value: count("running") },
        { label: "Awaiting QC", value: count("awaiting_qc") },
        { label: "QC done", value: count("qc_done") },
        { label: "In plant", value: batches.reduce((a, b) => a + b.garments, 0), sub: "garments" },
        { label: "Machines free", value: "0/0", sub: "0 running" },
      ]} />

      <div className="mb-4"><Chips options={CHIPS} value={chip} onChange={setChip} /></div>

      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const items = batches.filter((b) => b.status === col.key || (col.key === "complete" && ["complete", "qc_done"].includes(b.status)));
          return (
            <Card key={col.key} className={`p-3 ${col.tone}`}>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-semibold tracking-wide text-slate-500">{col.label}</span>
                <span className="text-slate-400 text-sm">{items.length}</span>
              </div>
              {items.length === 0 ? (
                <div className="border-2 border-dashed border-slate-200 rounded-lg py-10 text-center text-xs text-slate-400">Drop here</div>
              ) : (
                <div className="space-y-2">
                  {items.map((b) => (
                    <div key={b.id} className="rounded-lg bg-white border border-slate-200 p-3 text-sm">
                      <div className="font-medium text-slate-800 font-mono">{b.code}</div>
                      <div className="text-xs text-slate-400">{b.machine} · {b.garments} garments</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
