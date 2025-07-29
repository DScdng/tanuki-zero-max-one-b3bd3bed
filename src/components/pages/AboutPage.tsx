import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { trackInteriorDesignModeToggle } from '@/lib/posthog';
import { usePageAnalytics } from '@/hooks/useAnalytics';

const AboutPage = () => {
  usePageAnalytics('about');
  const [interiorDesignMode, setInteriorDesignMode] = useState(false);

  return (
    <div className={`space-y-8 transition-all duration-500 ${interiorDesignMode ? 'bg-background' : ''}`}>
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">From Tanuki Fanboy to Max's Transparency Advocate</h1>
        <p className="text-xl text-muted-foreground">
          My Journey
        </p>
      </section>

      {/* Journey Timeline */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-primary">GitLab 🦝</h3>
                <p className="text-muted-foreground">
                  "My first love. Right out of high school, I was trusted by GitLab's CEO to manage Reddit, HackerNews, and Twitter. I learned the power of open-source and docs-first culture — but transparency had its limits."
                </p>
              </div>
              
              <div className="border-l-4 border-posthog-blue pl-4">
                <h3 className="text-lg font-semibold text-posthog-blue">Respondo 💬</h3>
                <p className="text-muted-foreground">
                  "I built my own startup, helping companies centralize user feedback across forums and social. It was my first leap from 0 to 1."
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <h3 className="text-lg font-semibold">Humanitec 🚀</h3>
                <p className="text-muted-foreground">
                  "Closed €780K ARR by helping engineering teams build Internal Developer Platforms. Learned that engineers love transparency and hate BS."
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-primary">PostHog 🦔</h3>
                <p className="text-foreground">
                  <strong>"PostHog feels like GitLab's cool, weird cousin — transparent, fun, and product-led. Max {'>'}  Tanuki, fight me."</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* HogFlix Moment */}
      <section className="max-w-2xl mx-auto text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">My HogFlix Moment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              This app is my creative resume — my <strong>HogFlix moment</strong>. 
              A fun mix of storytelling, coding, and PostHog culture that shows I'm ready to trade my Tanuki allegiance 
              for a lifetime of hedgehog wisdom.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Charles-in-Serbia Easter Egg */}
      <section className="max-w-2xl mx-auto">
        <Card className={`transition-all duration-500 ${interiorDesignMode ? 'bg-card border-2 border-primary' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Charles-in-Serbia Mode
              <Switch 
                checked={interiorDesignMode}
                onCheckedChange={(checked) => {
                  setInteriorDesignMode(checked);
                  trackInteriorDesignModeToggle(checked);
                }}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              <strong>Charles approves this Serbian sandwich</strong> — Ajvar {'>'}  ketchup. 🥪
            </p>
            {interiorDesignMode && (
              <div className="bg-secondary p-4 rounded-md border-l-4 border-primary animate-fade-in">
                <p className="text-primary font-semibold">Interior Design Mode Activated!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Would Charles approve this clean, minimalist aesthetic? 
                  (Spoiler: He probably would, especially if it comes with good Serbian food.)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AboutPage;