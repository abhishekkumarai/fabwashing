"use client";

import { useEffect, useState } from "react";
import { Activity, Settings, User, Plus } from "lucide-react";
import { list } from "@/lib/api";
import { Card } from "@/components/ui";

type Audit = { id: number; action: string; entity: string; record_id: string; actor_name: string; created_at: string };

export default function AuditPage() {
  const [rows, setRows] = useState<Audit[]>([]);
  const [entity, setEntity] = useState("all");
  const [action, setAction] = useState("all");
  useEffect(() => { list<Audit>("/audit/").then(setRows); }, []);

  const entities = ["all", ...Array.from(new Set(rows.map((r) => r.entity)))];
  const filtered = rows.filter((r) => (entity === "all" || r.entity === entity) && (action === "all" || r.action === action));

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Activity className="text-indigo-500" size={26} />
        <h1 className="text-2xl font-bold text-slate-900">Audit Log</h1>
      </div>
      <p className="text-sm text-slate-500 mb-5 max-w-2xl">Complete, append-only chronological record of all system mutations. Review user activities, data changes, and access patterns with high-fidelity historical state.</p>

      <Card className="p-3 mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <select value={entity} onChange={(e) => setEntity(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
            {entities.map((e) => <option key={e} value={e}>{e === "all" ? "All Entities" : e}</option>)}
          </select>
          <select value={action} onChange={(e) => setAction(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
            {["all", "CREATE", "UPDATE", "DELETE"].map((a) => <option key={a} value={a}>{a === "all" ? "All Actions" : a}</option>)}
          </select>
          <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm"><option>All users</option></select>
          <input type="date" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          <button className="ml-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Filter</button>
        </div>
      </Card>

      <div className="flex items-center gap-2 text-sm text-slate-400 mb-3"><Activity size={14} /> Showing {filtered.length} events</div>

      <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="relative">
              <div className="absolute -left-[18px] top-4 h-6 w-6 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center"><Plus size={13} /></div>
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-lg bg-slate-100 text-slate-500 grid place-items-center">
                    {r.entity === "ServiceCategory" ? <Settings size={15} /> : <User size={15} />}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 rounded px-1.5 py-0.5">{r.action}</span>
                  <span className="font-semibold text-slate-800">{r.entity}</span>
                  <span className="text-xs text-slate-400 font-mono">#{r.record_id}</span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><User size={12} /> {r.actor_name}</span>
                  <span>{new Date(r.created_at).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
