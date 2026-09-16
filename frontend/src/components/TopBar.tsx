"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Languages } from "lucide-react";
import { useApp } from "@/lib/app-context";
import { list } from "@/lib/api";

type Branch = { code: string; name: string };

export function TopBar() {
  const { t, lang, setLang, branch, setBranch, signOut } = useApp();
  const router = useRouter();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    list<Branch>("/branches/").then(setBranches).catch(() => {});
  }, []);

  const current = branch === "ALL" ? t("top.allBranches") : branch;

  return (
    <header className="h-14 bg-white/70 backdrop-blur border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-6">
      <div className="flex items-center gap-2 text-sm relative">
        <span className="text-slate-400">{t("top.branch")}</span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          {current}
        </button>
        {open && (
          <div className="absolute top-10 left-16 z-20 w-56 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
            {[{ code: "ALL", name: t("top.allBranches") }, ...branches].map((b) => (
              <button
                key={b.code}
                onClick={() => {
                  setBranch(b.code);
                  setOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-50"
              >
                {b.code === "ALL" ? b.name : `${b.code} · ${b.name}`}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full bg-slate-100 p-0.5 text-xs">
          <Languages size={14} className="mx-1.5 text-slate-400" />
          <button
            onClick={() => setLang("en")}
            className={`rounded-full px-2.5 py-1 font-medium ${lang === "en" ? "bg-white shadow-sm text-slate-800" : "text-slate-500"}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("hi")}
            className={`rounded-full px-2.5 py-1 font-medium ${lang === "hi" ? "bg-white shadow-sm text-slate-800" : "text-slate-500"}`}
          >
            HI
          </button>
        </div>
        <button className="text-slate-400 hover:text-slate-600" aria-label="Alerts">
          <Bell size={18} />
        </button>
        <span className="text-sm font-semibold text-slate-800">9999999999</span>
        <button
          onClick={() => {
            signOut();
            router.push("/login");
          }}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
        >
          {t("top.signOut")}
        </button>
      </div>
    </header>
  );
}
