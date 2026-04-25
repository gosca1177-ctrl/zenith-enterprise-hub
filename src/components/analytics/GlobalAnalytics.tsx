import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Globe, Users, CreditCard } from "lucide-react";

const revenueData = [
  { month: 'Jan', marketplace: 4000, realEstate: 2400, workflow: 1200 },
  { month: 'Feb', marketplace: 3000, realEstate: 1398, workflow: 1500 },
  { month: 'Mar', marketplace: 2000, realEstate: 9800, workflow: 2290 },
  { month: 'Apr', marketplace: 2780, realEstate: 3908, workflow: 2000 },
  { month: 'May', marketplace: 1890, realEstate: 4800, workflow: 2181 },
  { month: 'Jun', marketplace: 2390, realEstate: 3800, workflow: 2500 },
];

const sectorData = [
  { name: 'Software', value: 400 },
  { name: 'Games', value: 300 },
  { name: 'Assets', value: 300 },
  { name: 'Real Estate', value: 200 },
];

const COLORS = ['#D4AF37', '#3b82f6', '#10b981', '#f59e0b'];

export function GlobalAnalytics() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Global Analytics</h2>
          <p className="text-muted-foreground italic font-serif">Deep insights across all enterprise modules.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1 px-3 py-1">
            <Globe className="size-3" /> Live Global Data
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Market Cap", value: "€1.2M", icon: TrendingUp },
          { label: "Global Users", value: "85.4k", icon: Users },
          { label: "Avg. Transaction", value: "€420", icon: CreditCard },
          { label: "Active Listings", value: "1,204", icon: Globe },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest opacity-50">{stat.label}</CardTitle>
                <stat.icon className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-serif">Revenue Distribution</CardTitle>
            <CardDescription>Transactional volume by department over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorMrk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" fontSize={11} strokeOpacity={0.3} axisLine={false} tickLine={false} />
                <YAxis fontSize={11} strokeOpacity={0.3} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="marketplace" stroke="#D4AF37" fillOpacity={1} fill="url(#colorMrk)" />
                <Area type="monotone" dataKey="realEstate" stroke="#3b82f6" fillOpacity={0} fill="#3b82f6" />
                <Area type="monotone" dataKey="workflow" stroke="#10b981" fillOpacity={0} fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="font-serif">Sector Allocation</CardTitle>
            <CardDescription>Current market share by asset type.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Total Assets Under Management</p>
              <p className="text-2xl font-bold font-mono">€4.8M</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
