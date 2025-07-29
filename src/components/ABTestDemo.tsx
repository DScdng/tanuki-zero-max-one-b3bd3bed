import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { posthog } from '@/lib/posthog-client';

const ABTestDemo = () => {
  const [variant, setVariant] = useState<string>('control');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExperiment = () => {
      const titleVariant = posthog.getFeatureFlag('title_experiment');
      setVariant(titleVariant as string || 'control');
      setLoading(false);
    };

    // Wait for PostHog to load
    if (posthog.__loaded) {
      checkExperiment();
    } else {
      posthog.onFeatureFlags(() => {
        checkExperiment();
      });
    }
  }, []);

  const getTitleByVariant = (variant: string) => {
    switch (variant) {
      case 'tanuki_wars':
        return "Tanuki vs Max: Transparency Wars";
      case 'fight_club_alt':
        return "Max's Ultimate Transparency Challenge";
      default:
        return "Max's Transparency Fight Club";
    }
  };

  const getDescription = (variant: string) => {
    switch (variant) {
      case 'tanuki_wars':
        return "This version emphasizes the competitive aspect between Max and GitLab's Tanuki.";
      case 'fight_club_alt':
        return "This version focuses on the challenge and ultimate nature of transparency.";
      default:
        return "This is the original, control version of the title.";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading A/B test...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          A/B Test Demo
          <Badge variant="outline">Variant: {variant}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/5 rounded-lg border">
          <h3 className="text-xl font-bold text-primary mb-2">
            {getTitleByVariant(variant)}
          </h3>
          <p className="text-sm text-muted-foreground">
            {getDescription(variant)}
          </p>
        </div>
        
        <div className="text-sm space-y-2">
          <p><strong>Experiment:</strong> <code>title_experiment</code></p>
          <p><strong>Your variant:</strong> <code>{variant}</code></p>
          <p>Each visitor sees a different title based on PostHog's A/B testing. Charles, refresh a few times to see different variants!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ABTestDemo;