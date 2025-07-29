import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TransparencyMeter = () => {
  const [value, setValue] = useState([75]);

  const getTransparencyStatus = (val: number) => {
    if (val < 30) return { text: "Tanuki Territory 🦝", color: "text-muted-foreground" };
    if (val < 70) return { text: "Getting There... 🤔", color: "text-posthog-blue" };
    return { text: "Max Level Transparency! 🦔✨", color: "text-primary" };
  };

  const status = getTransparencyStatus(value[0]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Transparency Meter</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Slide to see who wins (spoiler: PostHog always does)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Slider
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="text-center">
          <p className={`text-lg font-semibold ${status.color}`}>
            {status.text}
          </p>
          <p className="text-sm text-muted-foreground">
            Transparency Level: {value[0]}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransparencyMeter;