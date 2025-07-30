import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import godzillaMaxVictory from '@/assets/godzilla-max-victory.png';
import { posthog } from '@/lib/posthog-client';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  // Track page view
  useEffect(() => {
    posthog.capture('page_view', { page_name: 'home' });
  }, []);
  const pages = [
    {
      id: 'about',
      title: 'About Me and Charles',
      description: 'My career path and why I\'m ready to join Team Max.'
    },
    {
      id: 'zero-to-one',
      title: 'Zero-to-One Playground',
      description: 'My take on 0→1 thinking, AI, and vibe coding.'
    },
    {
      id: 'arena',
      title: 'Hedgehog Arena',
      description: 'The ultimate transparency battle: can you beat Tanuki?'
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer & Countdown',
      description: 'Legal disclaimers, live countdown timer, and feedback form for Charles.'
    },
    {
      id: 'aha-moment',
      title: 'AHA Moment',
      description: 'The moment everything clicked about PostHog.'
    },
    {
      id: 'posthog-integration',
      title: 'PostHog Demo',
      description: 'Real PostHog analytics integration and features.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">Đorđe's Transparency Fight Club</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            Where hedgehogs beat raccoon dogs (and everyone else) in transparency, every time.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-border/50">
            <p className="text-lg text-foreground leading-relaxed">
              This isn't just a web app. It's my HogFlix 3000 demo moment; a creative resume, a love letter to PostHog's weird and transparent culture, and a playful way of saying: I'm ready to go from Tanuki to Max.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Story Section */}
      <section className="py-2 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg border border-border/50 mb-12">
            <p className="text-lg text-foreground leading-relaxed">
              This whole project started because of <a href="https://www.linkedin.com/in/wololo/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Charles Cook's</a> legendary LinkedIn quiz, <a href="https://dictatorortechbro.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">'Tech Bro or Dictator?'</a> I proudly scored… 2 out of 8. His response? You've clearly never read Zero to One. He was right. I grabbed the book; my first real read in a while, and it completely changed how I think about building and learning.
            </p>
            <p className="text-lg text-foreground leading-relaxed mt-4">
              This app is my personal 0→1 experiment. From GitLab's Tanuki (fun fact: not a fox but a Japanese raccoon dog!) to PostHog's Max, from the old internet to LLMs, from brute-force coding to vibe coding with AI, this project reflects everything I've researched, prepped, and learned along the way.
            </p>
            <p className="text-lg text-foreground leading-relaxed mt-4">
              By the time I wrapped this app, I saw Charles publish Debugger Heart on Linkedin. Should that be my 2nd book out of his 50-books-a-year challenge? Probably not; I'm done reading about debugging love stories. My real 1 (from 0→1) is configuring PostHog here.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-full max-w-xl mx-auto mb-6">
            <img 
              src="/lovable-uploads/f3fc7c9f-8499-4ff3-b7a2-f1329e01c945.png" 
              alt="Who's More Transparent? GitLab Tanuki vs PostHog Max relaxing in beach chairs"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Note to Charles Section */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-primary mb-3">Note to Charles:</h3>
            <p className="text-lg text-foreground leading-relaxed">
              Charles, this entire app is part of my interview prep for you. I want you to explore each page, but save the Disclaimer for last.
            </p>
            <p className="text-lg text-foreground leading-relaxed mt-3">
              Oh, and please open it on your computer or laptop; vibe coding for mobile-native layouts is still a work-in-progress (read: sucks).
            </p>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            What's Inside?
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Explore each section to discover the full transparency battle experience
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Card 
                key={page.id} 
                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-border/50"
                onClick={() => onNavigate(page.id)}
              >
                <CardHeader>
                  <CardTitle className="text-primary text-xl">{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {page.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-foreground leading-relaxed">
            "Đorđe's Transparency Fight Club isn't just about transparency; it's about building boldly, having fun, and turning research into something real. See you on Superday!"
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;