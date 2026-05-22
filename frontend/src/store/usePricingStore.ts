import { create } from 'zustand';

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

interface PricingState {
  metrics: DashboardMetric[];
  isLoading: boolean;
  setMetrics: (metrics: DashboardMetric[]) => void;
  fetchDashboardData: () => Promise<void>;
}

export const usePricingStore = create<PricingState>((set) => ({
  metrics: [
    { title: "Active SKUs Monitored", value: "14,239", change: "+12.5%", positive: true },
    { title: "Revenue Uplift (24h)", value: "$45,231", change: "+8.2%", positive: true },
    { title: "RL Model Confidence", value: "94.2%", change: "-0.5%", positive: false },
  ],
  isLoading: false,
  setMetrics: (metrics) => set({ metrics }),
  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      // In a real app, this would use pricingService to fetch metrics
      // await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      set({ isLoading: false });
    }
  }
}));
