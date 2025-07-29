import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('PostHog stats function called')
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Query analytics events from Supabase for real stats
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('event_name, properties, created_at')
      .gte('created_at', oneDayAgo.toISOString())
    
    if (error) {
      console.error('Error fetching analytics events:', error)
      throw new Error('Failed to fetch analytics events')
    }
    
    console.log(`Found ${events?.length || 0} events in the last 24 hours`)
    
    // Count specific events
    const maxWins = events?.filter(e => e.event_name === 'max_wins')?.length || 0
    const arenaClicks = events?.filter(e => e.event_name === 'arena_character_click')?.length || 0
    const sliderMoves = events?.filter(e => e.event_name === 'transparency_slider_moved')?.length || 0
    const totalEvents = events?.length || 0
    
    const stats = {
      eventsCapture: totalEvents,
      maxWins: maxWins,
      clicksTracked: arenaClicks,
      sliderMoves: sliderMoves
    }
    
    console.log('Real analytics stats:', stats)
    
    return new Response(
      JSON.stringify({ success: true, stats }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error fetching analytics stats:', error)
    // Return fallback data as backup
    return new Response(
      JSON.stringify({ 
        success: false, 
        stats: {
          eventsCapture: 0,
          maxWins: 0,
          clicksTracked: 0,
          sliderMoves: 0
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  }
})