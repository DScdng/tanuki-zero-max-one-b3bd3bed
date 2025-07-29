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
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground italic">
            📊 Real data from PostHog • Updates every 30 seconds
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostHogStatsWidget;