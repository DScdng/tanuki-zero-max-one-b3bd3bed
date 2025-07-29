import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { posthog } from '@/lib/posthog-client';

const FeatureFlagDemo = () => {
  const [charlesMode, setCharlesMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFlags = () => {
      setCharlesMode(posthog.isFeatureEnabled('charles_mode') || false);
      setLoading(false);
    };

    // Wait for PostHog to load
    if (posthog.__loaded) {
      checkFlags();
    } else {
      posthog.onFeatureFlags(() => {
        checkFlags();
      });
    }
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading feature flags...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={charlesMode ? "bg-gradient-to-r from-red-50 to-yellow-50 border-red-200" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Feature Flag Demo
          <Badge variant={charlesMode ? "default" : "secondary"}>
            {charlesMode ? "Charles Mode ON" : "Charles Mode OFF"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {charlesMode ? (
          <div className="space-y-3">
            <p className="text-lg font-semibold text-red-700">🇷🇸 Charles-in-Serbia Mode Activated!</p>
            <p>Hey Charles! Since you're probably drinking rakija and eating ajvar right now, this special mode is just for you.</p>
            <p className="italic">"Max, your transparency game is strong, but have you tried Serbian hospitality?" 🍷</p>
            <p className="text-sm text-muted-foreground">
              This content is controlled by the <code>charles_mode</code> feature flag in PostHog.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p>Standard mode is active. Charles, if you're reading this, flip the <code>charles_mode</code> feature flag in PostHog to see something special!</p>
            <p className="text-sm text-muted-foreground">
              Feature flag status: <code>charles_mode = false</code>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureFlagDemo;