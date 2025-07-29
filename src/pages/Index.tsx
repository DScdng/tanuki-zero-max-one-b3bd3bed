import { useState, useEffect } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { HedgehogToggleButton, HedgehogCharacter } from '@/components/HedgehogToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import WelcomePage from '@/components/pages/WelcomePage';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ZeroToOnePage from '@/components/pages/ZeroToOnePage';
import VersionsPage from '@/components/pages/VersionsPage';
import ArenaPage from '@/components/pages/ArenaPage';
import PostHogIntegrationPage from '@/components/pages/PostHogIntegrationPage';
import DisclaimerPage from '@/components/pages/DisclaimerPage';
import AdminPage from '@/components/pages/AdminPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [hedgehogVisible, setHedgehogVisible] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={setCurrentPage} />;
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'zero-to-one':
        return <ZeroToOnePage />;
      case 'versions':
        return <VersionsPage />;
      case 'arena':
        return <ArenaPage />;
      case 'posthog-integration':
        return <PostHogIntegrationPage />;
      case 'disclaimer':
        return <DisclaimerPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPage onNavigate={setCurrentPage} />;
      default:
        return <WelcomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <SidebarProvider>
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
