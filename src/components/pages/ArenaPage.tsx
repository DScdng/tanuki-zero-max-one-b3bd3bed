import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import maxVsTanukiHero from '@/assets/max-vs-tanuki-hero.jpg';

const ArenaPage = () => {
  const stats = [
    { label: "Transparency Level", tanuki: "75%", max: "100%", winner: "max" },
    { label: "Open Source Commitment", tanuki: "High", max: "Everything", winner: "max" },
    { label: "Salary Transparency", tanuki: "Bands", max: "Exact Numbers", winner: "max" },
    { label: "Mascot Coolness", tanuki: "Traditional", max: "Sunglasses", winner: "max" },
    { label: "Documentation", tanuki: "Good", max: "Obsessive", winner: "max" },
    { label: "Meme Potential", tanuki: "Solid", max: "Legendary", winner: "max" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Hedgehog Arena</h1>
        <p className="text-xl text-muted-foreground">
          The ultimate transparency showdown
        </p>
      </section>

      {/* Arena Image */}
      <section className="max-w-4xl mx-auto">
        <div className="relative">
          <img 
            src={maxVsTanukiHero} 
            alt="Max vs Tanuki in the transparency arena"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg"></div>
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-xl font-bold text-primary">
              "I was a Tanuki fan, but Max is more transparent!"
            </p>
          </div>
        </div>
      </section>

      {/* Battle Stats */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Battle Statistics</CardTitle>
            <p className="text-center text-muted-foreground">
              A completely unbiased comparison (Max definitely didn't write this)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center p-3 rounded-md hover:bg-secondary/50 transition-colors">
                  <div className="font-semibold">{stat.label}</div>
                  <div className="text-center">
                    <Badge variant="outline" className="w-full justify-center">
                      {stat.tanuki}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge 
                      variant={stat.winner === "max" ? "default" : "outline"}
                      className="w-full justify-center"
                    >
                      {stat.max}
                    </Badge>
                  </div>
                  <div className="text-center">
                    {stat.winner === "max" && <span className="text-primary font-bold">🦔 WINS</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* The Verdict */}
      <section className="max-w-2xl mx-auto text-center">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">The Verdict</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              <strong>Winner: Max the Hedgehog by TKO (Total Knockout of Opacity)</strong>
            </p>
            <p className="text-muted-foreground">
              Don't get me wrong - GitLab's Tanuki was a worthy opponent. They taught the world 
              that transparency could be a competitive advantage. But PostHog's Max? 
              Max took that lesson and ran with it at hedgehog speed.
            </p>
            <div className="bg-secondary p-4 rounded-md">
              <p className="text-sm font-semibold mb-2">Final Score:</p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">Tanuki: 85/100</p>
                  <p className="text-xs text-muted-foreground">Great, but still corporate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">Max: 100/100</p>
                  <p className="text-xs text-primary">Transparency perfection</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8">
        <p className="text-lg text-muted-foreground">
          Ready to join Team Max? 
        </p>
        <p className="text-xl font-bold text-primary mt-2">
          Let's build the future of transparent product analytics together! 🦔🚀
        </p>
      </section>
    </div>
  );
};

export default ArenaPage;