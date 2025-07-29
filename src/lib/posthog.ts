import posthog from 'posthog-js'

// Initialize PostHog (if not already done in index.html)
if (typeof window !== 'undefined') {
  posthog.init('phc_your_api_key_here', {
    api_host: 'https://app.posthog.com',
  })
}

// Event tracking functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties)
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

export default posthog