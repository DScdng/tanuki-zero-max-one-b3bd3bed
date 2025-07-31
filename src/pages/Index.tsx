import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { HedgehogToggleButton, HedgehogCharacter } from '@/components/HedgehogToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import FeatureFlagBanner from '@/components/FeatureFlagBanner';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';


import ArenaPage from '@/components/pages/ArenaPage';
import PostHogIntegrationPage from '@/components/pages/PostHogIntegrationPage';
import DisclaimerPage from '@/components/pages/DisclaimerPage';
import AhaMomentPage from '@/components/pages/AhaMomentPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [hedgehogVisible, setHedgehogVisible] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'arena':
        return <ArenaPage />;
      case 'posthog-integration':
        return <PostHogIntegrationPage onNavigate={setCurrentPage} />;
      case 'disclaimer':
        return <DisclaimerPage onNavigate={setCurrentPage} />;
      case 'aha-moment':
        return <AhaMomentPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <SidebarProvider>
      <FeatureFlagBanner />
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <HedgehogToggleButton isVisible={hedgehogVisible} onToggle={setHedgehogVisible} />
            </div>
          </header>
          
          <main className="flex-1 container mx-auto px-4 py-8">
            {renderPage()}
          </main>
        </div>
      </div>
      
      {/* Hedgehog character - appears when visible */}
      <HedgehogCharacter isVisible={hedgehogVisible} />
    </SidebarProvider>
  );
};

export default Index;