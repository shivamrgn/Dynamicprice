"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";

export default function AnalyticsPage() {
  const { data: revenueRes, isLoading: revLoading } = useFetch<any>("/api/v1/analytics/revenue");
  const { data: productsRes, isLoading: prodLoading } = useFetch<any>("/api/v1/analytics/top-products");

  const revenueData = revenueRes?.data || [];
  const topProducts = productsRes?.data || [];

  if (revLoading || prodLoading) {
    return (
      <div className="space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Advanced Analytics</h1>
          <p className="text-zinc-400">Loading analytics data from the backend...</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
          <div className="h-[400px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
        </div>
        <div className="h-[300px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Advanced Analytics</h1>
          <p className="text-zinc-400">Deep dive into historical performance, sales velocity, and conversion rates.</p>
        </div>
        <Button variant="outline" className="border-white/10 text-white bg-zinc-900 hover:bg-zinc-800">
          <Filter className="w-4 h-4 mr-2" />
          Last 7 Days
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-zinc-100 font-semibold text-lg">Revenue vs Profit</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: 'rgba(9, 9, 11, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-zinc-100 font-semibold text-lg">Conversion Rate Velocity</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(9, 9, 11, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }} name="Conversion Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-zinc-100 font-semibold text-lg">Top Performing Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-zinc-400">SKU</TableHead>
                  <TableHead className="text-zinc-400">Product Name</TableHead>
                  <TableHead className="text-zinc-400">Revenue</TableHead>
                  <TableHead className="text-zinc-400">Margin</TableHead>
                  <TableHead className="text-zinc-400 text-right">RL Uplift</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((prod: any) => (
                  <TableRow key={prod.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-indigo-400">{prod.id}</TableCell>
                    <TableCell className="text-zinc-200">{prod.name}</TableCell>
                    <TableCell className="text-zinc-300">{prod.rev}</TableCell>
                    <TableCell className="text-zinc-300">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-300">{prod.margin}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center text-sm font-medium ${prod.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {prod.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                        {prod.uplift}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
