"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, TrendingUp, Zap, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-950 text-white overflow-hidden relative selection:bg-indigo-500/30">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-500/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-screen filter blur-[128px] animate-blob animation-delay-4000 pointer-events-none" />
      
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl fixed top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="glow-text">DPEngine</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
              <Link href="#features" className="hover:text-white transition-colors">Features</Link>
              <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
              <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" className="hidden sm:flex text-zinc-300 hover:text-white hover:bg-white/5">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-5 shadow-[0_0_20px_rgba(255,255,255,0.2)] font-semibold transition-all">
                  Dashboard Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-48 pb-32 relative z-10">
        <div className="text-center space-y-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              v2.0 Reinforcement Learning Engine is live
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]">
              The Operating System for <br/>
              <span className="glow-text">Dynamic Pricing</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Maximize revenue with Reinforcement Learning and real-time demand forecasting. 
            The enterprise-grade pricing engine for modern scale-ups.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link href="/dashboard">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 h-14 text-lg font-medium shadow-[0_0_30px_rgba(79,70,229,0.4)] group w-full sm:w-auto">
                Start Optimizing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-medium border-white/10 hover:bg-white/5 w-full sm:w-auto">
                Read the Whitepaper
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Dashboard Preview Image/Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative mx-auto max-w-6xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md p-2 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="h-8 flex items-center px-4 border-b border-white/10 gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="aspect-[16/9] w-full rounded-xl bg-zinc-950 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="text-zinc-500 flex flex-col items-center gap-4 z-10">
                  <Activity className="w-12 h-12 text-indigo-500/50 animate-pulse" />
                  <p className="text-lg font-medium tracking-wide">Interactive Dashboard Interface</p>
                </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-32 relative z-10 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Built for scale and precision</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Our models analyze millions of data points in real-time to find the exact price that maximizes your revenue without sacrificing conversion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Demand Forecasting", icon: Activity, desc: "Prophet & XGBoost models predict market demand with high precision, accounting for seasonality and trends." },
              { title: "Price Elasticity", icon: TrendingUp, desc: "Analyze price sensitivity and elasticity curves in real-time to understand customer willingness to pay." },
              { title: "RL Optimization", icon: Zap, desc: "Q-Learning algorithms adjust prices dynamically to maximize profit while managing inventory constraints." },
              { title: "Competitor Tracking", icon: ShieldCheck, desc: "Real-time monitoring of competitor prices, automatically triggering defensive or offensive pricing strategies." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="p-8 rounded-3xl glass-panel group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <feature.icon className="h-7 w-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
