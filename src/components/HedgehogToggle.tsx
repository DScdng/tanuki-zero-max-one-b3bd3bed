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

interface HedgehogToggleProps {
  isVisible: boolean;
  onToggle: (visible: boolean) => void;
}

export const HedgehogToggleButton = ({ isVisible, onToggle }: HedgehogToggleProps) => {
  return (
    <Button
      onClick={() => onToggle(!isVisible)}
      variant="outline"
      size="icon"
      className="transition-all duration-200 hover:scale-105"
      title={isVisible ? "Hide Hedgehog" : "Show Hedgehog"}
    >
      {isVisible ? <X className="h-[1.2rem] w-[1.2rem]" /> : <Rabbit className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
};

export const HedgehogCharacter = ({ isVisible }: { isVisible: boolean }) => {
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
    return null;
  }

  return (
    <>
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
        {/* Hedgehog character */}
        <div className="w-16 h-16 animate-bounce hover:scale-110 transition-transform select-none">
          <img 
            src="/lovable-uploads/8c441bd3-1728-4b62-943d-9420c4f75288.png"
            alt="PostHog Hedgehog"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
        
        {/* Speech cloud bubble */}
        {showQuote && (
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 animate-fade-in">
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg border border-gray-200/50 dark:border-gray-600/50 max-w-56 text-center">
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">{currentQuote}</div>
              
              {/* Cloud-like bubbles */}
              <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white/80 dark:bg-gray-800/80 rounded-full border border-gray-200/30 dark:border-gray-600/30"></div>
              <div className="absolute -bottom-4 left-4 w-2 h-2 bg-white/70 dark:bg-gray-800/70 rounded-full border border-gray-200/20 dark:border-gray-600/20"></div>
              <div className="absolute -bottom-5 left-2 w-1 h-1 bg-white/60 dark:bg-gray-800/60 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};