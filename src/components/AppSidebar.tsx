import { 
  Home, 
  User, 
  Play, 
  GitCompare, 
  Gamepad2, 
  BarChart3, 
  FileText, 
  Settings,
  Heart
} from "lucide-react";
import { trackNavigationClick } from '@/lib/posthog';
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
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'welcome', label: 'Welcome', icon: Heart },
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: User },
  { id: 'zero-to-one', label: 'Zero-to-One Playground', icon: Play },
  { id: 'versions', label: 'Version 0 vs Version 1', icon: GitCompare },
  { id: 'arena', label: 'Hedgehog Arena', icon: Gamepad2 },
  { id: 'posthog-integration', label: 'PostHog Integration', icon: BarChart3 },
  { id: 'disclaimer', label: 'Disclaimer and Feedback', icon: FileText },
  { id: 'admin', label: 'Admin', icon: Settings },
];

export function AppSidebar({ currentPage, onPageChange }: AppSidebarProps) {
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
                  <SidebarMenuButton 
                    isActive={currentPage === item.id}
                    onClick={() => {
                      trackNavigationClick(item.id, currentPage);
                      onPageChange(item.id);
                    }}
                    className="w-full"
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.label}</span>}
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