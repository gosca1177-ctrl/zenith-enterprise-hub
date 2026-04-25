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
    <Sidebar variant="sidebar" collapsible="icon" className="bg-gradient-to-b from-black/40 to-black/60 border-r border-white/5">
      <SidebarHeader className="p-0 bg-gradient-to-b from-primary/5 to-transparent border-b border-white/5">
        <div className="p-6 space-y-1">
          <h1 className="text-2xl font-serif italic tracking-tight text-primary font-bold">Imperium</h1>
          <p className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold">Enterprise Hub</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 space-y-4">
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => onViewChange(item.id)}
                    tooltip={item.title}
                    className={`
                      px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm
                      ${activeView === item.id
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary shadow-lg shadow-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 opacity-70 hover:opacity-100"}
                    `}
                  >
                    <item.icon className={`size-4 ${activeView === item.id ? "text-primary" : ""}`} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-0 border-t border-white/5 pt-4">
          <SidebarGroupLabel className="px-3 text-[9px] uppercase tracking-widest opacity-40 font-bold">Management</SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => onViewChange(item.id)}
                    tooltip={item.title}
                    className={`
                      px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm
                      ${activeView === item.id
                        ? "bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary shadow-lg shadow-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 opacity-70 hover:opacity-100"}
                    `}
                  >
                    <item.icon className={`size-4 ${activeView === item.id ? "text-primary" : ""}`} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/5 bg-gradient-to-t from-black/40 to-transparent p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-1">
            <Avatar className="h-10 w-10 border border-primary/30 shadow-lg shadow-primary/10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-black font-bold text-sm">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col truncate">
              <p className="truncate text-xs font-bold">{user?.displayName || "User"}</p>
              <p className="truncate text-[9px] text-primary uppercase tracking-wider font-bold opacity-80">{user?.role || "Platinum"}</p>
            </div>
            <Button variant="ghost" size="icon" className="size-8 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all" onClick={handleSignOut}>
              <LogOut className="size-4" />
            </Button>
          </div>
          <div className="h-px bg-gradient-to-r from-white/5 via-primary/10 to-white/5" />
          <p className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.15em] font-bold px-1">v1.0 • Enterprise</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
