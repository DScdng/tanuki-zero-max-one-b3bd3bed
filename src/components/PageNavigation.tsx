import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Eye } from 'lucide-react';

interface PageSection {
  id: string;
  title: string;
  element?: HTMLElement;
}

interface PageNavigationProps {
  sections: PageSection[];
}

export const PageNavigation = ({ sections }: PageNavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(progress);

      // Show navigation after scrolling a bit
      setIsVisible(scrollTop > 200);

      // Find active section
      const sectionElements = sections.map(section => ({
        ...section,
        element: document.getElementById(section.id)
      })).filter(section => section.element);

      let currentSection = '';
      
      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
            break;
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 max-w-xs">
      <Card className="p-4 bg-background/95 backdrop-blur-sm border-border/50 shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Page Navigation</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{Math.round(scrollProgress)}%</span>
          </div>
          <Progress value={scrollProgress} className="h-2" />
        </div>

        {/* Sections List */}
        <div className="space-y-1 mb-4 max-h-64 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left text-sm px-2 py-1 rounded transition-colors ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={scrollToTop}
            className="flex-1 h-8 text-xs"
          >
            <ChevronUp className="h-3 w-3" />
            Top
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={scrollToBottom}
            className="flex-1 h-8 text-xs"
          >
            <ChevronDown className="h-3 w-3" />
            End
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PageNavigation;