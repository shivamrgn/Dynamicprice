"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function DemandChart({ data }: { data: any[] }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-full flex flex-col group hover:border-white/10 transition-colors">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle className="text-zinc-100 font-semibold text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
            Demand Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex-1">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(9, 9, 11, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}
                  cursor={{stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1}}
                />
                <Line type="monotone" dataKey="demand" stroke="url(#lineGrad)" strokeWidth={3} dot={{ fill: '#c084fc', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fff', stroke: '#c084fc', strokeWidth: 2 }} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
