import TransparencyMeter from '../TransparencyMeter';
import FakeCommitHistory from '../FakeCommitHistory';
import maxVsTanukiHero from '@/assets/max-vs-tanuki-hero.jpg';

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 text-foreground">
          Max's Transparency Fight Club
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The transparent battle between GitLab's Tanuki and PostHog's Max the Hedgehog
        </p>
        
        <div className="relative w-full max-w-4xl mx-auto mb-8">
          <img 
            src="/lovable-uploads/f3fc7c9f-8499-4ff3-b7a2-f1329e01c945.png" 
            alt="Who's More Transparent? GitLab Tanuki vs PostHog Max relaxing in beach chairs"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Interactive Elements */}
      <section className="grid md:grid-cols-2 gap-8 py-8">
        <TransparencyMeter />
        <FakeCommitHistory />
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
          <span className="text-primary font-semibold">See you on Superday, Max!</span> 🦔
        </p>
      </footer>
    </div>
  );
};

export default HomePage;