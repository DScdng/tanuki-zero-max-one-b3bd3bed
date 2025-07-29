import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { trackNavigationClick } from '@/lib/posthog';
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
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-lg sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={hedgehogVsTanukiLogo} 
              alt="Hedgehog vs Tanuki Fight Club Logo" 
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight hidden sm:block">
              Transparency Fight Club
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    trackNavigationClick(item.id, currentPage);
                    onPageChange(item.id);
                  }}
                  className="text-xs font-medium"
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
                className="bg-card border border-border rounded-[16px] px-4 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-soft"
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