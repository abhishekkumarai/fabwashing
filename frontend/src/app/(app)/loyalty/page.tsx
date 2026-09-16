"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, Users, Sparkles, Award, IndianRupee, Share2, ShieldCheck } from "lucide-react";
import { list } from "@/lib/api";
import { PageHeader, StatRow, Card, Button, EmptyState } from "@/components/ui";

type Account = { id: number; customer_name: string; balance: number; lifetime_earned: number; lifetime_redeemed: number };

export default function LoyaltyPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => { list<Account>("/loyalty-accounts/").then(setAccounts); }, []);

  const inCirc = accounts.reduce((a, x) => a + x.balance, 0);
  const earned = accounts.reduce((a, x) => a + x.lifetime_earned, 0);
  const redeemed = accounts.reduce((a, x) => a + x.lifetime_redeemed, 0);

  return (
    <div>
      <PageHeader
        icon={Gift}
        iconClass="bg-orange-500"
        title="Loyalty & referrals"
        subtitle="Points, redeem rates & referral rewards — laundry retention engine"
        actions={<><Button>1 pts / ₹100</Button><Button>Rules</Button><Link href="/customers" className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3.5 py-2 text-sm font-medium text-white"><Users size={15} /> Customers</Link></>}
      />

      <StatRow stats={[
        { label: "Accounts", value: accounts.length, sub: "0 with balance", icon: Users, iconClass: "bg-slate-100 text-slate-500" },
        { label: "In circulation", value: inCirc, sub: "≈ ₹0 redeemable", icon: Sparkles, iconClass: "bg-blue-100 text-blue-600" },
        { label: "Lifetime earned", value: earned, icon: Award, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "Lifetime redeemed", value: redeemed, icon: IndianRupee, iconClass: "bg-amber-100 text-amber-600" },
        { label: "Referrals", value: 0, sub: "0 rewarded", icon: Share2, iconClass: "bg-purple-100 text-purple-600" },
        { label: "Pending / Blocked", value: "0 / 0", icon: ShieldCheck, iconClass: "bg-rose-100 text-rose-600" },
      ]} />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-amber-50 text-amber-700 px-3 py-1.5 text-sm font-medium">Earn 1 pt / ₹100</span>
        <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1.5 text-sm font-medium">Redeem 1 pt = ₹0.5</span>
        <span className="rounded-full bg-purple-50 text-purple-700 px-3 py-1.5 text-sm font-medium">Referral +50 pts both sides</span>
        <span className="text-sm text-slate-400">Same-device / same-address auto-blocked</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><div className="h-9 w-9 rounded-lg bg-orange-400 text-white grid place-items-center"><Gift size={16} /></div><div><div className="font-semibold text-slate-900">Top loyalty accounts</div><div className="text-xs text-slate-400">{accounts.length} accounts</div></div></div>
            <Link href="/customers" className="text-sm text-blue-600 font-medium">All customers →</Link>
          </div>
          {accounts.length === 0 ? <EmptyState icon={Gift} title="No loyalty accounts yet" hint="Accounts are created automatically when a customer first earns points at POS." /> : (
            <div className="mt-3 space-y-2">{accounts.map((a) => <div key={a.id} className="flex justify-between text-sm"><span>{a.customer_name}</span><span className="font-semibold">{a.balance} pts</span></div>)}</div>
          )}
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-2"><div className="h-9 w-9 rounded-lg bg-purple-500 text-white grid place-items-center"><Share2 size={16} /></div><div><div className="font-semibold text-slate-900">Referrals</div><div className="text-xs text-slate-400">0 total · 0 rewarded · 0 pending</div></div></div>
          <EmptyState icon={Share2} title="No referrals yet" hint="Codes appear when customers share invites. Fraud matches are blocked automatically." />
        </Card>
      </div>
    </div>
  );
}
