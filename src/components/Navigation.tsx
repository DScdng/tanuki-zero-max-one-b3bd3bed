import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { posthog } from '@/lib/posthog-client';
import hedgehogVsTanukiLogo from '@/assets/hedgehog-vs-tanuki-logo.png';

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
    { id: 'disclaimer', label: 'Disclaimer and Feedback' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img 
              src={hedgehogVsTanukiLogo} 
              alt="Hedgehog vs Tanuki Fight Club Logo" 
              className="h-8 w-8 object-contain"
            />
            <h1 className="text-lg md:text-xl font-bold text-primary tracking-tight hidden sm:block">
              Transparency Fight Club
            </h1>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    posthog.capture('navigation_click', { to_page: item.id, from_page: currentPage });
                    onPageChange(item.id);
                  }}
                  className="transition-all duration-200 hover:bg-accent text-xs font-medium px-2 py-1 h-8 rounded-md"
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
                  posthog.capture('navigation_click', { to_page: e.target.value, from_page: currentPage });
                  onPageChange(e.target.value);
                }}
                className="bg-card border border-border rounded-md px-2 py-1 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary h-8"
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