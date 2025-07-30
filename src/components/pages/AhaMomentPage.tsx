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
            Real 0→1 AHA Moment
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              When I started working on Max's Transparency Fight Club, my goal was to take my 3rd-round interview at PostHog from 0 to 1 something creative, fun, and undeniably different. I dove straight into 'vibe coding' with Lovable because it felt fast. In just hours, I had a web app running with fake A/B tests, custom surveys, and event tracking. I thought I'd nailed the '1' moment.
            </p>

            <p>
              But here's the twist; when I looked closer, I realized I wasn't really using PostHog at all. Lovable had basically copy-pasted PostHog features and built its own overengineered versions. I was still at zero, just with fancier HTML.
            </p>

            <p>
              So I stopped, stripped out the fake features, and rebuilt the app using PostHog's native power, real feature flags, real surveys, real event tracking, all managed directly in the PostHog dashboard. That's when I understood the difference between building something flashy and building something real.
            </p>

            <p>
              I like to think that's the real 0 to1 moment, not the tool I used to code, but realizing that PostHog itself was the thing I needed to showcase, not replicate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}