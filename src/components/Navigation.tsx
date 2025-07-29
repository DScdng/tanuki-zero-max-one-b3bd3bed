import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { trackNavigationClick } from '@/lib/posthog';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const navItems = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'zero-to-one', label: 'Zero-to-One Playground' },
    { id: 'versions', label: 'Version 0 vs Version 1' },
    { id: 'arena', label: 'Hedgehog Arena' },
    { id: 'posthog-integration', label: 'PostHog Integration' },
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
            Đorđe's Transparency Fight Club
          </h1>
          
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-2 flex-wrap">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "outline"}
                  onClick={() => {
                    trackNavigationClick(item.id, currentPage);
                    onPageChange(item.id);
                  }}
                  className="transition-all duration-300 hover:scale-105 hover:shadow-md text-sm px-3 py-2"
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <select
                value={currentPage}
                onChange={(e) => {
                  trackNavigationClick(e.target.value, currentPage);
                  onPageChange(e.target.value);
                }}
                className="bg-card border border-border rounded-md px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {navItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;