import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { HedgehogToggleButton, HedgehogCharacter } from '@/components/HedgehogToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import HomePage from '@/components/pages/HomePage';
import PrepPage from '@/components/pages/PrepPage';
import AboutPage from '@/components/pages/AboutPage';
import ArenaPage from '@/components/pages/ArenaPage';
import PostHogIntegrationPage from '@/components/pages/PostHogIntegrationPage';
import DisclaimerPage from '@/components/pages/DisclaimerPage';
import AhaMomentPage from '@/components/pages/AhaMomentPage';

const Index = () => {
  const location = useLocation();
  const [hedgehogVisible, setHedgehogVisible] = useState(false);

  // Get current page from URL
  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/':
      case '/home':
        return 'home';
      case '/superday-prep':
        return 'prep';
      case '/about':
        return 'about';
      case '/arena':
        return 'arena';
      case '/posthog-integration':
        return 'posthog-integration';
      case '/disclaimer':
        return 'disclaimer';
      case '/aha-moment':
        return 'aha-moment';
      default:
        return 'home';
    }
  };

  const currentPage = getCurrentPage();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'prep':
        return <PrepPage />;
      case 'about':
        return <AboutPage />;
      case 'arena':
        return <ArenaPage />;
      case 'posthog-integration':
        return <PostHogIntegrationPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      case 'aha-moment':
        return <AhaMomentPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar currentPage={currentPage} />
        
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