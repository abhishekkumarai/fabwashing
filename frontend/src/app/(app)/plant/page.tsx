"use client";

import { useEffect, useState } from "react";
import { Factory } from "lucide-react";
import { list } from "@/lib/api";
import { PageHeader, StatRow, Card, Badge, EmptyState } from "@/components/ui";

type Branch = { id: number; code: string; name: string; type: string };

export default function PlantPage() {
  const [plants, setPlants] = useState<Branch[]>([]);
  const [sel, setSel] = useState<Branch | null>(null);
  useEffect(() => {
    list<Branch>("/branches/").then((b) => {
      const p = b.filter((x) => x.type === "plant");
      setPlants(p.length ? p : b);
      setSel((p.length ? p : b)[0] || null);
    });
  }, []);

  return (
    <div>
      <PageHeader
        icon={Factory}
        iconClass="bg-violet-600"
        title="Plant intake"
        subtitle="Bags & orders coming into the washing center — allot runner, dispatch pickup, receive"
        actions={
          <select value={sel?.id} onChange={(e) => setSel(plants.find((p) => p.id === +e.target.value) || null)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
            {plants.map((p) => <option key={p.id} value={p.id}>Plant {p.code} — {p.name}</option>)}
          </select>
        }
      />
      {sel && <div className="mb-4"><Badge tone="purple">{sel.code} · {sel.name}</Badge></div>}

      <StatRow stats={[
        { label: "Awaiting allot", value: 0, sub: "Ready to assign runner" },
        { label: "In transit", value: 0, sub: "On the way to plant" },
        { label: "Need challan", value: 0, sub: "Store orders, no bag yet" },
      ]} />

      <Card className="p-4 mb-4">
        <div className="font-semibold text-slate-900 text-sm">Plant workflow</div>
        <div className="text-sm text-slate-500 mt-1">
          <b className="text-amber-600">1. Allot</b> runner on waiting bag → <b className="text-blue-600">2. Dispatch</b> pickup → runner delivers to plant → <b className="text-emerald-600">3. Receive</b> on challan → workshop. Missing bag? Create pickup from <b>Need challan</b>.
        </div>
      </Card>

      <Card className="p-2">
        <div className="px-4 pt-3 font-semibold text-slate-900">Awaiting allot / dispatch</div>
        <EmptyState title="No bags waiting at stores for this plant." hint="When a counter books an order, auto-pickup creates a challan here." />
      </Card>
    </div>
  );
}
