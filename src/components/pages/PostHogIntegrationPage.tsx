import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePageAnalytics } from '@/hooks/useAnalytics';

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

      {/* Live Event Tracking */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Live Event Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              PostHog tracked X slider moves and Y arena clicks today.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Session Replay */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Session Replay</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Every rage click on Tanuki's smug face is recorded, just like real product teams 
              use Session Replay to debug user behavior.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Feature Flags */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Feature Flags</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Interior Design Mode (aka Charles-in-Serbia mode) is behind a PostHog feature flag. 
              Flip it and watch the app switch styles.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* A/B Testing */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">A/B Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Some of you might see the headline "Max's Transparency Fight Club" while others 
              see "Transparency Wars: Max vs Tanuki" — thanks to PostHog experiments.
            </p>
          </CardContent>
        </Card>
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