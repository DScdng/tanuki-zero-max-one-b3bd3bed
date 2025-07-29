import { supabase } from '@/integrations/supabase/client'

// Track event via Supabase Edge Function AND store locally for real-time stats
export const trackEvent = async (eventName: string, properties?: Record<string, any>) => {
  const eventData = {
    ...properties,
    $lib: 'custom',
    $lib_version: '1.0.0',
    distinct_id: crypto.randomUUID(), // You can replace this with user ID if you have auth
  };

  try {
    // Store in Supabase analytics table for real-time stats
    const { error: insertError } = await supabase.from('analytics_events').insert({
      event_name: eventName,
      properties: eventData
    });

    if (insertError) {
      console.error('Error storing analytics event locally:', insertError);
    }

    // Send to PostHog via edge function
    const { data, error } = await supabase.functions.invoke('posthog-track', {
      body: {
        event: eventName,
        properties: eventData
      }
    });

    if (error) {
      console.error('PostHog tracking error:', error);
    }
    
    return data;
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

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

export const trackCharlesGradeOld = (grade: 'passed' | 'not_yet') => {
  trackEvent('charles_grade_old', { grade })
}

// Navigation tracking
export const trackNavigationClick = (page: string, fromPage: string) => {
  trackEvent('navigation_click', { to_page: page, from_page: fromPage })
}

// Button and interaction tracking
export const trackButtonClick = (buttonName: string, location: string, additionalData?: Record<string, any>) => {
  trackEvent('button_click', { 
    button_name: buttonName, 
    location,
    ...additionalData
  })
}

export const trackLinkClick = (linkName: string, destination: string, isExternal: boolean) => {
  trackEvent('link_click', { 
    link_name: linkName, 
    destination,
    is_external: isExternal
  })
}

export const trackSwitchToggle = (switchName: string, isEnabled: boolean, location: string) => {
  trackEvent('switch_toggle', { 
    switch_name: switchName, 
    is_enabled: isEnabled,
    location
  })
}

// Arena game specific tracking
export const trackArenaGameStart = () => {
  trackEvent('arena_game_start')
}

export const trackArenaGameReset = () => {
  trackEvent('arena_game_reset')
}

export const trackArenaCharacterClick = (character: 'max' | 'tanuki', currentOpacity: number) => {
  trackEvent('arena_character_click', { 
    character, 
    current_opacity: currentOpacity 
  })
}

export const trackArenaHandbookClick = (winner: 'max' | 'tanuki') => {
  trackEvent('arena_handbook_click', { winner })
}

// Zero to One page tracking
export const trackMaxExplainsClick = () => {
  trackEvent('max_explains_click')
}

export const trackQuoteCardHover = (quoteIndex: number, quoteText: string) => {
  trackEvent('quote_card_hover', { 
    quote_index: quoteIndex,
    quote_preview: quoteText.substring(0, 50) + '...'
  })
}

// About page tracking
export const trackInteriorDesignModeToggle = (isEnabled: boolean) => {
  trackEvent('interior_design_mode_toggle', { is_enabled: isEnabled })
}

// Versions page tracking
export const trackVersionLinkClick = (version: 'v0' | 'v1', linkType: 'live' | 'github') => {
  trackEvent('version_link_click', { version, link_type: linkType })
}

// Advanced interaction tracking
export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page_name: pageName })
}

export const trackTimeSpent = (pageName: string, timeSpentSeconds: number) => {
  trackEvent('time_spent_on_page', { 
    page_name: pageName, 
    time_spent_seconds: timeSpentSeconds 
  })
}

export const trackScrollDepth = (pageName: string, scrollPercentage: number) => {
  trackEvent('scroll_depth', { 
    page_name: pageName, 
    scroll_percentage: scrollPercentage 
  })
}

export const trackArenaClick = (clickType: string, additionalData?: Record<string, any>) =>
  trackEvent('arena_click', { click_type: clickType, ...additionalData });

export const trackCharlesGrade = (grade: 'thumbs_up' | 'thumbs_down', additionalData?: Record<string, any>) =>
  trackEvent('charles_grade', { grade, ...additionalData });

export const trackGameStart = (gameType: string, additionalData?: Record<string, any>) =>
  trackEvent('game_start', { game_type: gameType, ...additionalData });

export const trackGameEnd = (gameType: string, result: 'win' | 'loss', additionalData?: Record<string, any>) =>
  trackEvent('game_end', { game_type: gameType, result, ...additionalData });

export const trackFeatureFlagView = (flagName: string, flagValue: boolean, additionalData?: Record<string, any>) =>
  trackEvent('feature_flag_view', { flag_name: flagName, flag_value: flagValue, ...additionalData });

export const trackExperimentView = (experimentName: string, variant: string, additionalData?: Record<string, any>) =>
  trackEvent('experiment_view', { experiment_name: experimentName, variant, ...additionalData });

export const trackRageClick = (element: string, clickCount: number, additionalData?: Record<string, any>) =>
  trackEvent('rage_click', { element, click_count: clickCount, ...additionalData });