import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Zap, Activity, Target, Plus, Clock, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from "lucide-react";

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 overflow-hidden"
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
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 h-full flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 text-center space-y-3 flex flex-col items-center">
              <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                <Plus className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif">Start New Deal</h3>
                <p className="text-xs text-muted-foreground mt-1">Create a new transaction or listing</p>
              </div>
              <Button className="gap-2 bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-[0.1em] text-xs px-4 h-9 mt-2">
                Get Started <ArrowUpRight className="size-3" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="overflow-hidden"
      >
        <Card className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10">
          <CardHeader className="border-b border-white/5 pb-3 md:pb-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-sm md:text-lg font-serif">Recent Transactions</CardTitle>
                <CardDescription className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-50 mt-1">Your latest activity</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs border-primary/30 text-primary hover:bg-primary/10">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Transaction</TableHead>
                    <TableHead className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Type</TableHead>
                    <TableHead className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">Date</TableHead>
                    <TableHead className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, title: "Premium Tech Stack", type: "Listing", amount: "€12,500", date: "2h ago", status: "completed", icon: CheckCircle2 },
                    { id: 2, title: "Berlin Penthouse", type: "Purchase", amount: "€1.2M", date: "1d ago", status: "escrow", icon: Clock },
                    { id: 3, title: "Q2 Distribution", type: "Dividend", amount: "€8,400", date: "3d ago", status: "completed", icon: CheckCircle2 },
                    { id: 4, title: "Smart Contract Deploy", type: "Transfer", amount: "€5,200", date: "5d ago", status: "pending", icon: AlertCircle },
                    { id: 5, title: "Portfolio Rebalance", type: "Adjustment", amount: "€45,000", date: "1w ago", status: "completed", icon: CheckCircle2 },
                  ].map((transaction) => {
                    const StatusIcon = transaction.icon;
                    return (
                      <TableRow key={transaction.id} className="border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
                        <TableCell className="text-xs sm:text-sm font-medium group-hover:text-primary transition-colors">
                          {transaction.title}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          <Badge variant="outline" className="border-white/10 bg-white/5 text-xs">
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm font-mono font-bold text-primary">
                          {transaction.amount}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {transaction.date}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <StatusIcon className={`size-3 ${
                              transaction.status === "completed" ? "text-emerald-500" :
                              transaction.status === "escrow" ? "text-blue-500" :
                              "text-yellow-500"
                            }`} />
                            <Badge variant="outline" className={`text-[7px] uppercase tracking-tighter ${
                              transaction.status === "completed" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" :
                              transaction.status === "escrow" ? "border-blue-500/30 text-blue-400 bg-blue-500/10" :
                              "border-yellow-500/30 text-yellow-400 bg-yellow-500/10"
                            }`}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
