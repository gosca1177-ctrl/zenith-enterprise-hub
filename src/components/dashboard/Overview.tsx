import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Zap, Activity, Target } from "lucide-react";

const revenueData = [
  { name: "Jan", value: 3200, target: 4000 },
  { name: "Feb", value: 4100, target: 4000 },
  { name: "Mar", value: 2800, target: 4000 },
  { name: "Apr", value: 5400, target: 4000 },
  { name: "May", value: 3900, target: 4000 },
  { name: "Jun", value: 4800, target: 4000 },
];

const performanceData = [
  { name: "Week 1", performance: 72 },
  { name: "Week 2", performance: 85 },
  { name: "Week 3", performance: 78 },
  { name: "Week 4", performance: 92 },
];

const StatCard = ({ icon: Icon, label, value, change, positive }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group"
  >
    <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 hover:border-primary/30 transition-all overflow-hidden h-full">
      <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 md:space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
            <Icon className="size-4 md:size-5 text-primary" />
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-[7px] sm:text-[9px] uppercase font-bold tracking-tight gap-1 h-5 px-1.5">
            {positive ? <ArrowUpRight className="size-2" /> : <ArrowDownRight className="size-2" />}
            {change}%
          </Badge>
        </div>
        <div>
          <p className="text-[7px] sm:text-[10px] uppercase tracking-widest opacity-60 font-semibold">{label}</p>
          <p className="text-lg sm:text-2xl font-bold font-mono mt-1 truncate">{value}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function Overview() {
  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground font-serif italic text-sm">Real-time enterprise metrics and portfolio analysis</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <StatCard icon={DollarSign} label="Total Assets" value="€1.2M" change="12.5" positive />
        <StatCard icon={TrendingUp} label="Monthly Revenue" value="€84.2K" change="8.3" positive />
        <StatCard icon={Activity} label="Active Transactions" value="247" change="3.1" positive />
        <StatCard icon={Zap} label="Portfolio Yield" value="14.2%" change="2.4" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 overflow-hidden"
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-3 md:pb-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-sm md:text-lg font-serif">Revenue Analysis</CardTitle>
                  <CardDescription className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-50 mt-1">Monthly performance vs target</CardDescription>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 shrink-0 text-xs">6M</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-x-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" fontSize={10} stroke="#ffffff" strokeOpacity={0.2} axisLine={false} tickLine={false} />
                    <YAxis fontSize={10} stroke="#ffffff" strokeOpacity={0.2} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(212, 175, 55, 0.1)' }}
                      contentStyle={{ backgroundColor: 'rgba(20, 20, 20, 0.8)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.3)', fontSize: '12px' }}
                    />
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 h-full">
            <CardHeader className="border-b border-white/5 pb-3 md:pb-4">
              <CardTitle className="text-sm md:text-lg font-serif">Portfolio Snapshot</CardTitle>
              <CardDescription className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-50 mt-1">Current distribution</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-3">
              {[
                { label: "Real Estate", value: "42%", color: "from-blue-500" },
                { label: "Digital Assets", value: "28%", color: "from-primary" },
                { label: "Securities", value: "18%", color: "from-emerald-500" },
                { label: "Cash Reserve", value: "12%", color: "from-gray-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-primary font-mono">{item.value}</span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: item.value }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.color} to-transparent`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="overflow-hidden"
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 h-full">
            <CardHeader className="border-b border-white/5 pb-3">
              <CardTitle className="text-sm md:text-lg font-serif">Performance Trend</CardTitle>
              <CardDescription className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-50 mt-1">4-week progress</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="h-[200px] sm:h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" fontSize={10} stroke="#ffffff" strokeOpacity={0.2} axisLine={false} tickLine={false} />
                    <YAxis fontSize={10} stroke="#ffffff" strokeOpacity={0.2} axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(20, 20, 20, 0.8)', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.3)' }} />
                    <Area type="monotone" dataKey="performance" stroke="#D4AF37" strokeWidth={2} fill="url(#lineGradient)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="overflow-hidden"
        >
          <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 h-full">
            <CardHeader className="border-b border-white/5 pb-3">
              <CardTitle className="text-sm md:text-lg font-serif">Recent Activity</CardTitle>
              <CardDescription className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-50 mt-1">Latest transactions</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-2">
              {[
                { type: "Listing", title: "Premium Tech Stack", amount: "€12,500", time: "2h ago", status: "completed" },
                { type: "Purchase", title: "Berlin Penthouse", amount: "€1.2M", time: "1d ago", status: "escrow" },
                { type: "Dividend", title: "Q2 Distribution", amount: "€8,400", time: "3d ago", status: "completed" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start justify-between gap-2 p-2.5 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium group-hover:text-primary transition-colors truncate">{activity.title}</p>
                    <p className="text-[7px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-bold mt-0.5">{activity.type}</p>
                  </div>
                  <div className="text-right shrink-0 text-right">
                    <p className="text-xs sm:text-sm font-mono font-bold text-primary">{activity.amount}</p>
                    <Badge variant="outline" className="text-[6px] sm:text-[8px] uppercase tracking-tighter mt-1 border-primary/20 text-primary/70 bg-primary/5 h-4 px-1">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <CardContent className="p-4 sm:p-6 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 flex-1">
              <h3 className="text-lg sm:text-2xl font-bold">Unlock Premium Features</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Upgrade to unlock advanced analytics, AI insights, and priority support.</p>
            </div>
            <Button className="gap-2 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-[0.1em] text-xs px-4 sm:px-6 h-9 sm:h-11 rounded-lg shrink-0">
              Explore Pro <ArrowUpRight className="size-3" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
