import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ZeroToOnePage = () => {
  const handleMaxExplains = () => {
    alert("🦔 Max says: '0→1 means building something that never existed before. Like this app - going from Tanuki transparency to REAL transparency! ChatGPT helped me vibe-code this beauty, proving that AI is the ultimate 0→1 multiplier. Zero to hedgehog, baby!' 🚀");
  };

  const quotes = [
    {
      text: "Every moment in business happens only once. The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won't make a search engine.",
      context: "On monopolies and innovation"
    },
    {
      text: "Brilliant thinking is rare, but courage is in even shorter supply than genius.",
      context: "On taking contrarian bets"
    },
    {
      text: "The most contrarian thing of all is not to oppose the crowd but to think for yourself.",
      context: "On independent thinking"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Zero-to-One Playground</h1>
        <p className="text-xl text-muted-foreground">
          Where Peter Thiel meets PostHog transparency
        </p>
      </section>

      {/* Peter Thiel Quotes */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Wisdom from Zero to One</h2>
        <div className="grid gap-6">
          {quotes.map((quote, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <blockquote className="text-lg italic mb-4 text-foreground">
                  "{quote.text}"
                </blockquote>
                <cite className="text-sm text-muted-foreground">
                  — Peter Thiel, on {quote.context}
                </cite>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ChatGPT & Max's Take */}
      <section className="max-w-2xl mx-auto text-center">
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle className="text-2xl">Max's 0→1 Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              <strong>ChatGPT is today's 0→1.</strong> Max approves vibe coding. 🦔
            </p>
            <p className="text-muted-foreground">
              Why spend months building what AI can help you prototype in hours? 
              The real 0→1 is knowing when to leverage the tools that exist.
            </p>
            <Button 
              onClick={handleMaxExplains}
              size="lg"
              className="transition-transform duration-200 hover:scale-105"
            >
              Ask Max what 0→1 means 🦔
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Personal Application */}
      <section className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">My 0→1 Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-muted-foreground">Version 0</h3>
                <p className="text-sm text-muted-foreground">
                  Standard corporate transparency: "We're open... when it's convenient."
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 text-primary">Version 1</h3>
                <p className="text-sm">
                  <strong>PostHog transparency:</strong> "Everything is open. Even our mistakes. Especially our mistakes."
                </p>
              </div>
            </div>
            <div className="text-center pt-4">
              <p className="text-lg">
                <span className="text-primary font-semibold">That's my 0→1:</span> From conditional transparency to radical transparency.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ZeroToOnePage;