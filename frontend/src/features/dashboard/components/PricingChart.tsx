"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function PricingChart({ data }: { data: any[] }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-full flex flex-col group hover:border-white/10 transition-colors">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle className="text-zinc-100 font-semibold text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse" />
            Real-Time Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex-1">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(9, 9, 11, 0.9)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1}}
                />
                <Area type="monotone" dataKey="price" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
