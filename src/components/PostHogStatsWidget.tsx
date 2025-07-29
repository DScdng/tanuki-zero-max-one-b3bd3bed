import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PostHogStatsWidget = () => {
  const [stats, setStats] = useState({
    eventsCapture: 1234,
    maxWins: 89,
    clicksTracked: 567,
    sliderMoves: 234
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        eventsCapture: prev.eventsCapture + Math.floor(Math.random() * 3),
        maxWins: prev.maxWins + (Math.random() > 0.8 ? 1 : 0),
        clicksTracked: prev.clicksTracked + Math.floor(Math.random() * 2),
        sliderMoves: prev.sliderMoves + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-r from-[#F54E00]/10 to-primary/10 border-[#F54E00]/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-lg font-bold text-[#F54E00]">
          🦔 Powered by PostHog Analytics
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Every slider move, every Tanuki defeat, and every boost button is tracked by PostHog. This isn't just a demo — it's a live analytics playground.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-[#F54E00]">{stats.eventsCapture.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Events Captured</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{stats.maxWins}</p>
            <p className="text-xs text-muted-foreground">Max Wins</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.clicksTracked}</p>
            <p className="text-xs text-muted-foreground">Clicks Tracked</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-muted-foreground">{stats.sliderMoves}</p>
            <p className="text-xs text-muted-foreground">Slider Moves</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostHogStatsWidget;