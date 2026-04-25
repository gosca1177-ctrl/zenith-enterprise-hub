import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
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
import type { User } from "@supabase/supabase-js";

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background w-full">
          <AppSidebar activeView={activeView} onViewChange={setActiveView} user={user} />
          <SidebarInset className="bg-background">
            <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-background/95 backdrop-blur-md sticky top-0 z-50">
              <div className="flex gap-8 items-center">
                <SidebarTrigger className="-ml-1" />
                <div className="hidden sm:flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest opacity-40">Consolidated Earnings</span>
                  <span className="text-xl font-serif">€12,482,900.00</span>
                </div>
                <div className="hidden sm:block h-8 w-[1px] bg-white/10"></div>
                <div className="hidden md:flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest opacity-40">Active Yield</span>
                  <span className="text-xl font-serif text-emerald-500">+14.2%</span>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <Breadcrumb className="mr-4 hidden lg:block">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="font-serif italic text-primary text-sm uppercase tracking-widest">{getBreadcrumb()}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full h-8 text-[9px] uppercase tracking-[0.2em] border-primary/30 text-primary hover:bg-primary/10">
                    New Listing
                  </Button>
                  <Button size="sm" className="rounded-full h-8 text-[9px] font-bold uppercase tracking-[0.2em] bg-primary text-black hover:bg-primary/90">
                    Withdraw
                  </Button>
                </div>
              </div>
            </header>

            <main className="flex-1 p-4 md:p-8 xl:p-12 max-w-7xl mx-auto w-full relative">
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
              <AIChatbot />
            </main>
          </SidebarInset>
        </div>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
}
