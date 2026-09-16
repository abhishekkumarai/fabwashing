"use client";

import { Settings, Building2, CalendarRange, Store, Tag, Bell, Sparkles } from "lucide-react";
import { Card } from "@/components/ui";

const CARDS = [
  { icon: Building2, title: "Organisation & tax", desc: "Legal name, GSTIN, billing state, e-invoice IRN, and invoice branding." },
  { icon: CalendarRange, title: "Financial years", desc: "Set up financial accounting periods to filter data across the application." },
  { icon: Store, title: "Branches", desc: "Shops and washing centers, addresses, franchise commission or royalty terms." },
  { icon: Tag, title: "Pricing & GST", desc: "Default GST %, rounding, pricing modes, and service tax classes." },
  { icon: Bell, title: "Notifications", desc: "SMS/WhatsApp templates, alerts, and reminder cadence." },
];

export default function SettingsPage() {
  return (
    <div>
      <Card className="p-6 mb-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5"><Sparkles size={12} /> CONTROL CENTER</span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Settings</h1>
            <p className="text-sm text-slate-500 mt-1"><b className="text-slate-700">Demo Laundry Patna</b> · Bihar · Configure identity, branches, pricing, and notifications in one place.</p>
            <input placeholder="Search settings…" className="mt-4 w-full max-w-md rounded-lg border border-slate-200 px-4 py-2.5 text-sm" />
          </div>
          <Card className="p-4 flex items-center gap-4">
            <div className="relative h-16 w-16">
              <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="94" strokeDashoffset="13" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-sm font-bold">86%</span>
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">Setup health</div>
              <div className="font-semibold text-slate-800">6/7 essentials ready</div>
              <div className="text-xs text-slate-400">1 item left</div>
            </div>
          </Card>
        </div>
        <div className="mt-4">
          <span className="rounded-full bg-amber-50 text-amber-700 px-3 py-1.5 text-sm font-medium">● Services catalogued</span>
        </div>
      </Card>

      <div className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase mb-3">Business identity</div>
      <div className="grid grid-cols-3 gap-4">
        {CARDS.map((c) => (
          <Card key={c.title} className="p-5 hover:border-blue-300 cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-600 grid place-items-center mb-3"><c.icon size={18} /></div>
            <div className="font-semibold text-slate-900">{c.title}</div>
            <p className="text-sm text-slate-500 mt-1">{c.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
