import { supabase } from '@/integrations/supabase/client'

// Track event via Supabase Edge Function (more secure)
export const trackEvent = async (eventName: string, properties?: Record<string, any>) => {
  try {
    const { data, error } = await supabase.functions.invoke('posthog-track', {
      body: {
        event: eventName,
        properties: {
          ...properties,
          $lib: 'custom',
          $lib_version: '1.0.0',
          distinct_id: crypto.randomUUID(), // You can replace this with user ID if you have auth
        }
      }
    })

    if (error) {
      console.error('PostHog tracking error:', error)
    }
    
    return data
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

export const trackTransparencySliderMoved = (value: number) => {
  trackEvent('transparency_slider_moved', { slider_value: value })
}

export const trackCommitLogRotated = (commitMessage: string, transparencyLevel: number) => {
  trackEvent('commit_log_rotated', { 
    commit_message: commitMessage, 
    transparency_level: transparencyLevel 
  })
}

export const trackHedgehogArenaStarted = () => {
  trackEvent('hedgehog_arena_started')
}

export const trackMaxWins = (maxOpacity: number, tanukiOpacity: number) => {
  trackEvent('max_wins', { 
    max_opacity: maxOpacity, 
    tanuki_opacity: tanukiOpacity 
  })
}

export const trackTanukiWins = (maxOpacity: number, tanukiOpacity: number) => {
  trackEvent('tanuki_wins', { 
    max_opacity: maxOpacity, 
    tanuki_opacity: tanukiOpacity 
  })
}

export const trackStartExperienceClicked = () => {
  trackEvent('start_experience_clicked')
}

export const trackCharlesGrade = (grade: 'passed' | 'not_yet') => {
  trackEvent('charles_grade', { grade })
}