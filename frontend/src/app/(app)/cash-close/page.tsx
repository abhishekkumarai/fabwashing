"use client";

import { useEffect, useState } from "react";
import { api, list } from "@/lib/api";
import { Card, Button, DataTable, Badge, money, EmptyState } from "@/components/ui";
import { Wallet } from "lucide-react";

type CashClose = { id: number; branch_code: string; date: string; expected: string; counted: string; variance: string; status: string };
type Branch = { id: number; code: string; name: string };

export default function CashClosePage() {
  const [rows, setRows] = useState<CashClose[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branch, setBranch] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const load = () => list<CashClose>("/cash-closes/").then(setRows);
  useEffect(() => { load(); list<Branch>("/branches/").then((b) => { setBranches(b); setBranch(b[0]?.id || 0); }); }, []);

  const openTill = async () => {
    if (!branch) return;
    await api.post("/cash-closes/", { branch, date, expected: 0, counted: 0, variance: 0, status: "open" });
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Cash close</h1>
      <p className="text-sm text-slate-500 mt-1 mb-5">End-of-day till reconciliation: expected cash from SUCCEEDED CASH payments vs counted drawer. Variance over ₹50 needs a reason.</p>

      <Card className="p-5 mb-4">
        <div className="font-semibold text-slate-900 mb-3">Open till for a day</div>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="text-xs text-slate-500">Branch</label>
            <select value={branch} onChange={(e) => setBranch(+e.target.value)} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {branches.map((b) => <option key={b.id} value={b.id}>{b.code} · {b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500">Business date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm" />
          </div>
          <Button variant="primary" onClick={openTill}>Open till</Button>
        </div>
      </Card>

      <DataTable
        columns={["DATE", "BRANCH", "EXPECTED", "COUNTED", "VARIANCE", "STATUS"]}
        rows={rows}
        empty={<EmptyState icon={Wallet} title="No cash closes yet. Open a till to start." />}
        render={(r) => [r.date, <span key="b" className="font-mono text-xs">{r.branch_code}</span>, money(r.expected), money(r.counted), money(r.variance), <Badge key="s" tone={r.status === "closed" ? "green" : "amber"}>{r.status}</Badge>]}
      />
    </div>
  );
}
