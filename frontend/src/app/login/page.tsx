"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app-context";
import { Languages } from "lucide-react";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, lang, setLang, t } = useApp();
  const [tab, setTab] = useState<"otp" | "email">("otp");
  const [phone, setPhone] = useState("9999999999");
  const [otp, setOtp] = useState("123456");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    // Auth bypass: hit the backend login (accepts anything), then enter.
    try {
      await api.post("/auth/login", { phone, otp, email, password });
    } catch {
      // ignore — bypass still lets the user in even if API is unreachable
    }
    signIn();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">WashNLaundry LaundryPro</h1>
            <p className="text-sm text-slate-500 mt-1">{t("login.subtitle")}</p>
          </div>
          <div className="flex items-center rounded-full bg-slate-100 p-0.5 text-xs">
            <Languages size={14} className="mx-1.5 text-slate-400" />
            <button onClick={() => setLang("en")} className={`rounded-full px-2 py-1 font-medium ${lang === "en" ? "bg-white shadow-sm" : "text-slate-500"}`}>EN</button>
            <button onClick={() => setLang("hi")} className={`rounded-full px-2 py-1 font-medium ${lang === "hi" ? "bg-white shadow-sm" : "text-slate-500"}`}>HI</button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setTab("otp")}
            className={`rounded-lg py-2 text-sm font-semibold ${tab === "otp" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
          >
            Phone OTP
          </button>
          <button
            onClick={() => setTab("email")}
            className={`rounded-lg py-2 text-sm font-semibold ${tab === "email" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
          >
            Email &amp; password
          </button>
        </div>

        {tab === "otp" ? (
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Mobile number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 text-lg outline-none focus:border-blue-400"
              />
              <p className="text-xs text-slate-400 mt-1">10 digits, starts with 6–9</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">OTP</label>
              <div className="mt-1 flex gap-2">
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-lg tracking-[0.4em] text-center outline-none focus:border-blue-400"
                />
                <button className="rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  Send OTP
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">6-digit code sent on SMS</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Staff email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@laundry.com"
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-400"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleSignIn}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-base font-semibold text-white hover:bg-blue-700"
        >
          {t("login.signIn")}
        </button>

        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-100 px-4 py-2.5 text-center text-sm text-amber-800">
          Dev static OTP: 123456 (not used in production)
        </div>

        <p className="mt-5 text-center text-sm text-slate-400">
          Organisation signup is closed. Contact your admin for access.
        </p>
      </div>
    </div>
  );
}
