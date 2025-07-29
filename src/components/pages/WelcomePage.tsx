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
      description: 'Meet the characters in this transparency battle - GitLab Tanuki vs PostHog Max!'
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'My journey from GitLab → Respondo → Humanitec → PostHog, with transparency lessons learned.'
    },
    {
      id: 'zero-to-one',
      title: 'Zero-to-One Playground',
      description: 'Interactive experiments and creative ideas that showcase technical skills and innovation.'
    },
    {
      id: 'versions',
      title: 'Version 0 vs Version 1',
      description: 'A detailed comparison showing evolution, transparency, and product development insights.'
    },
    {
      id: 'arena',
      title: 'Hedgehog Arena',
      description: 'The ultimate showdown! Interactive game where transparency wins every time.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src={godzillaMaxVictory} 
              alt="Max the Hedgehog" 
              className="w-32 h-32 mx-auto mb-6 object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">Max's Transparency Fight Club</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Where hedgehogs beat foxes in transparency, every time.
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            A creative showcase of my journey from GitLab → Respondo → Humanitec → PostHog, 
            demonstrating humor, technical skill, and PostHog's legendary culture of transparency.
          </p>
          <Button 
            size="lg" 
            onClick={() => onNavigate('home')}
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Start the Experience
          </Button>
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

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to See Transparency in Action?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Dive into the world where hedgehogs reign supreme and transparency always wins
          </p>
          <Button 
            size="lg" 
            onClick={() => onNavigate('home')}
            className="text-lg px-8 py-6"
          >
            Begin the Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;