"use client";

import Link from "next/link";
import { LayoutDashboard, BarChart3, LineChart, Target, Zap, Settings, Command } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Elasticity", href: "/dashboard/elasticity", icon: LineChart },
  { name: "RL Optimization", href: "/dashboard/rl-optimization", icon: Target },
  { name: "Simulations", href: "/dashboard/simulations", icon: Zap },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex selection:bg-indigo-500/30 font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-zinc-950/80 backdrop-blur-3xl flex flex-col fixed inset-y-0 z-40">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.8)] transition-all">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white">DPEngine</span>
          </Link>
        </div>
        
        <div className="px-4 py-4">
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Command className="h-4 w-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
             </div>
             <input type="text" className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-zinc-900/50 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-inner" placeholder="Search cmd+k" />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 mt-4 px-2">Main Menu</div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group relative",
                  isActive
                    ? "text-white bg-indigo-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-indigo-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                {isActive && (
                  <div className="absolute -left-4 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,1)]" />
                )}
                <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5 bg-zinc-950/50 backdrop-blur-md">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-bold text-white">
                JS
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Smith</p>
              <p className="text-xs text-zinc-500 truncate">Enterprise Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 min-h-screen relative overflow-hidden bg-zinc-950">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.1)_0,transparent_50%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.05)_0,transparent_50%)] pointer-events-none" />
        <div className="p-10 relative z-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
