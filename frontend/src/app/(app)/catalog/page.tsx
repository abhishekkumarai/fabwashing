"use client";

import { useEffect, useState } from "react";
import { Layers, Plus, Scale, Tag } from "lucide-react";
import { api, list } from "@/lib/api";
import { PageHeader, StatRow, Chips, SearchBar, Card, Button, EmptyState, money } from "@/components/ui";

type Category = { id: number; name: string; services_count: number };
type Service = { id: number; name: string; category: number; pricing_mode: string; rate: string; tat_hours: number };

const MODES = [
  { key: "all", label: "All modes" }, { key: "per_kg", label: "Per KG" },
  { key: "per_piece", label: "Per Piece" }, { key: "flat", label: "Flat" }, { key: "per_sqft", label: "Per SqFt" },
];

export default function CatalogPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [mode, setMode] = useState("all");
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [pmode, setPmode] = useState("per_piece");

  const load = () => {
    list<Category>("/service-categories/").then((c) => {
      setCats(c);
      if (c.length && selected === null) setSelected(c[0].id);
    });
    list<Service>("/services/").then(setServices);
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addService = async () => {
    if (!name.trim() || selected === null) return;
    await api.post("/services/", { name, category: selected, pricing_mode: pmode, rate: rate || 0, tat_hours: 48, gst_pct: 18 });
    setName(""); setRate(""); setShowForm(false);
    load();
  };

  const catServices = services.filter((s) => s.category === selected && (mode === "all" || s.pricing_mode === mode) && s.name.toLowerCase().includes(q.toLowerCase()));
  const perKg = services.filter((s) => s.pricing_mode === "per_kg").length;
  const perPiece = services.filter((s) => s.pricing_mode === "per_piece").length;
  const selectedCat = cats.find((c) => c.id === selected);

  return (
    <div>
      <PageHeader
        icon={Layers}
        iconClass="bg-indigo-600"
        title="Service catalog"
        subtitle="Categories & services for POS — pricing, TAT, piece rates"
        actions={<Button>{services.length} services</Button>}
      />

      <StatRow stats={[
        { label: "Categories", value: cats.length, icon: Layers, iconClass: "bg-indigo-100 text-indigo-600" },
        { label: "Services", value: services.length, icon: Tag, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "Per KG", value: perKg, icon: Scale, iconClass: "bg-blue-100 text-blue-600" },
        { label: "Per Piece", value: perPiece, icon: Tag, iconClass: "bg-amber-100 text-amber-600" },
      ]} />

      <div className="mb-3"><SearchBar placeholder="Search services, categories, or items…" value={q} onChange={setQ} /></div>
      <div className="mb-4"><Chips options={MODES} value={mode} onChange={setMode} /></div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">Categories</span>
            <button className="text-sm text-blue-600 font-medium" onClick={() => setShowForm((v) => !v)}>+ New</button>
          </div>
          <div className="space-y-2">
            {cats.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left ${selected === c.id ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white" : "bg-slate-50 text-slate-700"}`}
              >
                <span className="font-medium">{c.name}</span>
                <span className={selected === c.id ? "text-indigo-100" : "text-slate-400"}>{c.services_count}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="col-span-2 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-900">{selectedCat?.name || "Select a category"}</div>
              <div className="text-sm text-slate-400">{catServices.length} services</div>
            </div>
            <Button variant="primary" onClick={() => setShowForm((v) => !v)}><Plus size={15} /> Add service</Button>
          </div>

          {showForm && (
            <div className="mt-4 flex flex-wrap items-end gap-3 rounded-lg bg-slate-50 p-3">
              <div>
                <label className="text-xs text-slate-500">Service name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="e.g. 2-piece suit" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Rate (₹)</label>
                <input value={rate} onChange={(e) => setRate(e.target.value)} className="mt-1 block w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="0" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Mode</label>
                <select value={pmode} onChange={(e) => setPmode(e.target.value)} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  <option value="per_piece">Per Piece</option>
                  <option value="per_kg">Per KG</option>
                  <option value="flat">Flat</option>
                  <option value="per_sqft">Per SqFt</option>
                </select>
              </div>
              <Button variant="primary" onClick={addService}>Save</Button>
            </div>
          )}

          <div className="mt-4">
            {catServices.length === 0 ? (
              <EmptyState icon={Layers} title="No services yet" hint="Add a service to this category." />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {catServices.map((s) => (
                  <div key={s.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="font-medium text-slate-800">{s.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.pricing_mode.replace("_", " ")} · {money(s.rate)} · {s.tat_hours}h TAT</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
