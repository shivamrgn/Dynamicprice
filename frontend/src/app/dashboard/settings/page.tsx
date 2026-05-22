"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/services/api";

export default function SettingsPage() {
  const [minMargin, setMinMargin] = useState(15);
  const [maxIncrease, setMaxIncrease] = useState(5);
  const [cron, setCron] = useState("0 0 * * *");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    apiClient.get("/api/v1/settings").then((res) => {
      setMinMargin(res.data.min_margin);
      setMaxIncrease(res.data.max_price_increase);
      setCron(res.data.retrain_cron);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, []);

  const saveSettings = async () => {
    setSaving(true);
    try {
      await apiClient.put("/api/v1/settings", {
        min_margin: minMargin,
        max_price_increase: maxIncrease,
        retrain_cron: cron,
      });
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return <div className="space-y-6"><div className="h-[200px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" /><div className="h-[200px] rounded-xl bg-zinc-900/40 border border-white/5 animate-pulse" /></div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <div><h1 className="text-3xl font-bold tracking-tight text-white mb-2">Engine Settings</h1><p className="text-zinc-400">Configure global price floors, ceilings, and ML hyperparameter thresholds.</p></div>
      <div className="max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl">
            <CardHeader><CardTitle className="text-zinc-100 font-semibold text-lg">Pricing Guardrails</CardTitle><CardDescription className="text-zinc-500">Set safety bounds so the RL agent never prices below cost or above market tolerance.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-zinc-300 block mb-2">Global Minimum Margin (%)</label>
                  <input type="number" value={minMargin} onChange={(e) => setMinMargin(Number(e.target.value))} className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-300 block mb-2">Max Price Increase Per Day (%)</label>
                  <input type="number" value={maxIncrease} onChange={(e) => setMaxIncrease(Number(e.target.value))} className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl">
            <CardHeader><CardTitle className="text-zinc-100 font-semibold text-lg">ML Retraining Schedule</CardTitle><CardDescription className="text-zinc-500">Configure how often the forecasting and elasticity models sync with new DB data.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-2">Cron Schedule</label>
                <input type="text" value={cron} onChange={(e) => setCron(e.target.value)} className="w-full bg-zinc-950 border border-white/10 rounded-lg p-2 text-white font-mono text-sm" />
                <p className="text-xs text-zinc-500 mt-2">Runs every midnight UTC by default.</p>
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={saveSettings} disabled={saving} className="bg-white text-black hover:bg-zinc-200">{saving ? "Saving..." : "Save Settings"}</Button>
                <Button variant="outline" className="border-white/10 text-white hover:bg-zinc-800">Trigger Manual Retraining</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
