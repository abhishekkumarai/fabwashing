"use client";

import { useEffect, useState } from "react";
import { UserCog, Plus, Crown, KeyRound, Lock, Clock } from "lucide-react";
import { api, list } from "@/lib/api";
import { PageHeader, StatRow, Card, Button, money } from "@/components/ui";

type Staff = { id: number; name: string; role: string; branch_code: string | null; pin: string; is_super_admin: boolean; locked: boolean };
type Branch = { id: number; code: string; name: string; type: string };

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Staff");

  const load = () => list<Staff>("/staff/").then(setStaff);
  useEffect(() => { load(); list<Branch>("/branches/").then(setBranches); }, []);

  const addStaff = async () => {
    if (!name.trim()) return;
    await api.post("/staff/", { name, role });
    setName(""); setShowForm(false); load();
  };

  const pinSet = staff.filter((s) => s.pin).length;
  const superAdmins = staff.filter((s) => s.is_super_admin);
  const typeLabel = (t: string) => (t === "plant" ? "PLANT" : t === "live_store" ? "LIVE STORE" : "STORE");

  return (
    <div>
      <PageHeader
        icon={UserCog}
        iconClass="bg-blue-600"
        title="Staff & Attendance"
        subtitle="PIN clock-in · shift commissions · roster & lockouts"
        actions={<><Button>{staff.length} staff</Button><Button variant="primary" onClick={() => setShowForm((v) => !v)}><Plus size={15} /> Add staff</Button></>}
      />

      <StatRow stats={[
        { label: "Roster", value: staff.length, sub: "active users", icon: UserCog, iconClass: "bg-blue-100 text-blue-600" },
        { label: "PIN set", value: pinSet, sub: `${staff.length ? Math.round((pinSet / staff.length) * 100) : 0}% of roster`, icon: KeyRound, iconClass: "bg-emerald-100 text-emerald-600" },
        { label: "Locked", value: staff.filter((s) => s.locked).length, sub: "wrong-PIN lockout", icon: Lock, iconClass: "bg-red-100 text-red-600" },
        { label: "Open shifts", value: 0, sub: "0 recent", icon: Clock, iconClass: "bg-amber-100 text-amber-600" },
      ]} />

      {showForm && (
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div><label className="text-xs text-slate-500">Name</label><input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm" /></div>
          <div><label className="text-xs text-slate-500">Role</label><input value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block rounded-lg border border-slate-200 px-3 py-2 text-sm" /></div>
          <Button variant="primary" onClick={addStaff}>Save staff</Button>
        </div>
      )}

      <Card className="p-5">
        <div className="mb-4">
          <div className="font-semibold text-slate-900">Branches &amp; Super Admins</div>
          <div className="text-sm text-slate-400">Super Admins see the whole org · branch staff only see their branch</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 border-2 border-amber-300 bg-amber-50/40">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white grid place-items-center"><Crown size={16} /></div>
              <div className="font-semibold text-slate-900">Org Super Admin</div>
              <span className="ml-auto text-[10px] font-semibold text-amber-700 bg-amber-100 rounded-full px-2 py-0.5">FULL ACCESS</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">All menus · every branch · not limited to one store</p>
            <div className="flex gap-6 mt-3 text-sm">
              <div><div className="text-[10px] text-slate-400 uppercase">Admins</div><div className="font-bold">{superAdmins.length}</div></div>
              <div><div className="text-[10px] text-slate-400 uppercase">PIN set</div><div className="font-bold">{superAdmins.filter((s) => s.pin).length}</div></div>
            </div>
            <button className="mt-3 w-full rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 py-2 text-sm font-medium text-white">+ Add Super Admin</button>
          </Card>

          {branches.map((b) => {
            const bs = staff.filter((s) => s.branch_code === b.code);
            return (
              <Card key={b.id} className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">{b.code}</span>
                  <span className="text-[10px] font-semibold text-slate-400">{typeLabel(b.type)}</span>
                </div>
                <div className="font-semibold text-slate-900 mt-1">{b.name}</div>
                <div className="flex gap-6 mt-3 text-sm">
                  <div><div className="text-[10px] text-slate-400 uppercase">Staff</div><div className="font-bold">{bs.length}</div></div>
                  <div><div className="text-[10px] text-slate-400 uppercase">PIN</div><div className="font-bold">{bs.filter((s) => s.pin).length}</div></div>
                  <div><div className="text-[10px] text-slate-400 uppercase">Locked</div><div className="font-bold">{bs.filter((s) => s.locked).length}</div></div>
                </div>
                <div className="text-xs text-slate-400 mt-3">{bs.length} role types assigned · click to open roster</div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
