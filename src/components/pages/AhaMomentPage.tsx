import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { posthog } from '@/lib/posthog-client';

export default function AhaMomentPage() {
  // Track page view
  useEffect(() => {
    posthog.capture('page_view', { page_name: 'aha-moment' });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AHA Moment
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              When I started working on Max's Transparency Fight Club, my goal was simple: turn my 3rd round PostHog interview into something creative, fun, and totally different. I jumped into vibe coding with Lovable because it felt super fast. Within hours, I had a web app with fake A/B tests, custom surveys, and event tracking. I thought I nailed it.
            </p>

            <p>
              But when I looked closer, I realized something was totally wrong. I wasn't actually using PostHog at all. Lovable had rebuilt PostHog features from scratch instead of connecting to the real thing.
            </p>

            <p>
              Instead of showing PostHog's power, I was accidentally building my own analytics platform on top of Supabase with fake dashboards and fake tracking events. The whole point of PostHog (a single, powerful analytics + feature flag + experiment platform) was completely lost. I had overcomplicated something that should have been simple.
            </p>

            <p>
              So I stopped everything. I stripped out all the fake features and rebuilt the app using actual PostHog. Real feature flags, real surveys, real event tracking. Everything managed directly in the PostHog dashboard. That's when it clicked. There's a huge difference between building something that looks cool and building something that actually works.
            </p>

            <p className="font-semibold text-primary text-xl">
              I should have read the PostHog docs way earlier.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}