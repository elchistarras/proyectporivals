"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import RivalsPage from "@/components/home/RivalsPage";

type Tab = "rivals" | "servicios" | "comunidad";

function HomeInner() {
  const searchParams = useSearchParams();
  const initialTab   = (searchParams.get("tab") as Tab) ?? "rivals";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <RivalsPage activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeInner />
    </Suspense>
  );
}
