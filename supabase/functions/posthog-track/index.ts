import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { event, properties } = await req.json()
    
    const posthogApiKey = Deno.env.get('POSTHOG_API_KEY')
    if (!posthogApiKey) {
      throw new Error('PostHog API key not configured')
    }

    // Send event to PostHog
    const response = await fetch('https://app.posthog.com/capture/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: posthogApiKey,
        event,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`PostHog API error: ${response.status}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error tracking event:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})