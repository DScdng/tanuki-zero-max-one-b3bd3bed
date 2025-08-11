import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
  isActive?: boolean;
}

interface DocsLayoutProps {
  children: React.ReactNode;
  navigation: NavItem[];
  tableOfContents?: Array<{ title: string; href: string; level: number }>;
}

export function DocsLayout({ children, navigation, tableOfContents }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['overview', 'connecting-data-sources']));

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.items && item.items.length > 0;
    const isExpanded = expandedItems.has(item.title.toLowerCase().replace(/\s+/g, '-'));
    const itemKey = item.title.toLowerCase().replace(/\s+/g, '-');

    return (
      <div key={itemKey} className="w-full">
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer transition-colors",
            level > 0 && "ml-4",
            item.isActive ? "bg-primary/20 text-primary font-medium" : "text-sidebar-text hover:bg-sidebar-accent/20 hover:text-sidebar-accent",
            hasChildren && "justify-between"
          )}
          onClick={() => hasChildren ? toggleExpanded(itemKey) : undefined}
        >
          <span className="flex-1">{item.title}</span>
          {hasChildren && (
            isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.items?.map(subItem => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar-bg border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">K</span>
            </div>
            <span className="font-semibold text-sidebar-text">kapa.ai</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-sidebar-text hover:text-sidebar-accent"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
          {navigation.map(item => renderNavItem(item))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center gap-4 px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <nav className="hidden lg:flex items-center text-sm text-muted-foreground">
              <span>Documentation</span>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span>API reference</span>
            </nav>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-sm">
                Support ↗
              </Button>
              <Button variant="ghost" size="sm" className="text-sm">
                kapa.ai ↗
              </Button>
              <Button variant="ghost" size="sm" className="text-sm">
                Request Demo ↗
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground">
                <span className="mr-2">K</span>
                Ask AI
              </Button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Main content area */}
          <main className="flex-1 px-6 py-6 max-w-4xl">
            {children}
          </main>

          {/* Table of contents */}
          {tableOfContents && tableOfContents.length > 0 && (
            <aside className="hidden xl:block w-64 p-6">
              <div className="sticky top-24">
                <h4 className="font-semibold text-sm mb-4 text-foreground">On this page</h4>
                <nav className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className={cn(
                        "block text-sm transition-colors hover:text-primary",
                        item.level === 1 ? "font-medium text-foreground" : "text-muted-foreground pl-4"
                      )}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}