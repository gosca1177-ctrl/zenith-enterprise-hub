import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import { motion } from "motion/react";
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Activity, Zap, CircleCheck as CheckCircle2, Clock, CircleAlert as AlertCircle, Plus } from "lucide-react";

const revenueData = [
  { name: "Jan", value: 3200 },
  { name: "Feb", value: 4100 },
  { name: "Mar", value: 2800 },
  { name: "Apr", value: 5400 },
  { name: "May", value: 3900 },
  { name: "Jun", value: 4800 },
];

const performanceData = [
  { name: "Week 1", performance: 72 },
  { name: "Week 2", performance: 85 },
  { name: "Week 3", performance: 78 },
  { name: "Week 4", performance: 92 },
];

const StatCard = ({ icon: Icon, label, value, change, trend }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="h-full"
  >
    <Card className="h-full transition-colors hover:border-primary/30">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <Badge className={`gap-1 ${trend === 'up' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-red-500/15 text-red-400 border-red-500/20'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}%
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export function Overview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
        <p className="text-muted-foreground">Track your portfolio performance and recent activity</p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} label="Total Assets" value="€1.2M" change="12.5" trend="up" />
        <StatCard icon={TrendingUp} label="Monthly Revenue" value="€84.2K" change="8.3" trend="up" />
        <StatCard icon={Activity} label="Active Transactions" value="247" change="3.1" trend="up" />
        <StatCard icon={Zap} label="Portfolio Yield" value="14.2%" change="2.4" trend="up" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">6M</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748b" strokeWidth={0.5} />
                    <YAxis stroke="#64748b" strokeWidth={0.5} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                      }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20 h-full flex flex-col items-center justify-center p-6 hover:border-primary/40 transition-all">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">Start New Deal</h3>
                <p className="text-sm text-muted-foreground">Create a new transaction</p>
              </div>
              <Button className="w-full">
                Get Started
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Performance & Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>4-week overview</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#64748b" strokeWidth={0.5} />
                    <YAxis stroke="#64748b" strokeWidth={0.5} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#f1f5f9',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="performance"
                      fill="url(#gradient)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portfolio Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Portfolio breakdown</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              {[
                { label: "Real Estate", value: "42%", color: "bg-blue-500" },
                { label: "Digital Assets", value: "28%", color: "bg-emerald-500" },
                { label: "Securities", value: "18%", color: "bg-amber-500" },
                { label: "Cash Reserve", value: "12%", color: "bg-slate-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">{item.label}</span>
                    <span className="text-foreground font-bold">{item.value}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: item.value }}
                      transition={{ duration: 0.8, delay: 0.2 * i }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="border-b border-border pb-4 flex items-center justify-between flex-row">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest activity</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="p-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Transaction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { title: "Premium Tech Stack", type: "Listing", amount: "€12,500", date: "2h ago", status: "completed", icon: CheckCircle2 },
                  { title: "Berlin Penthouse", type: "Purchase", amount: "€1.2M", date: "1d ago", status: "pending", icon: Clock },
                  { title: "Q2 Distribution", type: "Dividend", amount: "€8,400", date: "3d ago", status: "completed", icon: CheckCircle2 },
                  { title: "Smart Contract", type: "Transfer", amount: "€5,200", date: "5d ago", status: "pending", icon: AlertCircle },
                  { title: "Portfolio Rebalance", type: "Adjustment", amount: "€45,000", date: "1w ago", status: "completed", icon: CheckCircle2 },
                ].map((tx, i) => {
                  const StatusIcon = tx.icon;
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{tx.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{tx.type}</Badge>
                      </TableCell>
                      <TableCell className="font-bold text-primary">{tx.amount}</TableCell>
                      <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <StatusIcon className="w-4 h-4" style={{
                            color: tx.status === 'completed' ? '#10b981' : '#f59e0b'
                          }} />
                          <Badge className={`${tx.status === 'completed' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/15 text-amber-400 border-amber-500/20'}`}>
                            {tx.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
