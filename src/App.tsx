/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Overview } from "@/components/dashboard/Overview";
import { Marketplace } from "@/components/marketplace/Marketplace";
import { RealEstate } from "@/components/real-estate/RealEstate";
import { WorkflowModule } from "@/components/workflow/Workflow";
import { GlobalAnalytics } from "@/components/analytics/GlobalAnalytics";
import { AIChatbot } from "@/components/ai/AIChatbot";
import { AuthPage } from "@/components/auth/AuthPage";
import { BusinessMarketplace } from "@/components/marketplace/BusinessMarketplace";
import { SellerDashboard } from "@/components/dashboard/SellerDashboard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "motion/react";
import { User as AppUser } from "@/types";
import { ThemeProvider } from "next-themes";
import { supabase } from "@/lib/supabase";

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const getBreadcrumb = () => {
    const views: Record<string, string> = {
      overview: "Dashboard",
      "biz-marketplace": "Buyer Marketplace",
      "seller-hub": "Seller Hub",
      marketplace: "Marketplace Hub",
      "real-estate": "Real Estate Management",
      workflow: "Project Workflow",
      analytics: "Global Analytics",
      team: "Team Management",
      projects: "Project Portfolio",
      settings: "Platform Settings"
    };
    return views[activeView] || "Home";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 rounded-xl bg-primary animate-pulse" />
          <p className="text-sm font-serif italic text-muted-foreground">Initializing Neural Link...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthPage onAuthSuccess={() => {}} />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full h-screen overflow-hidden bg-gradient-to-br from-background via-background to-black/40">
          <AppSidebar activeView={activeView} onViewChange={setActiveView} user={user} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-background/80 backdrop-blur-xl z-40 gap-4 flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-6 flex-1 min-w-0">
                <SidebarTrigger className="shrink-0" />
                <div className="hidden md:flex flex-col gap-0.5">
                  <span className="text-[8px] uppercase tracking-widest opacity-40 font-bold">Total Assets</span>
                  <span className="text-lg font-serif font-bold">€1.2M</span>
                </div>
                <div className="hidden md:block h-6 w-px bg-white/10"></div>
                <div className="hidden lg:flex flex-col gap-0.5">
                  <span className="text-[8px] uppercase tracking-widest opacity-40 font-bold">Portfolio Yield</span>
                  <span className="text-lg font-serif text-primary font-bold">+14.2%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <Breadcrumb className="hidden xl:block max-w-[200px]">
                  <BreadcrumbList className="flex-wrap">
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-serif italic text-primary text-xs uppercase tracking-tight truncate">{getBreadcrumb()}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex gap-1.5">
                  <Button variant="outline" size="sm" className="rounded-lg h-9 text-[8px] uppercase tracking-[0.15em] border-primary/30 text-primary hover:bg-primary/10 hidden sm:inline-flex px-3">
                    New Listing
                  </Button>
                  <Button size="sm" className="rounded-lg h-9 text-[8px] font-bold uppercase tracking-[0.15em] bg-primary text-black hover:bg-primary/90 px-3">
                    Withdraw
                  </Button>
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              <div className="p-4 md:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeView}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
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
      </SidebarProvider>
    </ThemeProvider>
  );
}
