import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "DPEngine | AI-Powered Dynamic Pricing",
  description: "Enterprise-grade Dynamic Pricing Engine with Reinforcement Learning and Demand Forecasting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(inter.variable, outfit.variable, "font-sans antialiased bg-black text-white selection:bg-indigo-500/30 min-h-screen")}>
        {children}
      </body>
    </html>
  );
}
