import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { posthog } from "@/lib/posthog-client";
import { 
  Activity,
  BarChart3, 
  Flag, 
  MessageSquare, 
  Play, 
  Settings,
  TrendingUp,
  Users,
  Eye,
  TestTube
} from "lucide-react";

interface PostHogIntegrationPageProps {
  onNavigate: (page: string) => void;
}

export default function PostHogIntegrationPage({ onNavigate }: PostHogIntegrationPageProps) {
  // State for dynamic iframe height
  const [dashboardHeight, setDashboardHeight] = useState(40);

  // Track page view
  useEffect(() => {
    posthog.capture('page_view', { page_name: 'posthog-integration' });
  }, []);

  // Listen for PostHog iframe height messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.event === 'posthog:dimensions' && e.data.name === 'PostHogDashboard') {
        setDashboardHeight(e.data.height);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Real PostHog feature flag check
  const showBetaFeatures = posthog.isFeatureEnabled('beta-features');
  const experimentVariant = posthog.getFeatureFlag('homepage-experiment');
  const showDemoFeature = posthog.isFeatureEnabled('demo-feature');

  const handleFeatureFlagDemo = () => {
    posthog.capture('button_click', { button_name: 'feature-flag-test', location: 'integration-demo' });
    alert('🚩 This button exists because the feature flag is ENABLED for you!');
  };

  const handleExperimentDemo = () => {
    posthog.capture('button_click', { button_name: 'experiment-test', location: 'integration-demo' });
    const variant = posthog.getFeatureFlag('homepage-experiment');
    alert(`🧪 Experiment variant: ${variant || 'control'} - Notice the button color!`);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <section className="text-center">
          <Badge className="mb-4 bg-[#F54E00] text-white">
            WIP PostHog Demo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            WIP PostHog Features Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This page demonstrates actual PostHog native features - not custom implementations. 
            Everything here connects to real PostHog APIs and dashboard configurations.
          </p>
        </section>

        {/* Real Feature Flags */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-[#F54E00]" />
                Native Feature Flags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Settings className="w-4 h-4" />
                <AlertDescription>
                  <strong>Setup Required:</strong> Create feature flags 'beta-features', 'demo-feature', and 'homepage-experiment' in your PostHog dashboard.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Beta Features Flag</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Current status: <strong>{showBetaFeatures ? 'ENABLED' : 'DISABLED'}</strong>
                  </p>
                  {showBetaFeatures && (
                    <Badge variant="secondary">🎉 Beta features are live!</Badge>
                  )}
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Experiment Variant</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    You are in: <strong>{experimentVariant || 'control'}</strong>
                  </p>
                  <Badge variant="outline">Variant: {experimentVariant || 'control'}</Badge>
                </div>
              </div>

              <div className="flex gap-2">
                {/* Feature Flag: Show button ONLY if flag is enabled */}
                {showDemoFeature && (
                  <Button onClick={handleFeatureFlagDemo} size="sm">
                    🚩 Test Feature Flag
                  </Button>
                )}
                
                {/* Experiment: Same button, different colors based on variant */}
                <Button 
                  onClick={handleExperimentDemo} 
                  variant="outline" 
                  size="sm"
                  className={
                    experimentVariant === 'test' 
                      ? 'bg-green-500 hover:bg-green-600 text-white border-green-500' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
                  }
                >
                  🧪 Check Experiment
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Embedded PostHog Dashboard */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#F54E00]" />
                Native Dashboard Embed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <Eye className="w-4 h-4" />
                <AlertDescription>
                  <strong>Live PostHog Dashboard:</strong> This is your actual PostHog dashboard embedded with dynamic height adjustment.
                </AlertDescription>
              </Alert>
              
              <div className="border rounded-lg overflow-hidden bg-background">
                <iframe
                  name="PostHogDashboard"
                  width="100%"
                  height={dashboardHeight}
                  frameBorder="0"
                  allowFullScreen
                  src="https://eu.posthog.com/embedded/tMmJJpIvPbaI7-VvZEmfLhnzFiHkrQ"
                  className="w-full"
                  title="PostHog Analytics Dashboard"
                />
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                Dashboard height automatically adjusts based on content. All data is live from your PostHog instance.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Native Survey Integration */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#F54E00]" />
                Native Surveys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <MessageSquare className="w-4 h-4" />
                <AlertDescription>
                  <strong>Setup Required:</strong> Create surveys in PostHog dashboard with URL targeting for this page.
                </AlertDescription>
              </Alert>
              
              <div className="bg-gradient-to-br from-[#F54E00]/5 to-[#1D4AFF]/5 rounded-lg p-6 text-center">
                <MessageSquare className="w-12 h-12 text-[#F54E00] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">PostHog Survey Widget</h3>
                <p className="text-muted-foreground mb-4">
                  Native survey widgets will automatically appear on this page when configured in your PostHog dashboard.
                </p>
                <Button 
                  onClick={() => posthog.capture('button_click', { button_name: 'survey-setup-guide', location: 'integration-demo' })}
                  variant="outline"
                  size="sm"
                >
                  View Setup Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Real-time Events */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#F54E00]" />
                Live Event Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <TrendingUp className="w-4 h-4" />
                <AlertDescription>
                  All your interactions on this page are being tracked live in PostHog. Check Events → Live events.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  onClick={() => posthog.capture('button_click', { button_name: 'demo-event-1', location: 'live-tracking' })}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Track Click 1
                </Button>
                <Button 
                  onClick={() => posthog.capture('button_click', { button_name: 'demo-event-2', location: 'live-tracking' })}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Track Click 2
                </Button>
                <Button 
                  onClick={() => posthog.capture('button_click', { button_name: 'demo-event-3', location: 'live-tracking' })}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Track Click 3
                </Button>
                <Button 
                  onClick={() => posthog.capture('button_click', { button_name: 'demo-event-4', location: 'live-tracking' })}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Track Click 4
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Click any button above and check your PostHog dashboard to see the event appear in real-time!
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Setup Instructions */}
        <section>
          <Card className="border-[#F54E00]/20 bg-gradient-to-br from-[#F54E00]/5 to-[#1D4AFF]/5">
            <CardHeader>
              <CardTitle className="text-[#F54E00]">PostHog Native Features Setup Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    Feature Flags
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Go to PostHog → Feature Flags</li>
                    <li>• Create 'beta-features' (boolean)</li>
                    <li>• Create 'demo-feature' (boolean)</li>
                    <li>• Create 'homepage-experiment' (multivariate)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Surveys
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Go to PostHog → Surveys</li>
                    <li>• Create "Open feedback" survey</li>
                    <li>• Set URL targeting for this page</li>
                    <li>• Enable and launch survey</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Dashboard Embed
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Create dashboard in PostHog</li>
                    <li>• Add insights and charts</li>
                    <li>• Share → Embed → Copy iframe</li>
                    <li>• Paste iframe code in component</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TestTube className="w-4 h-4" />
                    A/B Testing
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Go to PostHog → Experiments</li>
                    <li>• Create new experiment</li>
                    <li>• Set control and test variants</li>
                    <li>• Define success metrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation */}
        <section className="text-center py-8">
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              onClick={() => onNavigate('arena')}
              variant="outline"
              size="lg"
            >
              🥊 Back to Hedgehog Arena
            </Button>
            <Button 
              onClick={() => onNavigate('disclaimer')}
              size="lg"
            >
              📋 View Disclaimer & Feedback
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}