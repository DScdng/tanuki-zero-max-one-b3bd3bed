import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageAnalytics } from '@/hooks/useAnalytics';
import LiveStatsWidget from '@/components/LiveStatsWidget';
import FeatureFlagDemo from '@/components/FeatureFlagDemo';
import ABTestDemo from '@/components/ABTestDemo';

const PostHogIntegrationPage = () => {
  usePageAnalytics('posthog-integration');

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          Transparency you can measure — powered by PostHog.
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-[#1D4AFF]/10 border-[#1D4AFF]/30">
            <CardContent className="p-6">
              <p className="text-lg text-muted-foreground">
                Every click, slider move, and page view in this app is tracked with PostHog. 
                Max isn't just transparent; he's observable. During my interview with Charles, 
                I can pull up real-time data to show how this app is being used — because 
                transparency isn't just a joke here, it's a feature.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Live Stats */}
      <section className="max-w-4xl mx-auto">
        <LiveStatsWidget />
      </section>

      {/* Live Event Tracking */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Live Event Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              PostHog is tracking every interaction in real-time. The numbers above show today's activity.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Currently tracking:</strong> page views, scroll depth, navigation clicks, 
                transparency slider moves, arena clicks, time spent on pages, and more.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Session Replay */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Session Replay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              Every rage click on Tanuki's smug face is recorded, just like real product teams 
              use Session Replay to debug user behavior.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm">
                <strong>⚠️ Warning:</strong> Your session is being recorded for transparency reasons. 
                Charles, when you watch the replay later, you'll see exactly how you interacted with this app!
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Session replay data helps understand user behavior patterns and identify UX issues.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Feature Flags */}
      <section className="max-w-4xl mx-auto">
        <FeatureFlagDemo />
      </section>

      {/* A/B Testing */}
      <section className="max-w-4xl mx-auto">
        <ABTestDemo />
      </section>

      {/* Closing */}
      <section className="max-w-3xl mx-auto text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
          <CardContent className="p-8">
            <p className="text-xl font-semibold text-primary">
              PostHog is what makes this app my real 0→1 moment. The rest — Git, coding, 
              AI tools — is still 0. Real 1 is seeing everything in PostHog.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PostHogIntegrationPage;