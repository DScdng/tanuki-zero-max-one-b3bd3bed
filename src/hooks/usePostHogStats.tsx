import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PostHogStats {
  sliderMoves: number;
  arenaClicks: number;
  pageViews: number;
  totalEvents: number;
  loading: boolean;
}

export const usePostHogStats = (): PostHogStats => {
  const [stats, setStats] = useState<PostHogStats>({
    sliderMoves: 0,
    arenaClicks: 0,
    pageViews: 0,
    totalEvents: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get today's date
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch slider moves
        const { data: sliderData } = await supabase
          .from('analytics_events')
          .select('*')
          .eq('event_name', 'transparency_slider_moved')
          .gte('created_at', today);

        // Fetch arena clicks
        const { data: arenaData } = await supabase
          .from('analytics_events')
          .select('*')
          .eq('event_name', 'arena_click')
          .gte('created_at', today);

        // Fetch page views
        const { data: pageViewData } = await supabase
          .from('analytics_events')
          .select('*')
          .eq('event_name', 'page_view')
          .gte('created_at', today);

        // Fetch total events
        const { data: totalData } = await supabase
          .from('analytics_events')
          .select('*')
          .gte('created_at', today);

        setStats({
          sliderMoves: sliderData?.length || 0,
          arenaClicks: arenaData?.length || 0,
          pageViews: pageViewData?.length || 0,
          totalEvents: totalData?.length || 0,
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching PostHog stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
    
    // Refresh every 30 seconds for live updates
    const interval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return stats;
};