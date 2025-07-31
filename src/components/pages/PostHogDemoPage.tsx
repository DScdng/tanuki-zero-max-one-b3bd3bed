import { PostHogHero } from "../PostHogHero";
import { PostHogProductGrid } from "../PostHogProductGrid";
import { PostHogButton } from "../PostHogButton";
import { PostHogCard } from "../PostHogCard";
import { Badge } from "@/components/ui/badge";
import { posthog } from "@/lib/posthog-client";
import { useEffect, useState } from "react";
import { Sparkles, TrendingUp, Users, Zap, Star, TestTube, FlaskConical } from "lucide-react";

export function PostHogDemoPage() {
  const [showBetaFeatures, setShowBetaFeatures] = useState(false);

  // Track page view and check feature flags
  useEffect(() => {
    posthog.capture('page_view', { page_name: 'posthog-demo' });
    
    // PostHog official way: Check feature flag after ensuring flags are loaded
    posthog.onFeatureFlags(function() {
      const isBetaFeaturesEnabled = posthog.isFeatureEnabled('demo-buttons-test');
      setShowBetaFeatures(isBetaFeaturesEnabled);
      
      // Track which variant user is seeing
      posthog.capture('feature_flag_check', { 
        flag_name: 'demo-buttons-test',
        flag_value: isBetaFeaturesEnabled,
        variant: isBetaFeaturesEnabled ? 'beta_features' : 'experiment_variant'
      });
    });
  }, []);

  const handlePrimaryAction = () => {
    posthog.capture('button_click', { button_name: 'posthog-demo-get-started', location: 'get-started' });
    console.log("Getting started with PostHog-inspired design!");
  };

  const handleSecondaryAction = () => {
    posthog.capture('button_click', { button_name: 'posthog-demo-learn-more', location: 'learn-more' });
    console.log("Learning more about PostHog patterns!");
  };

  // Beta Features group handlers (50% of users)
  const handleTestFeatureFlag = () => {
    posthog.capture('beta_feature_test', { 
      button_name: 'test-feature-flag',
      user_variant: 'beta_features'
    });
    console.log("Testing feature flag functionality!");
  };

  // Experiment Variant group handlers (50% of users)
  const handleCheckExperiment = () => {
    posthog.capture('experiment_test', { 
      button_name: 'check-experiment',
      user_variant: 'experiment_variant'
    });
    console.log("Checking experiment variant!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* PostHog-inspired Hero Section */}
      <PostHogHero
        title="How developers build successful products"
        subtitle="The single platform to analyze, test, observe, and deploy new features"
        description="PostHog provides every tool you need to build a successful product including product analytics, feature flags, session replay, A/B testing, and more."
        primaryAction={{
          text: "Get started - free",
          onClick: handlePrimaryAction
        }}
        secondaryAction={{
          text: "Talk to a human",
          onClick: handleSecondaryAction
        }}
        badge="New: AI-powered insights"
      />

      {/* Feature Flag Demo Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-posthog-blue/5">
        <div className="container max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <TestTube className="w-4 h-4 mr-2" />
            PostHog Feature Flag Demo
          </Badge>
          
          <h2 className="text-3xl font-bold mb-4">
            Feature Flag Testing in Action
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            You're seeing {showBetaFeatures ? 'Beta Features' : 'Experiment Variant'} version (50% split)
          </p>

          {/* Conditional content based on feature flag */}
          {showBetaFeatures ? (
            // Beta Features Group (50% of users)
            <div className="bg-card border rounded-lg p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TestTube className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Beta Features Group</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                You're in the beta features test group! This version shows advanced functionality.
              </p>
              <PostHogButton
                variant="gradient"
                size="lg"
                onClick={handleTestFeatureFlag}
                icon={<TestTube className="w-5 h-5" />}
                showArrow
                className="px-8 py-4"
              >
                Test Feature Flag
              </PostHogButton>
            </div>
          ) : (
            // Experiment Variant Group (50% of users)
            <div className="bg-card border rounded-lg p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FlaskConical className="w-6 h-6 text-posthog-blue" />
                <h3 className="text-xl font-semibold">Experiment Variant Group</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                You're in the experiment variant! This version shows alternative functionality.
              </p>
              <PostHogButton
                variant="secondary"
                size="lg"
                onClick={handleCheckExperiment}
                icon={<FlaskConical className="w-5 h-5" />}
                className="px-8 py-4"
              >
                Check Experiment
              </PostHogButton>
            </div>
          )}
        </div>
      </section>

      {/* Product Grid Section */}
      <PostHogProductGrid />

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              Trusted by developers
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              These folks build products users want with{' '}
              <span className="text-primary">PostHog</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PostHogCard
              title="Y Combinator"
              description="PostHog helped us understand user behavior and optimize our product for better conversion rates."
              badge="Success Story"
              icon={<TrendingUp className="w-5 h-5" />}
              variant="featured"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>10k+ startups</span>
              </div>
            </PostHogCard>

            <PostHogCard
              title="ElevenLabs"
              description="Real-time analytics and feature flags enabled us to ship faster and more confidently."
              badge="Case Study"
              icon={<Zap className="w-5 h-5" />}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>AI-powered</span>
              </div>
            </PostHogCard>

            <PostHogCard
              title="Raycast"
              description="Session replay and user paths helped us create a more intuitive user experience."
              badge="Featured"
              icon={<Users className="w-5 h-5" />}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Growth focused</span>
              </div>
            </PostHogCard>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to build something{' '}
            <span className="bg-gradient-to-r from-primary to-posthog-blue bg-clip-text text-transparent">
              amazing?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of developers who use PostHog to build successful products. 
            Start for free, scale as you grow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PostHogButton
              variant="gradient"
              size="lg"
              onClick={handlePrimaryAction}
              icon={<Sparkles className="w-5 h-5" />}
              showArrow
              className="px-8 py-4 text-lg"
            >
              Start building for free
            </PostHogButton>
            
            <PostHogButton
              variant="ghost"
              size="lg"
              onClick={handleSecondaryAction}
              className="px-8 py-4 text-lg"
            >
              View documentation
            </PostHogButton>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            No credit card required • Setup in under 5 minutes • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}