import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Rabbit, X } from 'lucide-react';

const quotes = [
  "Transparency is the key to success!",
  "Data doesn't lie, people do!",
  "Analytics make everything better!",
  "Keep measuring, keep improving!",
  "PostHog makes product teams better!",
  "Feature flags for the win!",
  "A/B testing everything!",
  "User insights drive decisions!",
  "Hedgehogs are the best analytics mascot!",
  "Always be shipping!",
  "Data-driven development rocks!",
  "Track everything, understand anything!",
  "Privacy-friendly analytics FTW!",
  "Self-hosted and proud!",
  "Open source analytics revolution!",
];

interface Position {
  x: number;
  y: number;
}

export const HedgehogToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
  const [currentQuote, setCurrentQuote] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const hedgehogRef = useRef<HTMLDivElement>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout>();

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const showRandomQuote = () => {
    setCurrentQuote(getRandomQuote());
    setShowQuote(true);
    setTimeout(() => setShowQuote(false), 3000);
  };

  const moveRandomly = () => {
    if (isDragging) return;
    
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setPosition({ x: newX, y: newY });
    
    // Show a quote occasionally during movement
    if (Math.random() < 0.3) {
      showRandomQuote();
    }
  };

  useEffect(() => {
    if (isVisible) {
      // Start random movement
      moveIntervalRef.current = setInterval(moveRandomly, 3000 + Math.random() * 2000);
      
      return () => {
        if (moveIntervalRef.current) {
          clearInterval(moveIntervalRef.current);
        }
      };
    }
  }, [isVisible, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = hedgehogRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Show a quote when dropped
    showRandomQuote();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleClick = () => {
    showRandomQuote();
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="ghost"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
        title="Toggle Hedgehog"
      >
        <Rabbit className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <>
      {/* Toggle off button */}
      <Button
        onClick={() => setIsVisible(false)}
        variant="ghost"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
        title="Hide Hedgehog"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Hedgehog character */}
      <div
        ref={hedgehogRef}
        className={`fixed z-40 cursor-grab transition-all duration-1000 ease-in-out ${
          isDragging ? 'cursor-grabbing scale-110' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isDragging ? 'rotate(5deg)' : 'rotate(0deg)',
        }}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {/* Hedgehog emoji as character */}
        <div className="text-4xl animate-bounce hover:scale-110 transition-transform select-none">
          🦔
        </div>
        
        {/* Quote bubble */}
        {showQuote && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg animate-fade-in max-w-48 text-center">
            <div className="text-sm font-medium text-foreground">{currentQuote}</div>
            {/* Speech bubble tail */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
          </div>
        )}
      </div>
    </>
  );
};