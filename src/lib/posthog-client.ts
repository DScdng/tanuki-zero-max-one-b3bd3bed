import posthog from 'posthog-js';

// Initialize PostHog client for feature flags and A/B testing
if (typeof window !== 'undefined') {
  posthog.init('phc_xGK16Aif0LEU2gVpC6GdkkjYjvnA7Tm2UrKLChlEzl3', {
    api_host: 'https://eu.posthog.com',
    person_profiles: 'identified_only',
    loaded: (posthog) => {
      if (import.meta.env.DEV) posthog.debug();
    },
  });

  // Ensure flags are loaded before usage.
  // You'll only need to call this on the code for when the first time a user visits.
  posthog.onFeatureFlags(function() {
    // feature flags should be available at this point
    if (posthog.getFeatureFlag('demo-feature') === 'test') {
      // Code for users in the 'test' variant
    } else if (posthog.getFeatureFlag('demo-feature') === 'control') {
      // Code for users in the 'control' variant
    }
  });
}

export { posthog };

// Feature flag helpers
export const useFeatureFlag = (flag: string): boolean => {
  if (typeof window === 'undefined') return false;
  return posthog.isFeatureEnabled(flag) || false;
};

// A/B testing helpers
export const getExperimentVariant = (experiment: string): string | null => {
  if (typeof window === 'undefined') return null;
  return posthog.getFeatureFlag(experiment) as string | null;
};