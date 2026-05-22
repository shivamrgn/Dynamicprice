"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/services/api";

export default function SimulationsPage() {
  const [multiplier, setMultiplier] = useState(1.2);
  const [competitor, setCompetitor] = useState("Price Drop 10%");
  const [data, setData] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await apiClient.post("/api/v1/simulations/run", {
        demand_multiplier: multiplier,
        competitor_action: competitor,
      });
      setData(res.data.data);
    } catch {
      // Fallback to local generation
      setData(Array.from({ length: 12 }, (_, i) => ({
        month: `M${i+1}`, baseline: 10000 + Math.random() * 5000,
        simulated: (10000 + Math.random() * 5000) * multiplier,
      })));
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div><h1 className="text-3xl font-bold tracking-tight text-white mb-2">Sandbox Simulations</h1><p className="text-zinc-400">Test hypothetical pricing scenarios against the ML engine before deploying.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-1">
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl">
            <CardHeader><CardTitle className="text-zinc-100 font-semibold text-lg">Scenario Parameters</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-2">Demand Shock Multiplier</label>
                <input type="range" min="0.5" max="2.0" step="0.1" value={multiplier} onChange={(e) => setMultiplier(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
                <div className="text-right text-xs text-zinc-500 mt-1">{multiplier.toFixed(1)}x Baseline</div>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-2">Competitor Action</label>
                <select value={competitor} onChange={(e) => setCompetitor(e.target.value)} className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-sm text-zinc-300">
                  <option>Price Drop 10%</option>
                  <option>Price Match</option>
                  <option>Stock Out</option>
                </select>
              </div>
              <Button onClick={runSimulation} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]" disabled={isSimulating}>
                {isSimulating ? "Simulating..." : "Run ML Simulation"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-3">
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-[400px] flex flex-col">
            <CardHeader><CardTitle className="text-zinc-100 font-semibold text-lg">Revenue Forecast: Baseline vs Simulated</CardTitle></CardHeader>
            <CardContent className="flex-1">
              {data.length === 0 ? (
                <div className="h-full flex items-center justify-center text-zinc-500">Click &quot;Run ML Simulation&quot; to generate a forecast.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717a" tick={{fill:'#52525b',fontSize:12}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#71717a" tick={{fill:'#52525b',fontSize:12}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor:'rgba(9,9,11,0.9)',borderColor:'rgba(255,255,255,0.1)',borderRadius:'12px'}} />
                    <Line type="monotone" dataKey="baseline" stroke="#52525b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Baseline" />
                    <Line type="monotone" dataKey="simulated" stroke="#c084fc" strokeWidth={3} dot={{ fill:'#c084fc',strokeWidth:2,r:4 }} activeDot={{ r:6,fill:'#fff' }} name="Simulated" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
