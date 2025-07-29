import { useEffect, useRef } from 'react';
import { trackPageView, trackTimeSpent, trackScrollDepth } from '@/lib/posthog';

export const usePageAnalytics = (pageName: string) => {
  const startTimeRef = useRef<number>(Date.now());
  const lastScrollRef = useRef<number>(0);

  useEffect(() => {
    // Track page view
    trackPageView(pageName);
    startTimeRef.current = Date.now();

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercent = Math.round((scrollTop + windowHeight) / documentHeight * 100);
      
      // Only track significant scroll changes (every 25%)
      const significantScrollPoints = [25, 50, 75, 100];
      const currentScrollMilestone = significantScrollPoints.find(point => 
        scrollPercent >= point && lastScrollRef.current < point
      );
      
      if (currentScrollMilestone) {
        trackScrollDepth(pageName, currentScrollMilestone);
        lastScrollRef.current = currentScrollMilestone;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Track time spent when leaving page
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeSpent(pageName, timeSpent);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Track time spent when component unmounts
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 5) { // Only track if spent more than 5 seconds
        trackTimeSpent(pageName, timeSpent);
      }
      
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageName]);
};

export const useClickAnalytics = () => {
  return {
    trackClick: (elementName: string, location: string, additionalData?: Record<string, any>) => {
      trackPageView(`${elementName}_clicked`);
      // You can add more specific tracking here
    }
  };
};