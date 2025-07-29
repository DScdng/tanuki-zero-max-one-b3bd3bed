import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePostHogStats } from '@/hooks/usePostHogStats';
import { RefreshCw } from 'lucide-react';

const LiveStatsWidget = () => {
  const { sliderMoves, arenaClicks, pageViews, totalEvents, loading } = usePostHogStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Live PostHog Analytics
          {loading && <RefreshCw className="h-4 w-4 animate-spin" />}
          <Badge variant="secondary">Real-time</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{sliderMoves}</div>
            <div className="text-sm text-muted-foreground">Slider Moves</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{arenaClicks}</div>
            <div className="text-sm text-muted-foreground">Arena Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{pageViews}</div>
            <div className="text-sm text-muted-foreground">Page Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalEvents}</div>
            <div className="text-sm text-muted-foreground">Total Events</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm">
            <strong>Charles,</strong> these numbers update every 30 seconds. 
            Every click, scroll, and interaction you make is being tracked in real-time! 
            Check your PostHog dashboard to see the events flowing in.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStatsWidget;