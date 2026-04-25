import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { CheckCircle2, Circle, Clock, Plus, Trophy, Zap } from "lucide-react";

const sampleTasks = [
  { id: "1", title: "Review Q2 Financial Reports", status: "completed", points: 50, assignee: "You" },
  { id: "2", title: "Update Property Listings", status: "in-progress", points: 30, assignee: "You" },
  { id: "3", title: "Client Onboarding Flow", status: "todo", points: 75, assignee: "Team" },
  { id: "4", title: "Market Analysis Report", status: "todo", points: 100, assignee: "You" },
  { id: "5", title: "Escrow Documentation", status: "in-progress", points: 60, assignee: "Team" },
];

export function WorkflowModule() {
  const statusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="size-5 text-emerald-500" />;
      case "in-progress": return <Clock className="size-5 text-blue-500" />;
      default: return <Circle className="size-5 text-muted-foreground" />;
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in-progress": return "In Progress";
      default: return "To Do";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Workflow</h2>
          <p className="text-muted-foreground italic font-serif">Gamified task management with AI-powered insights.</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-white/5 rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="size-5 text-primary" />
              <CardTitle className="text-lg font-serif">Total Points</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-mono">4,500</p>
            <p className="text-xs text-muted-foreground mt-2">Silver Tier - 500 pts to Gold</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-blue-500" />
              <CardTitle className="text-lg font-serif">Active Tasks</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-mono">2</p>
            <p className="text-xs text-muted-foreground mt-2">In progress right now</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-emerald-500" />
              <CardTitle className="text-lg font-serif">Completed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-mono">12</p>
            <p className="text-xs text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Task Board</h3>
        {sampleTasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:ring-1 hover:ring-primary transition-all">
              <CardContent className="flex items-center gap-4 p-4">
                {statusIcon(task.status)}
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.assignee}</p>
                </div>
                <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                  {statusLabel(task.status)}
                </Badge>
                <div className="text-sm font-mono font-bold text-primary">+{task.points} pts</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
