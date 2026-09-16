"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Receipt, Plus, Trash2 } from "lucide-react";
import { api, list } from "@/lib/api";
import { Card, Button, money } from "@/components/ui";

type Customer = { id: number; name: string; phone: string };
type Service = { id: number; name: string; rate: string; pricing_mode: string };
type Branch = { id: number; code: string; name: string };
type Line = { service: number; service_name: string; unit_rate: number; qty: number };

export default function PosPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [branch, setBranch] = useState<Branch | null>(null);
  const [custQ, setCustQ] = useState("");
  const [svcQ, setSvcQ] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);
  const [cart, setCart] = useState<Line[]>([]);

  useEffect(() => {
    list<Customer>("/customers/").then(setCustomers);
    list<Service>("/services/").then(setServices);
    list<Branch>("/branches/").then((b) => setBranch(b[0] || null));
  }, []);

  const addLine = (s: Service) => {
    setCart((c) => {
      const existing = c.find((l) => l.service === s.id);
      if (existing) return c.map((l) => (l.service === s.id ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { service: s.id, service_name: s.name, unit_rate: parseFloat(s.rate) || 0, qty: 1 }];
    });
  };
  const removeLine = (id: number) => setCart((c) => c.filter((l) => l.service !== id));

  const subtotal = cart.reduce((a, l) => a + l.unit_rate * l.qty, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const checkout = async () => {
    if (!selected || !branch || cart.length === 0) return;
    await api.post("/orders/", {
      customer: selected.id,
      branch: branch.id,
      stage: "booking",
      lines: cart.map((l) => ({ service: l.service, service_name: l.service_name, qty: l.qty, unit_rate: l.unit_rate })),
    });
    router.push("/orders");
  };

  const filteredCust = customers.filter((c) => `${c.name} ${c.phone}`.toLowerCase().includes(custQ.toLowerCase()));
  const filteredSvc = services.filter((s) => s.name.toLowerCase().includes(svcQ.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-blue-600 text-white grid place-items-center"><Receipt size={20} /></div>
          <div>
            <div className="font-semibold text-slate-900">New order</div>
            <div className="text-sm text-slate-400">{branch ? `${branch.code} · ${branch.name}` : "—"} · GST on</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600"><ShoppingCart size={15} /> {cart.length} lines</span>
      </div>
      <div className="h-1 w-full rounded-full bg-gradient-to-r from-blue-500 via-purple-400 to-emerald-400 mb-5" />

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          <Card className="p-5">
            <div className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase mb-3">1 · Customer</div>
            <input value={custQ} onChange={(e) => setCustQ(e.target.value)} placeholder="Search by name or mobile…" className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm" />
            {custQ && !selected && (
              <div className="mt-2 max-h-40 overflow-auto rounded-lg border border-slate-100">
                {filteredCust.map((c) => (
                  <button key={c.id} onClick={() => { setSelected(c); setCustQ(c.name); }} className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50">
                    {c.name} · <span className="text-slate-400">{c.phone}</span>
                  </button>
                ))}
                {filteredCust.length === 0 && <div className="px-3 py-2 text-sm text-slate-400">No match</div>}
              </div>
            )}
            {selected && <div className="mt-3 text-sm text-emerald-700">Selected: <b>{selected.name}</b> ({selected.phone})</div>}
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">2 · Services</span>
              <input value={svcQ} onChange={(e) => setSvcQ(e.target.value)} placeholder="Search services…" className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm" disabled={!selected} />
            </div>
            {!selected ? (
              <div className="py-12 text-center text-sm text-slate-400">
                Select a customer first<br />Look up by name or mobile above to unlock the service menu.
              </div>
            ) : filteredSvc.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">No services in catalog yet. Add some under Catalog.</div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {filteredSvc.map((s) => (
                  <button key={s.id} onClick={() => addLine(s)} className="rounded-lg border border-slate-200 p-3 text-left hover:border-blue-400">
                    <div className="font-medium text-slate-800 text-sm">{s.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{money(s.rate)} · {s.pricing_mode.replace("_", " ")}</div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card className="p-5 h-fit sticky top-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-lg bg-blue-600 text-white grid place-items-center"><ShoppingCart size={16} /></div>
            <div>
              <div className="font-semibold text-slate-900">Cart</div>
              <div className="text-xs text-slate-400">{cart.length} lines</div>
            </div>
          </div>
          {cart.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-400">
              <ShoppingCart size={28} className="mx-auto mb-2 text-slate-300" />
              Cart is empty<br />Tap a service tile to add it
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((l) => (
                <div key={l.service} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-slate-700">{l.service_name}</div>
                    <div className="text-xs text-slate-400">{l.qty} × {money(l.unit_rate)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{money(l.unit_rate * l.qty)}</span>
                    <button onClick={() => removeLine(l.service)} className="text-red-400"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-2 mt-2 space-y-1 text-sm">
                <Row label="Subtotal" value={money(subtotal)} />
                <Row label="CGST (9%)" value={money(gst / 2)} />
                <Row label="SGST (9%)" value={money(gst / 2)} />
                <Row label="Total" value={money(total)} bold />
              </div>
            </div>
          )}
          <button
            onClick={checkout}
            disabled={!selected || cart.length === 0}
            className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white disabled:bg-slate-200 disabled:text-slate-400"
          >
            {cart.length === 0 ? "Add services first" : `Place order · ${money(total)}`}
          </button>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold text-slate-900" : "text-slate-500"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
