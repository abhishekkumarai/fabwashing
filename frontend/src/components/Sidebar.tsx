"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import { useApp } from "@/lib/app-context";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useApp();
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto scroll-thin">
      <div className="px-5 py-5">
        <div className="text-lg font-bold text-slate-900">WashNLaundry LaundryPro</div>
        <div className="text-xs text-slate-400">{t("app.subtitle")}</div>
      </div>
      <nav className="px-3 pb-8 space-y-4">
        {NAV.map((group, gi) => (
          <div key={gi}>
            {group.title && (
              <div className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                {group.title}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item, ii) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={`${item.href}-${ii}`}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                      active
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={17} className={active ? "text-blue-600" : "text-slate-400"} />
                    <span className="flex-1">{t(item.key)}</span>
                    {item.badge && (
                      <span className="text-[10px] uppercase tracking-wide text-slate-300">{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
