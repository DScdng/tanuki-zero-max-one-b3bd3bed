import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Đorđe's Transparency Fight Club</h1>
          <div className="flex gap-2 flex-wrap">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "outline"}
                onClick={() => {
                  trackNavigationClick(item.id, currentPage);
                  onPageChange(item.id);
                }}
                className="transition-all duration-200 hover:scale-105"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;