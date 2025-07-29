import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ZeroToOnePage from '@/components/pages/ZeroToOnePage';
import VersionsPage from '@/components/pages/VersionsPage';
import ArenaPage from '@/components/pages/ArenaPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
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
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
