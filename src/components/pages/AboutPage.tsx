import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { posthog } from '@/lib/posthog-client';

const AboutPage = () => {
  // Track page view
  useEffect(() => {
    posthog.capture('page_view', { page_name: 'about' });
  }, []);
  const [interiorDesignMode, setInteriorDesignMode] = useState(false);

  return (
    <div className={`space-y-8 transition-all duration-500 ${interiorDesignMode ? 'bg-background' : ''}`}>
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">From Tanuki Fanboy to Max's Transparency Advocate (and Charles' Sandwich Apprentice)</h1>
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
                  My first love. Right out of high school, I was trusted by GitLab's CEO to manage Reddit, HackerNews, and Twitter. I learned the power of open-source and docs-first culture, but transparency had its limits (unlike PostHog's radical handbook obsession).
                </p>
              </div>
              
              <div className="border-l-4 border-posthog-blue pl-4">
                <h3 className="text-lg font-semibold text-posthog-blue">Respondo 💬</h3>
                <p className="text-muted-foreground">
                  I co-founded a startup to centralize user feedback across forums and social media; a kind of 'Transparency as a Service.' It was my first leap from 0 to 1. We didn't have Max's cool sunglasses, though.
                </p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <h3 className="text-lg font-semibold">Humanitec 🚀</h3>
                <p className="text-muted-foreground">
                  Closed €780K ARR with platform engineering teams. Learned that engineers love transparency, hate meetings, and secretly admire anyone who can make their lives simpler; PostHog style.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-primary">PostHog 🦔</h3>
                <p className="text-foreground">
                  <strong>PostHog feels like GitLab's cooler, weirder cousin; obsessed with transparency, culture, and hedgehogs with sunglasses. Max {'>'} Tanuki. Fight me.</strong>
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
              This app is my creative resume; my <strong>HogFlix moment</strong>. 
              A mix of storytelling, vibe coding, and PostHog culture, proving that I'm ready to trade my Tanuki allegiance 
              for a lifetime of hedgehog wisdom (and maybe free PostHog swag).
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
                  posthog.capture('interior_design_mode_toggle', { is_enabled: checked });
                }}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg mb-4">
                Charles lived in Serbia; so obviously, this page is powered by ajvar sandwiches and Balkan hospitality.
              </p>
              <p className="text-lg mb-4">
                <strong>Ajvar {'>'} ketchup. Period.</strong>
              </p>
              <p className="text-lg mb-4">
                If you don't agree, Max's Transparency Meter will judge you.
              </p>
              {interiorDesignMode && (
                <div className="bg-secondary p-4 rounded-md border-l-4 border-primary animate-fade-in">
                  <p className="text-primary font-semibold">Interior Design Mode Activated!</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Would Charles approve this clean, minimalist aesthetic? Probably yes; if it comes with a well-crafted sandwich on the side.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Extra Charles Fun */}
      <section className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Extra Charles Fun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Charles looks at designer houses he'll never live in; so I added an 'Interior Design Mode.' Click it to see a clean, minimalist aesthetic that would make IKEA jealous.
            </p>
            <p className="text-muted-foreground">
              Charles reads 50 books a year. I read Zero to One (finally). That's 1 book, but hey, it's a start; 1 out of 50 is still 0→1.
            </p>
            <p className="text-muted-foreground">
              Charles can hype weird ideas. So I went full weird with this app; hedgehogs, raccoon dogs, confetti, and all.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Closing Line */}
      <section className="max-w-2xl mx-auto text-center">
        <Card>
          <CardContent className="py-8">
            <p className="text-lg italic text-muted-foreground">
              Charles, if you're reading this:<br />
              I promise no hedgehogs were harmed in the making of this page. Max is just sunbathing, waiting for Superday.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AboutPage;