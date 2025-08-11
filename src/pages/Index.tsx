import { useLocation } from "react-router-dom";
import WebCrawlingPage from "@/components/pages/WebCrawlingPage";

const Index = () => {
  const location = useLocation();
  
  const renderPage = () => {
    switch (location.pathname) {
      case "/":
      case "/web-crawling":
        return <WebCrawlingPage />;
      default:
        return <WebCrawlingPage />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
};

export default Index;