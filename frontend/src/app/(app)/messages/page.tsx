"use client";

import { MessageCircle } from "lucide-react";
import { PageHeader, Card, EmptyState } from "@/components/ui";

export default function MessagesPage() {
  return (
    <div>
      <PageHeader icon={MessageCircle} iconClass="bg-slate-500" title="Messages" subtitle="Two-way SMS / WhatsApp with customers" />
      <Card className="p-2">
        <EmptyState icon={MessageCircle} title="Coming soon" hint="Customer messaging is not available yet in this build." />
      </Card>
    </div>
  );
}
