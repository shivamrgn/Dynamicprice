"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { usePricingStore } from "@/store/usePricingStore";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function KPICards() {
  const { metrics } = usePricingStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
        >
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-6">
              <div className="text-sm font-medium text-zinc-400 tracking-wide">
                {metric.title}
              </div>
              <div className="mt-4 flex items-baseline gap-4">
                <div className="text-4xl font-semibold text-white tracking-tight">{metric.value}</div>
                <div className={`flex items-center text-sm font-medium ${metric.positive ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'} px-2 py-1 rounded-full`}>
                  {metric.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
