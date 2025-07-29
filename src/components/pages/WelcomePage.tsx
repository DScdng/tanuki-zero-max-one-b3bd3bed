import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import godzillaMaxVictory from '@/assets/godzilla-max-victory.png';

interface WelcomePageProps {
  onNavigate: (page: string) => void;
}

const WelcomePage = ({ onNavigate }: WelcomePageProps) => {
  const pages = [
    {
      id: 'home',
      title: 'Home',
      description: 'Meet the rivals: GitLab\'s Tanuki vs PostHog\'s Max (transparency showdown).'
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'My career path and why I\'m ready to join Team Max.'
    },
    {
      id: 'zero-to-one',
      title: 'Zero-to-One Playground',
      description: 'My take on 0→1 thinking, AI, and vibe coding.'
    },
    {
      id: 'versions',
      title: 'Version 0 vs Version 1',
      description: 'How I built this app: 3-hour manual attempt vs AI-powered magic.'
    },
    {
      id: 'arena',
      title: 'Hedgehog Arena',
      description: 'The ultimate click battle: can you beat Tanuki?'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Intro Story Section */}
      <section className="py-2 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg border border-border/50 mb-12">
            <p className="text-lg text-foreground leading-relaxed">
              This whole project started because of <a href="https://www.linkedin.com/in/wololo/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Charles Cook's</a> legendary LinkedIn quiz — <a href="https://dictatorortechbro.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">'Tech Bro or Dictator?'</a> I proudly scored… 2 out of 8. His response? 'You've clearly never read Zero to One.' He was right. I grabbed the book — my first real read in a while — and it completely changed how I think about building and learning.
            </p>
            <p className="text-lg text-foreground leading-relaxed mt-4">
              This app is my personal 0→1 experiment. From GitLab's Tanuki (fun fact: not a fox but a Japanese raccoon dog!) to PostHog's Max, from the old internet to LLMs, from brute-force coding to vibe coding with AI, this project reflects everything I've researched, prepped, and learned along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">Max's Transparency Fight Club</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Where hedgehogs beat raccoon dogs (and everyone else) in transparency — every time.
          </p>
          
          {/* Narrative Section */}
          <div className="max-w-4xl mx-auto mb-12 bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-border/50">
            <p className="text-lg text-foreground leading-relaxed">
              "This isn't just a web app. It's my HogFlix moment — a creative resume, a love letter to PostHog's weird and transparent culture, and a playful way of saying: I'm ready to go from Tanuki to Max."
            </p>
          </div>

          {/* CTA Section */}
          <Button 
            size="lg" 
            onClick={() => onNavigate('home')}
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground mb-4"
          >
            Start the Experience
          </Button>
          <p className="text-muted-foreground">
            Explore transparency battles, AI-powered experiments, and my journey from GitLab → Respondo → Humanitec → PostHog (next!).
          </p>
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
            "Max's Transparency Fight Club isn't just about transparency — it's about building boldly, having fun, and turning research into something real. See you on Superday, Max!"
          </p>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;