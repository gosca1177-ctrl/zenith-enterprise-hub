/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, Users, Briefcase, ShoppingBag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "motion/react";

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
];

const stats = [
  { label: "Total Revenue", value: "€45,231.89", description: "+20.1% from last month", icon: DollarSign, trend: "up" },
  { label: "Active Users", value: "2,350", description: "+180.1% from last month", icon: Users, trend: "up" },
  { label: "Sales", value: "12,234", description: "+19% from last month", icon: ShoppingBag, trend: "up" },
  { label: "Project Points", value: "18,432", description: "+2.1% from last week", icon: Briefcase, trend: "down" },
];

export function Overview() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
        
        {/* Main Analytics Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8"
        >
          <Card className="h-full bg-card border-white/5 rounded-2xl p-8 transition-all hover:border-primary/20">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-xl font-serif text-foreground">Market Performance Analysis</h3>
                <p className="text-xs opacity-40 font-sans mt-1">Real-time data synchronization across all digital & physical assets</p>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                <span className="w-3 h-3 rounded-full bg-white/10"></span>
              </div>
            </div>
            
            <div className="h-[300px] w-full mt-12">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data}>
                   <XAxis dataKey="name" fontSize={10} stroke="#ffffff" strokeOpacity={0.2} axisLine={false} tickLine={false} />
                   <Tooltip 
                     cursor={{ fill: 'rgba(212, 175, 55, 0.1)' }} 
                     contentStyle={{ backgroundColor: '#161618', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#E5E5E5' }}
                   />
                   <Bar dataKey="total" fill="#D4AF37" radius={[4, 4, 0, 0]} barSize={48}>
                     {data.map((_, index) => (
                       <Cell key={`cell-${index}`} fill={index === data.length - 1 ? "#D4AF37" : "rgba(255,255,255,0.05)"} className="transition-all duration-300 hover:fill-primary/40" />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4 text-[10px] uppercase tracking-widest opacity-30 px-2 font-bold">
               {data.map(d => <span key={d.name}>{d.name}</span>)}
            </div>
          </Card>
        </motion.div>

        {/* Secure Escrow Sidebar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-4"
        >
          <Card className="h-full bg-card border-white/5 rounded-2xl p-6 transition-all hover:border-primary/20">
            <h3 className="text-[10px] uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-3 opacity-60 font-bold">Secure Escrow</h3>
            <div className="space-y-4">
              {[
                { name: "Villa Grand Azure", price: "€2.4M", progress: 75, status: "Document Verification", color: "emerald-500" },
                { name: "Neural Engine SDK", price: "€12,500", progress: 100, status: "Funds Released", color: "primary" },
                { name: "Prime Retail Lot B", price: "€450k", progress: 30, status: "Due Diligence", color: "blue-500" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                  <div className="flex justify-between mb-3 text-sm">
                    <span className="font-serif italic text-foreground tracking-wide">{item.name}</span>
                    <span className="text-primary font-mono font-bold">{item.price}</span>
                  </div>
                  <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      className={`h-full rounded-full ${item.color === 'primary' ? 'bg-primary' : `bg-${item.color}`}`}
                    />
                  </div>
                  <p className="text-[9px] mt-3 opacity-40 uppercase font-bold tracking-[0.1em]">Status: {item.status}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Bottom Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 md:col-span-3"
        >
          <Card className="bg-card border-white/5 rounded-2xl p-6 transition-all hover:border-primary/20 bg-gradient-to-br from-card to-white/[0.02]">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3 font-bold">Lead Conversion</p>
            <p className="text-4xl font-serif tracking-tight">82<span className="text-sm text-primary ml-1">%</span></p>
            <p className="text-[10px] text-emerald-400 mt-4 flex items-center gap-1 font-bold">↑ 4.1% AI OPTIMIZED</p>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 md:col-span-6"
        >
          <Card className="bg-card border-white/5 rounded-2xl p-6 flex items-center justify-between group transition-all hover:border-primary/20">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Market Insights</p>
              <p className="text-lg italic font-serif leading-relaxed text-foreground/90 pr-4">"Prime residential demand in Global tech hubs exceeds supply by 22%."</p>
            </div>
            <div className="shrink-0 w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform bg-primary/5">
              <span className="text-[11px] text-primary font-bold tracking-tighter">AI AGENT</span>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-12 md:col-span-3"
        >
          <Card className="bg-card border-white/5 rounded-2xl p-6 transition-all hover:border-primary/20 border-l-primary/30 border-l-2">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3 font-bold">Reward Points</p>
            <p className="text-4xl font-serif tracking-tighter">4,500 <span className="text-xs uppercase opacity-40">pts</span></p>
            <p className="text-[10px] opacity-40 mt-4 flex items-center gap-2 uppercase tracking-widest font-bold">
               <span className="size-2 rounded-full bg-primary" />
               Silver Tier Milestone
            </p>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
