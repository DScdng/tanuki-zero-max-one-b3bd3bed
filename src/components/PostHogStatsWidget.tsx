import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const PostHogStatsWidget = () => {
  const [stats, setStats] = useState({
    eventsCapture: 1234,
    maxWins: 89,
    clicksTracked: 567,
    sliderMoves: 234
  });
  const [loading, setLoading] = useState(true);

  const fetchRealStats = async () => {
    try {
      console.log('🔄 Fetching PostHog stats...');
      const { data, error } = await supabase.functions.invoke('posthog-stats');
      
      if (error) {
        console.error('❌ Error fetching PostHog stats:', error);
      } else if (data?.stats) {
        console.log('✅ PostHog stats received:', data.stats);
        setStats(data.stats);
      } else {
        console.log('⚠️ No stats data returned:', data);
      }
    } catch (error) {
      console.error('💥 Error calling PostHog stats function:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchRealStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-r from-[#F54E00]/10 to-primary/10 border-[#F54E00]/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-lg font-bold text-[#F54E00]">
          🦔 Powered by PostHog Analytics {loading && '(Loading...)'}
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Every slider move, every Tanuki defeat, and every boost button is tracked by PostHog. This isn't just a demo — it's a live analytics playground.
        </p>
        <div className="text-center mt-2 space-x-2">
          <button 
            onClick={() => {
              console.log('🧪 Testing PostHog stats function...');
              setLoading(true);
              fetchRealStats();
            }}
            className="text-xs bg-[#F54E00] text-white px-3 py-1 rounded hover:bg-[#F54E00]/80"
          >
            🔄 Refresh Stats
          </button>
          <button 
            onClick={() => {
              console.log('🧪 Testing PostHog tracking...');
              // Import the tracking function
              import('@/lib/posthog').then(({ trackEvent }) => {
                trackEvent('test_button_clicked', { timestamp: Date.now() });
                console.log('✅ Test event sent to PostHog');
              });
            }}
            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-600/80"
          >
            🧪 Test Tracking
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-secondary p-3 rounded-md">
            <div className="text-2xl font-bold text-primary">{stats.eventsCapture.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Events</div>
          </div>
          <div className="bg-secondary p-3 rounded-md">
            <div className="text-2xl font-bold text-primary">{stats.maxWins.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Max Victories</div>
          </div>
          <div className="bg-secondary p-3 rounded-md">
            <div className="text-2xl font-bold text-primary">{stats.clicksTracked.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">User Clicks</div>
          </div>
          <div className="bg-secondary p-3 rounded-md">
            <div className="text-2xl font-bold text-primary">{stats.sliderMoves.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Slider Moves</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-card border p-3 rounded-md">
            <div className="text-lg font-bold text-green-600">🎯 Navigation</div>
            <div className="text-sm text-muted-foreground">Page transitions tracked</div>
          </div>
          <div className="bg-card border p-3 rounded-md">
            <div className="text-lg font-bold text-blue-600">⚡ Interactions</div>
            <div className="text-sm text-muted-foreground">Button clicks & toggles</div>
          </div>
          <div className="bg-card border p-3 rounded-md">
            <div className="text-lg font-bold text-purple-600">📊 Engagement</div>
            <div className="text-sm text-muted-foreground">Time spent & scroll depth</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground italic">
            📊 Comprehensive tracking: Navigation • Clicks • Scrolling • Time • Arena battles • Link clicks • Toggles
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Updates every 30 seconds • All events sent to PostHog EU
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostHogStatsWidget;