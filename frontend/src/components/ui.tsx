"use client";

import React, { useState } from "react";
import { LucideIcon } from "lucide-react";

export function money(n: number | string | undefined) {
  const v = typeof n === "string" ? parseFloat(n) : n || 0;
  return `₹${(v || 0).toLocaleString("en-IN")}`;
}

export function GradientBar() {
  return (
    <div className="h-1 w-full rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400" />
  );
}

export function PageHeader({
  icon: Icon,
  iconClass = "bg-blue-600",
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  icon?: LucideIcon;
  iconClass?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className={`h-11 w-11 rounded-xl ${iconClass} text-white grid place-items-center shrink-0`}>
              <Icon size={20} />
            </div>
          )}
          <div>
            {eyebrow && (
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 mb-1">
                {eyebrow}
              </div>
            )}
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5 max-w-2xl">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
      <div className="mt-3">
        <GradientBar />
      </div>
    </div>
  );
}

export function Button({
  children,
  variant = "light",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "dark" | "light";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "dark"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium ${cls}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>{children}</div>
  );
}

export type Stat = {
  label: string;
  value: React.ReactNode;
  sub?: string;
  icon?: LucideIcon;
  iconClass?: string;
};

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 6)}, minmax(0,1fr))` }}>
      {stats.map((s, i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wide text-slate-500 uppercase">{s.label}</span>
            {s.icon && (
              <span className={`h-7 w-7 grid place-items-center rounded-lg ${s.iconClass || "bg-slate-100 text-slate-500"}`}>
                <s.icon size={15} />
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{s.value}</div>
          {s.sub && <div className="text-xs text-slate-400 mt-1">{s.sub}</div>}
        </Card>
      ))}
    </div>
  );
}

export function Chips({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string; count?: number }[];
  value: string;
  onChange: (k: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.key === value;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium border ${
              active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {o.label}
            {typeof o.count === "number" && (
              <span className={`ml-1.5 text-xs ${active ? "text-blue-100" : "text-slate-400"}`}>{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function SearchBar({
  placeholder,
  value,
  onChange,
  onGo,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onGo?: () => void;
}) {
  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400"
        />
      </div>
      {onGo && (
        <button onClick={onGo} className="rounded-lg bg-slate-900 px-4 text-sm font-medium text-white">
          Go
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, hint }: { icon?: LucideIcon; title: string; hint?: string }) {
  return (
    <div className="py-16 text-center">
      {Icon && (
        <div className="mx-auto mb-4 h-16 w-16 grid place-items-center rounded-2xl bg-slate-100 text-slate-400">
          <Icon size={28} />
        </div>
      )}
      <div className="font-semibold text-slate-700">{title}</div>
      {hint && <div className="text-sm text-slate-400 mt-1">{hint}</div>}
    </div>
  );
}

export function DataTable<T>({
  columns,
  rows,
  render,
  empty,
}: {
  columns: string[];
  rows: T[];
  render: (row: T) => React.ReactNode[];
  empty: React.ReactNode;
}) {
  if (rows.length === 0) return <Card className="p-2">{empty}</Card>;
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto scroll-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {columns.map((c) => (
                <th key={c} className="text-left px-4 py-3 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                {render(r).map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-slate-700 align-middle">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function StageCounters({ stages }: { stages: { label: string; count: number; color?: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 mb-5">
      {stages.map((s, i) => (
        <div key={i} className="text-center min-w-14">
          <div className={`mx-auto h-2 w-2 rounded-full mb-1 ${s.color || "bg-slate-300"}`} />
          <div className="text-lg font-bold text-slate-900 leading-none">{s.count}</div>
          <div className="text-[11px] text-slate-400 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return { on, toggle: () => setOn((v) => !v), setOn };
}

export function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-600",
    green: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
  };
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone] || tones.slate}`}>{children}</span>;
}
