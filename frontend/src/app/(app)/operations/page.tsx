"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, IndianRupee, Boxes, ArrowLeftRight, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { api } from "@/lib/api";
import { Card, StatRow, money } from "@/components/ui";

type Ops = { revenue_mtd: number; active_pipeline: number; open_challans: number; critical_alerts: number };
type Dash = { revenue_series: { date: string; revenue: number }[] };

export default function OperationsPage() {
  const [ops, setOps] = useState<Ops | null>(null);
  const [dash, setDash] = useState<Dash | null>(null);
  useEffect(() => {
    api.get<Ops>("/operations/summary").then(setOps).catch(() => {});
    api.get<Dash>("/dashboard/summary").then(setDash).catch(() => {});
  }, []);

  return (
    <div>
      <Card className="p-6 mb-5 bg-gradient-to-r from-rose-50/50 to-white">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-white rounded-full px-2 py-0.5"><Activity size={12} /> LIVE NETWORK</span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Operations</h1>
            <p className="text-sm text-slate-500 mt-1">Command center for pipeline bottlenecks, stuck orders, open challans, and MTD revenue.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/reports" className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Reports</Link>
            <Link href="/transfers" className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">Transfers</Link>
            <Link href="/workshop" className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">Workshop</Link>
          </div>
        </div>
      </Card>

      <StatRow stats={[
        { label: "Revenue MTD", value: money(ops?.revenue_mtd), icon: IndianRupee, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "Active pipeline", value: ops?.active_pipeline ?? 0, icon: Boxes, iconClass: "bg-blue-100 text-blue-600" },
        { label: "Open challans", value: ops?.open_challans ?? 0, icon: ArrowLeftRight, iconClass: "bg-purple-100 text-purple-600" },
        { label: "Critical alerts", value: ops?.critical_alerts ?? 0, sub: "0 stuck · 0 issues", icon: AlertTriangle, iconClass: "bg-red-100 text-red-600" },
      ]} />

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-slate-900">30-day revenue trend</div>
            <div className="text-sm text-slate-400">Network-wide order totals</div>
          </div>
          <Link href="/reports" className="text-sm text-blue-600 font-medium">Full reports →</Link>
        </div>
        <div className="h-64 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dash?.revenue_series || []}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} width={30} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#e11d48" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
