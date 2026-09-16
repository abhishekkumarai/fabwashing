"use client";

import { useEffect, useState } from "react";
import { Bike } from "lucide-react";
import { list } from "@/lib/api";
import { PageHeader, DataTable, Badge, money, EmptyState } from "@/components/ui";

type Job = { id: number; type: string; customer_name: string; area: string; status: string; cod_amount: string };

export default function RiderPage() {
  const [rows, setRows] = useState<Job[]>([]);
  useEffect(() => { list<Job>("/jobs/").then(setRows); }, []);
  const mine = rows.filter((r) => !["completed", "failed"].includes(r.status));

  return (
    <div>
      <PageHeader icon={Bike} iconClass="bg-emerald-600" title="My Runs" subtitle="Your assigned pickups & deliveries for today" />
      <DataTable
        columns={["TYPE", "CUSTOMER", "AREA", "STATUS", "COD"]}
        rows={mine}
        empty={<EmptyState icon={Bike} title="No runs assigned" hint="Jobs booked in Pickup / Delivery and assigned to you appear here." />}
        render={(r) => [<Badge key="t" tone="blue">{r.type}</Badge>, r.customer_name, r.area || "—", <Badge key="s">{r.status}</Badge>, money(r.cod_amount)]}
      />
    </div>
  );
}
