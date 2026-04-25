import { Hop as Home, ShoppingBag, Building2, Workflow, ChartBar as BarChart3, Settings, Users, LogOut, Briefcase, Store } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { supabase } from "@/lib/supabase";

const navItems = [
  { title: "Dashboard", icon: Home, id: "overview" },
  { title: "Buyer Marketplace", icon: Store, id: "biz-marketplace" },
  { title: "Seller Dashboard", icon: Briefcase, id: "seller-hub" },
  { title: "Marketplace Hub", icon: ShoppingBag, id: "marketplace" },
  { title: "Real Estate", icon: Building2, id: "real-estate" },
  { title: "Workflow", icon: Workflow, id: "workflow" },
  { title: "Analytics", icon: BarChart3, id: "analytics" },
];

const managementItems = [
  { title: "Team", icon: Users, id: "team" },
  { title: "Projects", icon: Briefcase, id: "projects" },
  { title: "Settings", icon: Settings, id: "settings" },
];

export function AppSidebar({ activeView, onViewChange, user }: { activeView: string, onViewChange: (view: string) => void, user: any }) {
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-black/80 border-r border-white/5 backdrop-blur-lg">
      <SidebarHeader className="p-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-b border-white/5 py-4 px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/20 text-primary shrink-0">
            <span className="font-serif italic font-bold text-sm">I</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-serif italic tracking-tight text-primary font-bold group-data-[state=collapsed]:hidden">Imperium</h1>
            <p className="text-[7px] uppercase tracking-[0.15em] opacity-40 font-bold group-data-[state=collapsed]:hidden">Enterprise</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 space-y-2 py-4">
        <SidebarGroup className="px-0 space-y-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => onViewChange(item.id)}
                    tooltip={item.title}
                    className={`
                      px-2.5 py-2 rounded-lg transition-all duration-200 text-xs h-9
                      ${activeView === item.id
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/25 text-primary shadow-md shadow-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 opacity-60 hover:opacity-100"}
                    `}
                  >
                    <item.icon className={`size-3.5 shrink-0 ${activeView === item.id ? "text-primary" : ""}`} />
                    <span className="group-data-[state=collapsed]:hidden truncate text-xs">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-0 border-t border-white/10 pt-2 space-y-1">
          <SidebarGroupLabel className="px-2 text-[7px] uppercase tracking-widest opacity-40 font-bold group-data-[state=collapsed]:hidden h-6">Manage</SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu className="space-y-0.5">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => onViewChange(item.id)}
                    tooltip={item.title}
                    className={`
                      px-2.5 py-2 rounded-lg transition-all duration-200 text-xs h-9
                      ${activeView === item.id
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/25 text-primary shadow-md shadow-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 opacity-60 hover:opacity-100"}
                    `}
                  >
                    <item.icon className={`size-3.5 shrink-0 ${activeView === item.id ? "text-primary" : ""}`} />
                    <span className="group-data-[state=collapsed]:hidden truncate text-xs">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/10 bg-gradient-to-t from-black/60 to-transparent p-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 px-1">
            <Avatar className="h-8 w-8 border border-primary/30 shrink-0 shadow-lg shadow-primary/10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-black font-bold text-xs">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col truncate min-w-0 group-data-[state=collapsed]:hidden">
              <p className="truncate text-xs font-bold leading-tight">{user?.displayName || "User"}</p>
              <p className="truncate text-[7px] text-primary uppercase tracking-wider font-bold opacity-80">{user?.role || "Platinum"}</p>
            </div>
            <Button variant="ghost" size="icon" className="size-7 shrink-0 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all" onClick={handleSignOut}>
              <LogOut className="size-3.5" />
            </Button>
          </div>
          <div className="h-px bg-gradient-to-r from-white/5 via-primary/10 to-white/5 group-data-[state=collapsed]:hidden" />
          <p className="text-[6px] text-muted-foreground/50 uppercase tracking-[0.1em] font-bold px-1 group-data-[state=collapsed]:hidden">v1.0 Enterprise</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
