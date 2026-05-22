"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/hooks/useFetch";

export default function ElasticityPage() {
  const { data: curveRes, isLoading: curveLoading } = useFetch<any>("/api/v1/elasticity/curve");
  const { data: classRes, isLoading: classLoading } = useFetch<any>("/api/v1/elasticity/classifications");

  const elasticityData = curveRes?.data || [];
  const skuElasticity = classRes?.data || [];

  if (curveLoading || classLoading) {
    return (
      <div className="space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Price Elasticity Analysis</h1>
          <p className="text-zinc-400">Computing elasticity curves from the ML engine...</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
          <div className="h-[400px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Price Elasticity Analysis</h1>
        <p className="text-zinc-400">Identify product price sensitivity curves and willingness-to-pay thresholds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-zinc-100 font-semibold text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
                Demand vs Price Curve
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="price" name="Price" unit="$" stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} />
                  <YAxis dataKey="demand" name="Demand" stroke="#71717a" tick={{fill: '#52525b', fontSize: 12}} />
                  <ZAxis range={[100, 100]} />
                  <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ backgroundColor: 'rgba(9, 9, 11, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }} />
                  <Scatter name="Elasticity Curve" data={elasticityData} fill="#f472b6" line shape="circle" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-zinc-100 font-semibold text-lg">SKU Elasticity Classification</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-zinc-400">SKU</TableHead>
                    <TableHead className="text-zinc-400">Coefficient</TableHead>
                    <TableHead className="text-zinc-400">Classification</TableHead>
                    <TableHead className="text-zinc-400">Strategy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {skuElasticity.map((sku: any) => (
                    <TableRow key={sku.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-indigo-400">{sku.id}</TableCell>
                      <TableCell className="text-zinc-300 font-mono">{sku.coeff}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-zinc-700 ${sku.class === 'Inelastic' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' : sku.class === 'Veblen Good' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' : 'text-rose-400 border-rose-400/30 bg-rose-400/10'}`}>
                          {sku.class}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-300">{sku.strategy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
