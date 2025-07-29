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
    console.log('PostHog track function called')
    const { event, properties } = await req.json()
    console.log('Event received:', event, 'Properties:', properties)
    
    const posthogApiKey = Deno.env.get('POSTHOG_API_KEY')
    if (!posthogApiKey) {
      console.error('PostHog API key not found')
      throw new Error('PostHog API key not configured')
    }
    console.log('PostHog API key found, length:', posthogApiKey.length)

    // Generate a distinct_id (required by PostHog)
    const distinctId = properties?.distinct_id || crypto.randomUUID()

    // Correct PostHog capture API format
    const payload = {
      api_key: posthogApiKey,
      event,
      properties: {
        ...properties,
        distinct_id: distinctId,
        timestamp: new Date().toISOString(),
      }
    }

    console.log('Sending to PostHog:', payload)

    // Use the correct PostHog capture endpoint (US region)
    const response = await fetch('https://us.i.posthog.com/capture/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    console.log('PostHog response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('PostHog API error:', response.status, errorText)
      throw new Error(`PostHog API error: ${response.status} - ${errorText}`)
    }

    console.log('✅ Event successfully sent to PostHog')
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