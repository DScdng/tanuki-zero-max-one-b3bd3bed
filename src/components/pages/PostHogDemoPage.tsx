import { PostHogHero } from "../PostHogHero";
import { PostHogProductGrid } from "../PostHogProductGrid";
import { PostHogButton } from "../PostHogButton";
import { PostHogCard } from "../PostHogCard";
import { Badge } from "@/components/ui/badge";
import { usePageAnalytics } from "@/hooks/useAnalytics";
import { trackButtonClick } from "@/lib/posthog";
import { Sparkles, TrendingUp, Users, Zap, Star } from "lucide-react";

export function PostHogDemoPage() {
  usePageAnalytics('posthog-demo');

  const handlePrimaryAction = () => {
    trackButtonClick('posthog-demo-get-started', 'get-started');
    console.log("Getting started with PostHog-inspired design!");
  };

  const handleSecondaryAction = () => {
    trackButtonClick('posthog-demo-learn-more', 'learn-more');
    console.log("Learning more about PostHog patterns!");
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