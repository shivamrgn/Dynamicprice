"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { KPICards } from "@/features/dashboard/components/KPICards";
import { PricingChart } from "@/features/dashboard/components/PricingChart";
import { DemandChart } from "@/features/dashboard/components/DemandChart";
import { usePricingStore } from "@/store/usePricingStore";

export default function DashboardOverview() {
  const { data: metricsData, isLoading: metricsLoading } = useFetch<any>("/api/v1/dashboard/metrics");
  const { data: pricingData, isLoading: pricingLoading } = useFetch<any>("/api/v1/dashboard/pricing-chart");
  const { data: demandData, isLoading: demandLoading } = useFetch<any>("/api/v1/dashboard/demand-chart");
  const { setMetrics } = usePricingStore();

  useEffect(() => {
    if (metricsData?.metrics) {
      setMetrics(metricsData.metrics);
    }
  }, [metricsData, setMetrics]);

  const isLoading = metricsLoading || pricingLoading || demandLoading;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Overview</h1>
          <p className="text-zinc-400">Real-time performance metrics and ML model statuses.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[380px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
          <div className="h-[380px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Overview</h1>
        <p className="text-zinc-400">Real-time performance metrics and ML model statuses.</p>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PricingChart data={pricingData?.data || []} />
        <DemandChart data={demandData?.data || []} />
      </div>
    </div>
  );
}
