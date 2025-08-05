import { 
  Home, 
  User, 
  Gamepad2, 
  BarChart3, 
  FileText, 
  Lightbulb,
  Calendar
} from "lucide-react";
import { posthog } from '@/lib/posthog-client';
import { Link } from 'react-router-dom';
import hedgehogVsTanukiLogo from '@/assets/hedgehog-vs-tanuki-transparent.png';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  currentPage: string;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/home' },
  { id: 'prep', label: 'Superday Prep', icon: Calendar, path: '/superday-prep' },
  { id: 'about', label: 'About Me', icon: User, path: '/about' },
  { id: 'arena', label: 'Hedgehog Arena', icon: Gamepad2, path: '/arena' },
  { id: 'aha-moment', label: 'AHA Moment', icon: Lightbulb, path: '/aha-moment' },
  { id: 'posthog-integration', label: 'WIP PostHog Demo', icon: BarChart3, path: '/posthog-integration' },
  { id: 'disclaimer', label: 'Disclaimer and Feedback', icon: FileText, path: '/disclaimer' },
];

export function AppSidebar({ currentPage }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <img 
            src={hedgehogVsTanukiLogo} 
            alt="Hedgehog vs Tanuki Fight Club Logo" 
            className="h-10 w-16 object-contain"
          />
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-primary tracking-tight">
                Transparency
              </h1>
              <p className="text-sm text-muted-foreground">Fight Club</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild isActive={currentPage === item.id}>
                    <Link 
                      to={item.path}
                      onClick={() => {
                        posthog.capture('navigation_click', { to_page: item.id, from_page: currentPage });
                      }}
                      className="w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}