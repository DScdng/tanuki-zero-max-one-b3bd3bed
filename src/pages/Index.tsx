import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import DocsPage from "@/pages/DocsPage";
import CommunityPage from "@/pages/CommunityPage";
import SupportPage from "@/pages/SupportPage";
import InterviewPage from "@/pages/InterviewPage";
import WebCrawlingPage from "@/components/pages/WebCrawlingPage";

const Index = () => {
  const location = useLocation();
  
  const renderPage = () => {
    switch (location.pathname) {
      case "/":
        return <HomePage />;
      case "/docs":
        return <DocsPage />;
      case "/community":
        return <CommunityPage />;
      case "/support":
        return <SupportPage />;
      case "/interview":
        return <InterviewPage />;
      case "/web-crawling":
        return <WebCrawlingPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {renderPage()}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Powered by{" "}
            <a 
              href="https://kapa.ai" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kapa.ai
            </a>
            {" "}• Built with ❤️ to show time-to-value
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;