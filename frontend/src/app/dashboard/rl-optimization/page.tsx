"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";

export default function RLOptimizationPage() {
  const { data: rewardRes, isLoading: rewardLoading } = useFetch<any>("/api/v1/rl/rewards");
  const { data: decisionsRes, isLoading: decisionsLoading } = useFetch<any>("/api/v1/rl/decisions");

  const rlData = rewardRes?.data || [];
  const activeActions = decisionsRes?.data || [];
  const isLoading = rewardLoading || decisionsLoading;

  if (isLoading) {
    return (
      <div className="space-y-8 pb-10">
        <div><h1 className="text-3xl font-bold tracking-tight text-white mb-2">Reinforcement Learning Engine</h1><p className="text-zinc-400">Syncing with the RL agent...</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
          <div className="h-[400px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div><h1 className="text-3xl font-bold tracking-tight text-white mb-2">Reinforcement Learning Engine</h1><p className="text-zinc-400">Monitor the Q-Learning autonomous pricing agent maximizing long-term revenue.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="lg:col-span-2">
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-[400px] flex flex-col">
            <CardHeader><CardTitle className="text-zinc-100 font-semibold text-lg flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse" />Cumulative Reward</CardTitle></CardHeader>
            <CardContent className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rlData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs><linearGradient id="colorReward" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="episode" stroke="#71717a" tick={{fill:'#52525b',fontSize:12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#71717a" tick={{fill:'#52525b',fontSize:12}} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor:'rgba(9,9,11,0.9)',borderColor:'rgba(255,255,255,0.1)',color:'#fff',borderRadius:'12px'}} />
                  <Area type="monotone" dataKey="reward" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorReward)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-[400px] flex flex-col overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-black/20"><CardTitle className="text-zinc-100 font-semibold text-lg flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" />Live Agent Decisions</CardTitle></CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              <div className="divide-y divide-white/5">
                {activeActions.map((log: any, i: number) => (
                  <div key={i} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="border-indigo-500/30 text-indigo-300 bg-indigo-500/10 text-xs font-mono">{log.sku}</Badge>
                      <span className="text-xs text-zinc-500">{log.time}</span>
                    </div>
                    <p className="text-sm font-medium text-white mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" />{log.action}</p>
                    <p className="text-xs text-zinc-400">{log.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
