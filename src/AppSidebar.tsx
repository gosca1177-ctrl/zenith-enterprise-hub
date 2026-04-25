/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, ShoppingBag, Building2, Workflow, BarChart3, Settings, Users, LogOut, Briefcase, Sun, Moon, Store } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

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

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-0">
        <div className="p-8">
          <h1 className="text-2xl font-serif italic tracking-tight text-primary">Imperium</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mt-1">Global Asset Management</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeView === item.id} 
                    onClick={() => onViewChange(item.id)}
                    tooltip={item.title}
                    className={`
                      px-4 py-6 rounded-lg transition-all duration-200
                      ${activeView === item.id ? "bg-white/5 border border-white/10 text-primary" : "opacity-50 hover:opacity-100 hover:bg-white/5"}
                    `}
                  >
                    <item.icon className={`size-4 ${activeView === item.id ? "text-primary" : ""}`} />
                    <span className="text-sm font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest opacity-30">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    isActive={activeView === item.id} 
                    onClick={() => onViewChange(item.id)}
                    tooltip={item.title}
                    className={`
                      px-4 py-6 rounded-lg transition-all duration-200
                      ${activeView === item.id ? "bg-white/5 border border-white/10 text-primary" : "opacity-50 hover:opacity-100 hover:bg-white/5"}
                    `}
                  >
                    <item.icon className={`size-4 ${activeView === item.id ? "text-primary" : ""}`} />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/5 p-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-0">
            <AvatarFallback className="bg-gradient-to-tr from-primary to-[#8E6D21] text-black font-bold">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col truncate">
             <p className="truncate text-sm font-medium">{user?.displayName || "User"}</p>
             <p className="truncate text-[10px] text-primary uppercase tracking-wider font-bold">{user?.role || "Platinum Member"}</p>
          </div>
          <Button variant="ghost" size="icon" className="size-8 hover:bg-white/5 text-muted-foreground hover:text-primary" onClick={() => signOut(auth)}>
            <LogOut className="size-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
