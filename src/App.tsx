/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Overview } from "@/components/dashboard/Overview";
import { Marketplace } from "@/components/marketplace/Marketplace";
import { RealEstate } from "@/components/real-estate/RealEstate";
import { WorkflowModule } from "@/components/workflow/Workflow";
import { GlobalAnalytics } from "@/components/analytics/GlobalAnalytics";
import { AIChatbot } from "@/components/ai/AIChatbot";
import { AuthPage } from "@/components/auth/AuthPage";
import { BusinessMarketplace } from "@/components/marketplace/BusinessMarketplace";
import { SellerDashboard } from "@/components/dashboard/SellerDashboard";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "motion/react";
import { User as AppUser } from "@/types";
import { ThemeProvider } from "next-themes";
import { supabase } from "@/lib/supabase";
import { Menu, X, LayoutDashboard, Store, Building2, Workflow, ChartBar as BarChart3, LogOut, ChevronRight } from "lucide-react";

const navItems = [
  { title: "Dashboard", id: "overview", icon: LayoutDashboard },
  { title: "Marketplace", id: "biz-marketplace", icon: Store },
  { title: "Real Estate", id: "real-estate", icon: Building2 },
  { title: "Workflow", id: "workflow", icon: Workflow },
  { title: "Analytics", id: "analytics", icon: BarChart3 },
];

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      (async () => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .maybeSingle();

          if (profile) {
            setUser({
              uid: profile.id,
              email: profile.email,
              displayName: profile.display_name,
              role: profile.role,
              points: profile.points,
              createdAt: profile.created_at,
            });
          } else {
            setUser({
              uid: session.user.id,
              email: session.user.email || "",
              displayName: session.user.user_metadata?.full_name || "",
              role: "seller",
              points: 0,
              createdAt: new Date().toISOString(),
            });
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "overview": return <Overview />;
      case "biz-marketplace": return <BusinessMarketplace />;
      case "seller-hub": return <SellerDashboard />;
      case "marketplace": return <Marketplace />;
      case "real-estate": return <RealEstate />;
      case "workflow": return <WorkflowModule />;
      case "analytics": return <GlobalAnalytics />;
      default: return <Overview />;
    }
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      overview: "Dashboard",
      "biz-marketplace": "Marketplace",
      "seller-hub": "Seller Hub",
      marketplace: "Marketplace Hub",
      "real-estate": "Real Estate",
      workflow: "Workflow",
      analytics: "Analytics",
    };
    return titles[activeView] || "Dashboard";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 rounded-xl bg-blue-600 animate-pulse" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthPage onAuthSuccess={() => {}} />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex h-screen bg-slate-950 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="font-bold text-white text-sm">Zenith</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-3 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">{item.title}</span>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900 p-4">
            {user && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {user.displayName?.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.displayName || "User"}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            )}
            <Button
              onClick={() => supabase.auth.signOut()}
              variant="outline"
              className="w-full gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-slate-400" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">{getPageTitle()}</h1>
                <p className="text-xs text-slate-400 mt-0.5">Manage your enterprise</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button className="hidden sm:inline-flex gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm">
                New Listing
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">
                Withdraw
              </Button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="p-6 md:p-8">
              <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderView()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>
      </div>

      <AIChatbot />
      <Toaster />
    </ThemeProvider>
  );
}
