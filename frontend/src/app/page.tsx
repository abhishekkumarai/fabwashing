"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/app-context";

export default function Home() {
  const router = useRouter();
  const { authed } = useApp();
  useEffect(() => {
    router.replace(authed ? "/dashboard" : "/login");
  }, [authed, router]);
  return null;
}
