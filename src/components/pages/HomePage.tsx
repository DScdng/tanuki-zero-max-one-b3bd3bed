import { useState } from 'react';
import TransparencyMeter from '../TransparencyMeter';
import FakeCommitHistory from '../FakeCommitHistory';
import maxVsTanukiHero from '@/assets/max-vs-tanuki-hero.jpg';

const HomePage = () => {
  const [transparencyValue, setTransparencyValue] = useState(75);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 text-foreground">
          Who's More Transparent?
        </h1>
        <p className="text-2xl text-primary font-semibold mb-4">
          GitLab's Tanuki vs PostHog's Max the Hedgehog
        </p>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          In this fight club, every commit tells a story...
        </p>
        
        <div className="relative w-full max-w-xl mx-auto mb-12">
          <img 
            src="/lovable-uploads/f3fc7c9f-8499-4ff3-b7a2-f1329e01c945.png" 
            alt="Who's More Transparent? GitLab Tanuki vs PostHog Max relaxing in beach chairs"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Interactive Elements */}
      <section className="grid md:grid-cols-2 gap-8 py-8">
        <div>
          <p className="text-center text-muted-foreground mb-4">
            Control transparency to see different commit styles!
          </p>
          <TransparencyMeter 
            value={transparencyValue} 
            onValueChange={setTransparencyValue} 
          />
        </div>
        <FakeCommitHistory transparencyValue={transparencyValue} />
      </section>

      {/* Transparency Philosophy */}
      <section className="bg-card p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary">
          Why Transparency Wins
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-foreground">GitLab Tanuki</h3>
            <p className="text-muted-foreground">
              Great mascot, but transparency comes with conditions and hierarchies.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-primary">PostHog Max</h3>
            <p className="text-foreground">
              <strong>Radical transparency.</strong> Open source, open salary bands, open everything!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-muted-foreground">
        <p className="text-lg">
          <span className="text-primary font-semibold">Max is sunbathing now, waiting for Superday.</span> 🦔
        </p>
      </footer>
    </div>
  );
};

export default HomePage;