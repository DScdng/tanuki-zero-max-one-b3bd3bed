import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { posthog } from '@/lib/posthog-client';

interface TransparencyMeterProps {
  value: number;
  onValueChange: (value: number) => void;
}

const TransparencyMeter = ({ value, onValueChange }: TransparencyMeterProps) => {

  const getTransparencyStatus = (val: number) => {
    if (val <= 30) return { text: "Tanuki Territory 🦝", color: "text-muted-foreground" };
    if (val <= 60) return { text: "Getting There... 🤔", color: "text-posthog-blue" };
    if (val <= 85) return { text: "Max Level Transparency! 🦔✨", color: "text-primary" };
    return { text: "ULTIMATE TRANSPARENCY! 🚀💥", color: "text-primary" };
  };

  const status = getTransparencyStatus(value);

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
          value={[value]}
          onValueChange={(newValue) => {
            const newVal = newValue[0];
            onValueChange(newVal);
            posthog.capture('transparency_slider_moved', { slider_value: newVal });
          }}
          max={100}
          step={1}
          className={`w-full ${value > 85 ? '[&_.slider-thumb]:bg-[#F54E00] [&_.slider-thumb]:border-[#F54E00]' : ''}`}
        />
        <div className="text-center">
          <p className={`text-lg font-semibold ${status.color}`}>
            {status.text}
          </p>
          <p className="text-sm text-muted-foreground">
            Transparency Level: {value}%
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Slide to unlock funnier commits.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransparencyMeter;