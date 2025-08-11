import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Menu, X, MessageSquare } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const openKapaWidget = () => {
    if (typeof window !== 'undefined' && (window as any).Kapa) {
      (window as any).Kapa.open();
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Community", href: "/community" },
    { label: "Support", href: "/support" },
    { label: "Dev Mode", href: "/dev" },
    { label: "Case Study", href: "/case-study" },
    { label: "Interview", href: "/interview", badge: "Try Me" },
    { label: "About", href: "/about" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-foreground">Djordje × Kapa.ai</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                  isActive(item.href)
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
                {item.badge && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={openKapaWidget}
              size="sm"
              className="hidden sm:flex bg-primary text-primary-foreground"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask AI
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-border">
                <Button
                  onClick={() => {
                    openKapaWidget();
                    setIsOpen(false);
                  }}
                  size="sm"
                  className="w-full"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;