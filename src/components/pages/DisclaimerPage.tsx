import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase, isSupabaseConfigured, type FeedbackSubmission } from '@/lib/supabase';
import { toast } from 'sonner';

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
        .from('feedback_submissions')
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
                "This project is purely for fun — a creative, slightly unhinged resume experiment. No hedgehogs, raccoon dogs, or tech executives were harmed in the making of this site (yet).
              </p>
              <p className="text-lg text-foreground leading-relaxed italic mt-4">
                All mentions of Charles Cook, PostHog, GitLab, and Tanuki are fictional tributes. They are not officially associated with this app — unless, of course, on Thursday, July 31st, 2025, at my interview with Charles, he decides otherwise."
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Humorous Note */}
        <section>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-lg text-primary font-semibold">
                "If you're reading this, Charles, sorry in advance for the bad hedgehog puns. I swear it's all done with love, transparency, and a questionable sense of humor."
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

        {/* Feedback Section for Charles */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Charles, leave your thoughts after our chat:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your name here..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sandwich">Favorite sandwich type</Label>
                  <Input
                    id="sandwich"
                    type="text"
                    value={formData.sandwich}
                    onChange={(e) => handleInputChange('sandwich', e.target.value)}
                    placeholder="Ajvar sandwich? Serbian specialty?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    value={formData.feedback}
                    onChange={(e) => handleInputChange('feedback', e.target.value)}
                    placeholder="Your thoughts on the transparency fight club..."
                    className="min-h-32"
                    required
                  />
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                  >
                    {isSubmitting ? "Sending..." : "Send Transparency Feedback"}
                  </Button>
                </div>
              </form>
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