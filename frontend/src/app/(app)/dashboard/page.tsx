"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wallet, ShoppingBag, Users, Repeat, Plus, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { api } from "@/lib/api";
import { Card, StatRow, money, GradientBar, EmptyState } from "@/components/ui";

type Summary = {
  today_revenue: number;
  orders_today: number;
  customers: number;
  repeat_rate: number;
  revenue_series: { date: string; revenue: number }[];
  revenue_30d: number;
  orders_30d: number;
  branches: { code: string; name: string; revenue: number; orders: number }[];
};

export default function DashboardPage() {
  const [s, setS] = useState<Summary | null>(null);

  useEffect(() => {
    api.get<Summary>("/dashboard/summary").then(setS).catch(() => {});
  }, []);

  return (
    <div>
      <Card className="p-6 mb-5 bg-gradient-to-r from-blue-50/60 to-white">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-white rounded-full px-2 py-0.5">
              Live overview · last 30 days
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Today&apos;s snapshot</h1>
            <p className="text-sm text-slate-500 mt-1">
              Deep dive in{" "}
              <Link href="/reports" className="text-blue-600 font-medium">Reports</Link>, audit trail in{" "}
              <Link href="/audit" className="text-blue-600 font-medium">Audit log</Link>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/customers" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">
              <Plus size={16} /> New customer
            </Link>
            <Link href="/pos" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
              New order <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Card>

      <StatRow
        stats={[
          { label: "Today revenue", value: money(s?.today_revenue), sub: `${s?.orders_today ?? 0} orders today`, icon: Wallet, iconClass: "bg-blue-100 text-blue-600" },
          { label: "Orders today", value: s?.orders_today ?? 0, sub: "Auto-split CGST + SGST", icon: ShoppingBag, iconClass: "bg-emerald-100 text-emerald-600" },
          { label: "Customers", value: s?.customers ?? 0, sub: "Active profiles", icon: Users, iconClass: "bg-purple-100 text-purple-600" },
          { label: "Repeat rate", value: `${s?.repeat_rate ?? 0}%`, sub: "0 / 0 in last 90d", icon: Repeat, iconClass: "bg-amber-100 text-amber-600" },
        ]}
      />

      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card className="col-span-2 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">Revenue — last 30 days</div>
              <div className="text-2xl font-bold mt-1">{money(s?.revenue_30d)}</div>
              <div className="text-xs text-slate-400">{s?.orders_30d ?? 0} orders · avg {money(0)}</div>
            </div>
            <Link href="/reports" className="text-sm text-blue-600 font-medium">Reports →</Link>
          </div>
          <div className="h-56 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={s?.revenue_series || []}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} width={30} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">Service mix (30d)</div>
          <EmptyState title="No data in window." />
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { t: "Turn-around time (30d)", e: "MEDIAN / P90" },
          { t: "Payment mix (30d)", e: "No payments yet" },
          { t: "Top staff (30d)", e: "No activity yet" },
        ].map((c) => (
          <Card key={c.t} className="p-5">
            <div className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">{c.t}</div>
            <div className="py-10 text-center text-sm text-slate-400">{c.e}</div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-semibold text-slate-900">Branches</div>
            <div className="text-sm text-slate-400">Tap a branch to view 30-day performance</div>
          </div>
          <span className="text-sm text-slate-400">{s?.branches.length ?? 0} total</span>
        </div>
        <GradientBar />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {(s?.branches || []).map((b) => (
            <Card key={b.code} className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-slate-900">{b.name}</div>
                <span className="text-[11px] text-slate-400 font-mono">{b.code}</span>
              </div>
              <div className="flex gap-8 mt-4 text-sm">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase">Revenue</div>
                  <div className="font-bold">{money(b.revenue)}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase">Orders</div>
                  <div className="font-bold">{b.orders}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
