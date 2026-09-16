"use client";

import { useState } from "react";
import { ScanLine, QrCode, Type, ClipboardPaste } from "lucide-react";
import { PageHeader, StatRow, Card, Button, EmptyState } from "@/components/ui";

export default function ScanPage() {
  const [tab, setTab] = useState<"qr" | "ocr" | "paste">("qr");
  const [scans, setScans] = useState<string[]>([]);
  const [text, setText] = useState("");

  const record = () => {
    if (!text.trim()) return;
    setScans((s) => [text, ...s]);
    setText("");
  };

  return (
    <div>
      <PageHeader
        icon={ScanLine}
        iconClass="bg-teal-600"
        title="Scan garment"
        subtitle="QR, OCR or paste — advance garments · engine Tesseract.js (in-browser)"
        actions={<><Button>{scans.length} this session</Button><Button>QR</Button><Button>Workshop</Button><Button>Orders</Button></>}
      />

      <StatRow stats={[
        { label: "Recent trail", value: 0, sub: "last events loaded" },
        { label: "This session", value: scans.length, sub: "successful records" },
        { label: "Input mode", value: tab.toUpperCase(), sub: "live" },
        { label: "Target stage", value: "Sorted", sub: "quick-pick or full list" },
      ]} />

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 p-5">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 mb-4 text-sm">
            <button onClick={() => setTab("qr")} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium ${tab === "qr" ? "bg-white shadow-sm" : "text-slate-500"}`}><QrCode size={15} /> QR camera</button>
            <button onClick={() => setTab("ocr")} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium ${tab === "ocr" ? "bg-white shadow-sm" : "text-slate-500"}`}><Type size={15} /> OCR tag</button>
            <button onClick={() => setTab("paste")} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium ${tab === "paste" ? "bg-white shadow-sm" : "text-slate-500"}`}><ClipboardPaste size={15} /> Paste / type</button>
          </div>
          {tab === "qr" ? (
            <div className="aspect-video rounded-xl bg-slate-900 grid place-items-center">
              <div className="h-40 w-64 border-2 border-dashed border-slate-500 rounded-lg grid place-items-center text-slate-400 text-sm">Camera preview (demo)</div>
            </div>
          ) : (
            <div>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Paste or type tag / invoice…" className="w-full rounded-lg border border-slate-200 p-3 text-sm" />
              <Button variant="primary" onClick={record}>Record scan</Button>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">Recent scans</span>
            <span className="text-slate-400 text-sm">{scans.length}</span>
          </div>
          <input placeholder="Filter tag, invoice…" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm mb-3" />
          {scans.length === 0 ? (
            <EmptyState title="No scans yet this session." />
          ) : (
            <div className="space-y-2">{scans.map((s, i) => <div key={i} className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-mono">{s}</div>)}</div>
          )}
        </Card>
      </div>
    </div>
  );
}
