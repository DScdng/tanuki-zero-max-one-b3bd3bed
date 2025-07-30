import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase, isSupabaseConfigured, type FeedbackSubmission } from '@/lib/supabase';
import { toast } from 'sonner';
import { posthog } from '@/lib/posthog-client';


interface DisclaimerPageProps {
  onNavigate: (page: string) => void;
}

const DisclaimerPage = ({ onNavigate }: DisclaimerPageProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    sandwich: '',
    feedback: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charlesGrade, setCharlesGrade] = useState<string | null>(null);

  // Target date: Thursday, July 31, 2025, at 15:00 CEST
  const targetDate = new Date('2025-07-31T15:00:00+02:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    // Load Charles' grade from localStorage
    const savedGrade = localStorage.getItem('charlesGrade');
    setCharlesGrade(savedGrade);

    return () => clearInterval(timer);
  }, [targetDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If Supabase is not configured, fall back to alert
    if (!isSupabaseConfigured || !supabase) {
      toast.success("Thanks, Charles! Max approves your feedback. 🦔 (Note: Supabase not configured - feedback not saved)");
      setFormData({ name: '', sandwich: '', feedback: '' });
      setIsSubmitting(false);
      return;
    }

    try {
      const submission: FeedbackSubmission = {
        name: formData.name || null,
        sandwich_type: formData.sandwich,
        feedback: formData.feedback
      };

      const { error } = await supabase
        .from('charlse\'s feedback')
        .insert([submission]);

      if (error) {
        throw error;
      }

      toast.success("Thanks, Charles! Max approves your feedback. 🦔");
      setFormData({ name: '', sandwich: '', feedback: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error("Oops! Something went wrong. Max is investigating...");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCharlesGrade = (grade: 'passed' | 'not_yet') => {
    localStorage.setItem('charlesGrade', grade);
    setCharlesGrade(grade);
    posthog.capture('charles_grade_old', { grade });
    toast.success(`Charles' grade has been saved: ${grade === 'passed' ? '👍 Passed!' : '👎 Not Yet!'}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 flex items-center justify-center gap-3">
            🦔 Disclaimer (Bad Humor Included)
          </h1>
        </section>

        {/* Intro Text */}
        <section>
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardContent className="p-8">
              <p className="text-lg text-foreground leading-relaxed italic">
                This project is purely for fun; a creative, slightly unhinged resume experiment. No hedgehogs, raccoon dogs, or tech executives were harmed in the making of this site (yet).
              </p>
              <p className="text-lg text-foreground leading-relaxed italic mt-4">
                All mentions of Charles Cook, PostHog, GitLab, and Tanuki are fictional tributes. They are not officially associated with this app; unless, of course, on Thursday, July 31st, 2025, at my interview with Charles, he decides otherwise.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Humorous Note */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-primary font-semibold">
                If you're reading this, Charles, sorry in advance for the bad hedgehog puns. I swear it's all done with love, transparency, and a questionable sense of humor.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Interview Countdown Timer */}
        <section>
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-primary">
                🗓️ Interview Countdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-6">
                Interview with Charles starts in:
              </p>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
                  <div className="text-sm text-muted-foreground">Days</div>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-3xl font-bold text-primary">{timeLeft.hours}</div>
                  <div className="text-sm text-muted-foreground">Hours</div>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-3xl font-bold text-primary">{timeLeft.minutes}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-3xl font-bold text-primary">{timeLeft.seconds}</div>
                  <div className="text-sm text-muted-foreground">Seconds</div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Thursday, July 31st, 2025 at 15:00 CEST
              </p>
            </CardContent>
          </Card>
        </section>


        {/* The Real Spin Section */}
        <section>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-[#F54E00]">
                The Real 0→1 Moment: Powered by PostHog
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Everything you've seen here; the Transparency Meter clicks, the Hedgehog Arena battles, even Charles' grading buttons; is being tracked in a real PostHog instance. I wanted this app to do more than show my coding chops; I wanted it to prove I can use PostHog's features (events, funnels, user actions) to measure and improve the experience.
              </p>
              <p className="text-foreground">
                Every counter, every commit log rotation, every victory against Tanuki; all of it is data I can analyze with PostHog. Because that's what the real 1 is: turning fun into insights.
              </p>
              <p className="text-sm text-muted-foreground italic text-center">
                Want to see the live events? (Don't worry, Charles, I anonymized you… mostly 😉).
              </p>
            </CardContent>
          </Card>
        </section>


        {/* Native PostHog Survey - Set up in PostHog Dashboard */}
        <section>
          <div className="bg-gradient-to-br from-[#F54E00]/5 to-[#1D4AFF]/5 border border-primary/20 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Charles' Official Grade Station
            </h3>
            <p className="text-muted-foreground mb-4">
              PostHog native survey will appear here automatically when configured in your PostHog dashboard.
            </p>
            <div className="text-xs text-muted-foreground opacity-75">
              📊 Powered by PostHog Native Surveys
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Setup Instructions:</strong><br/>
                1. Go to PostHog Dashboard → Surveys<br/>
                2. Create "Open feedback" survey<br/>
                3. Target this page with URL targeting<br/>
                4. Survey will automatically appear here
              </p>
            </div>
          </div>
        </section>

        {/* Legacy Grading Buttons (Backup) */}
        <section>
          <Card className="mt-8 bg-secondary/20">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-center text-muted-foreground">
                Legacy Grade System (Backup)
              </CardTitle>
              {charlesGrade && (
                <p className="text-center text-sm font-semibold text-muted-foreground">
                  Last Grade: {charlesGrade === 'passed' ? '👍 You Passed!' : '👎 Not Yet!'}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => handleCharlesGrade('passed')}
                  size="sm"
                  variant="outline"
                  className="text-sm px-4 py-2"
                >
                  👍 Passed (Old System)
                </Button>
                <Button
                  onClick={() => handleCharlesGrade('not_yet')}
                  size="sm"
                  variant="outline"
                  className="text-sm px-4 py-2"
                >
                  👎 Not Yet (Old System)
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center italic">
                This is the old feedback system. Please use the PostHog Survey above for the best experience! 📊
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Back to Home */}
        <section className="text-center py-8">
          <Button 
            onClick={() => onNavigate('home')}
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            🦔 Take me back to Max and Tanuki
          </Button>
        </section>
      </div>
    </div>
  );
};

export default DisclaimerPage;