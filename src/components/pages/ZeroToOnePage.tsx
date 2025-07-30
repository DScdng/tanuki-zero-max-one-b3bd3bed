import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { posthog } from '@/lib/posthog-client';

const ZeroToOnePage = () => {
  // Track page view
  useEffect(() => {
    posthog.capture('page_view', { page_name: 'zero-to-one' });
  }, []);
  const [currentQuote, setCurrentQuote] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  
  const maxQuotes = [
    "0 is reading about transparency. 1 is measuring it with PostHog. (Not sure if James approves, read too many of his statements on vibe coding...)",
    "0 is the Tanuki. 1 is Max's shades.",
    "0 is coding for 100 hours. 1 is vibe coding in 10 mins with Cursor.",
    "0 is manual debugging. 1 is PostHog tracking everything for you.",
    "0→1 means building something that never existed before. Like this app - going from Tanuki transparency to REAL transparency!",
    "Zero to hedgehog, baby! 🦔"
  ];

  const handleMaxExplains = () => {
    posthog.capture('max_explains_click');
    const randomQuote = maxQuotes[Math.floor(Math.random() * maxQuotes.length)];
    setCurrentQuote(randomQuote);
    setShowQuote(true);
    setTimeout(() => setShowQuote(false), 5000);
  };

  return (
    <div className="space-y-12 text-[#151515]">
      {/* Header */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-6 text-[#151515]">Zero-to-One Playground</h1>
        <p className="text-xl text-[#151515]/80 max-w-3xl mx-auto leading-relaxed">
          Where Peter Thiel meets PostHog transparency and Max wears the crown.
        </p>
      </section>

      {/* Intro Story */}
      <section className="max-w-4xl mx-auto">
        <Card className="bg-[#E5E7E0] border-[#151515]/20">
          <CardContent className="p-8">
            <p className="text-lg text-[#151515] leading-relaxed italic">
              "This is where I test the big ideas — the 0→1 moments. It started with Charles' quiz ('Tech Bro or Dictator?'), where I proudly scored 2/8 and was told I clearly hadn't read <em>Zero to One.</em> He was right. I picked it up, and it rewired how I think about building, learning, and yes — even hedgehogs beating raccoon dogs."
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Wisdom from Zero to One */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#151515]">Wisdom from Zero to One (funny rewrite)</h2>
        <div className="grid gap-8">
          
          {/* Contrarian Question */}
          <Card className="bg-white border-[#151515]/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#F54E00]">1. Contrarian Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <blockquote className="text-lg italic text-[#151515] border-l-4 border-[#1D4AFF] pl-4">
                "What important truth do very few people agree with you on?"
              </blockquote>
              <p className="text-[#151515]"><strong>My answer?</strong></p>
              <p className="text-[#151515] font-semibold">"PostHog's Max is cooler than GitLab's Tanuki. And yes, I'll fight you on that."</p>
            </CardContent>
          </Card>

          {/* Vertical vs Horizontal */}
          <Card className="bg-white border-[#151515]/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#F54E00]">2. Vertical vs Horizontal Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#151515]">Horizontal = copying. Vertical = doing something new.</p>
              <ul className="space-y-2 text-[#151515]">
                <li><strong>GitLab:</strong> "We copied the handbook-first idea and made it cool."</li>
                <li><strong>PostHog:</strong> "We strapped sunglasses on Max and went vertical."</li>
                <li><strong>Me:</strong> "I went from 0 (hand-coded HTML pain) to 1 (AI-assisted vibe coding)."</li>
              </ul>
            </CardContent>
          </Card>

          {/* South Koreans PayPal Story */}
          <Card className="bg-white border-[#151515]/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#F54E00]">3. South Koreans PayPal Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#151515]">
                Peter Thiel tells how early PayPal growth was so insane that South Korean investors wired money without even asking for it back. That's the vibe I want for this project — I don't want Charles' feedback refunded, even if it's brutal.
              </p>
              <p className="text-[#151515] italic font-semibold">
                "If Charles likes this app enough to wire me ajvar sandwiches from Serbia, I know I've hit a 0→1 moment."
              </p>
            </CardContent>
          </Card>

          {/* Rivalry */}
          <Card className="bg-white border-[#151515]/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#F54E00]">4. Rivalry – Montagues vs Capulets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#151515]">
                Thiel compares Google vs Microsoft to Romeo & Juliet.
              </p>
              <p className="text-[#151515]">
                Here? <strong className="text-[#1D4AFF]">Max vs. Tanuki = Hedgehog vs. Raccoon Dog.</strong>
              </p>
              <p className="text-[#151515]">
                But instead of dying for love, Max wins by being 110% transparent.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Max's 0→1 Philosophy */}
      <section className="max-w-4xl mx-auto">
        <Card className="bg-[#DC9300]/10 border-[#DC9300]/30">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#151515]">Max's 0→1 Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-[#151515] leading-relaxed">
              <strong>"If GitLab taught me 0, PostHog's AI, culture, and Max's shades took me to 1. 🦔</strong>
            </p>
            <p className="text-[#151515] leading-relaxed">
              Why spend months building what AI can prototype in hours? The real 0→1 is knowing when to use tools like PostHog — every click here is tracked, every transparency level measured."
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Funny Quotes Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#151515]">Funny Quotes Section</h2>
        <div className="space-y-6">
          <Card className="bg-white border-[#151515]/20">
            <CardContent className="p-6">
              <blockquote className="text-lg italic text-[#151515] mb-4 border-l-4 border-[#1D4AFF] pl-4">
                "Brilliant thinking is rare, but courage is in even shorter supply than genius."
              </blockquote>
              <cite className="text-sm text-[#151515]/70">— Peter Thiel</cite>
              <p className="text-[#F54E00] font-semibold mt-2">
                &gt; Like having the courage to send a hedgehog to fight a raccoon dog.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#151515]/20">
            <CardContent className="p-6">
              <blockquote className="text-lg italic text-[#151515] mb-4 border-l-4 border-[#1D4AFF] pl-4">
                "The most contrarian thing is not to oppose the crowd, but to think for yourself."
              </blockquote>
              <p className="text-[#F54E00] font-semibold">
                &gt; My contrarian bet? Hedgehogs &gt; Foxes &gt; Raccoon Dogs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* App v0 to v1 Interactive Demo */}
      <section className="max-w-2xl mx-auto text-center">
        <Card className="bg-[#1D4AFF]/10 border-[#1D4AFF]/30">
          <CardContent className="p-8 space-y-6">
            <Button 
              onClick={handleMaxExplains}
              size="lg"
              className="bg-[#F54E00] hover:bg-[#F54E00]/90 text-white font-bold px-8 py-4 text-lg transition-transform duration-200 hover:scale-105"
            >
              Ask Max What 0→1 Means 🦔
            </Button>
            
            {showQuote && (
              <div className="mt-6 p-6 bg-[#DC9300]/20 border border-[#DC9300]/40 rounded-lg animate-in slide-in-from-bottom duration-300">
                <p className="text-lg font-semibold text-[#151515] italic">
                  🦔 Max says: "{currentQuote}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

    </div>
  );
};

export default ZeroToOnePage;