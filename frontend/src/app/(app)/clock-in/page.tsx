"use client";

import { useEffect, useState } from "react";
import { list } from "@/lib/api";
import { Card, EmptyState } from "@/components/ui";
import { Clock } from "lucide-react";

type Staff = { id: number; name: string; pin: string };

export default function ClockInPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  useEffect(() => { list<Staff>("/staff/").then(setStaff); }, []);
  const withPin = staff.filter((s) => s.pin);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Clock in / out</h1>
      <p className="text-sm text-slate-500 mt-1 mb-5">Tap your name → enter PIN</p>
      <Card className="p-2">
        {withPin.length === 0 ? (
          <EmptyState icon={Clock} title="No PIN set. Ask the manager." />
        ) : (
          <div className="grid grid-cols-4 gap-3 p-4">
            {withPin.map((s) => (
              <button key={s.id} className="rounded-xl border border-slate-200 p-4 text-center hover:border-blue-400">
                <div className="font-medium text-slate-800">{s.name}</div>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
