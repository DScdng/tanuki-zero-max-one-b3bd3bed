import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import maxVsTanukiHero from '@/assets/max-vs-tanuki-hero.jpg';
import posthogMaxTryIt from '@/assets/posthog-max-try-it.png';
import godzillaMaxVictory from '@/assets/godzilla-max-victory.png';
import confetti from 'canvas-confetti';

const ArenaPage = () => {
  const [maxOpacity, setMaxOpacity] = useState(0.3);
  const [tanukiOpacity, setTanukiOpacity] = useState(0.3);
  const [gameActive, setGameActive] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);

  const stats = [
    { label: "Transparency Level", tanuki: "75%", max: "100%", winner: "max" },
    { label: "Open Source Commitment", tanuki: "High", max: "Everything", winner: "max" },
    { label: "Salary Transparency", tanuki: "Bands", max: "Exact Numbers", winner: "max" },
    { label: "Mascot Coolness", tanuki: "Traditional", max: "Sunglasses", winner: "max" },
    { label: "Documentation", tanuki: "Good", max: "Obsessive", winner: "max" },
    { label: "Meme Potential", tanuki: "Solid", max: "Legendary", winner: "max" },
  ];

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const clickMax = useCallback(() => {
    if (!gameActive) return;
    const newOpacity = Math.min(maxOpacity + 0.05, 1.0);
    setMaxOpacity(newOpacity);
    
    if (newOpacity >= 1.0) {
      setWinner('max');
      setGameActive(false);
      triggerConfetti();
    }
  }, [maxOpacity, gameActive, triggerConfetti]);

  const resetGame = useCallback(() => {
    setMaxOpacity(0.3);
    setTanukiOpacity(0.3);
    setGameActive(false);
    setGameStarted(false);
    setCountdown(3);
    setWinner(null);
  }, []);

  useEffect(() => {
    if (!gameStarted && !winner) {
      const timer = setTimeout(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else {
          setGameActive(true);
          setGameStarted(true);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [countdown, gameStarted, winner]);

  useEffect(() => {
    if (!gameActive) return;
    
    const interval = setInterval(() => {
      setTanukiOpacity(prev => {
        const newOpacity = Math.min(prev + 0.03, 1.0);
        if (newOpacity >= 1.0) {
          setWinner('tanuki');
          setGameActive(false);
        }
        return newOpacity;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [gameActive]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Hedgehog Arena</h1>
        <p className="text-xl text-muted-foreground">
          The ultimate transparency showdown
        </p>
      </section>

      {/* Click Battle Game */}
      <section className="max-w-4xl mx-auto mb-8">
        <Card className="p-6 relative">
          {/* Play Again Button - Top Right */}
          {winner && (
            <Button 
              onClick={resetGame} 
              variant="outline" 
              className="absolute top-4 right-4 z-20"
              size="sm"
            >
              🔄 Play Again
            </Button>
          )}
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">🥊 Transparency Battle!</CardTitle>
            <p className="text-muted-foreground">Click to make Max more transparent before Tanuki wins automatically!</p>
          </CardHeader>
          <CardContent>
            {/* Countdown Display */}
            {!gameStarted && !winner && (
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-primary animate-pulse mb-4">
                  {countdown}
                </div>
                <p className="text-xl text-muted-foreground">Battle starting in...</p>
              </div>
            )}

            {/* Game Active Message */}
            {gameStarted && gameActive && !winner && (
              <div className="text-center mb-6">
                <p className="text-lg font-bold text-primary animate-pulse">
                  🔥 BATTLE IN PROGRESS! 🔥
                </p>
                <p className="text-sm text-muted-foreground">Click the button to boost Max!</p>
              </div>
            )}

            <div className="flex justify-center items-center gap-16 mb-8">
              {/* Tanuki */}
              <div className="text-center flex-1">
                <div 
                  className="w-24 h-24 mb-4 transition-opacity duration-300 flex items-center justify-center mx-auto"
                  style={{ opacity: tanukiOpacity }}
                >
                  <img 
                    src="/lovable-uploads/1da7b2b5-a55a-42c4-bc6d-86345a46a1c1.png" 
                    alt="GitLab Tanuki" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-lg font-semibold">Tanuki</p>
                <p className="text-sm text-muted-foreground text-center">
                  "Yeah, GitLab used a scary logo back in time"
                </p>
                <p className="text-sm text-muted-foreground">
                  Transparency: {Math.round(tanukiOpacity * 100)}%
                </p>
              </div>

              <div className="text-4xl">⚡</div>

              {/* Max */}
              <div className="text-center flex-1">
                <div 
                  className="w-24 h-24 mb-4 transition-opacity duration-300 flex items-center justify-center mx-auto"
                  style={{ opacity: maxOpacity }}
                >
                  <img 
                    src={posthogMaxTryIt} 
                    alt="PostHog Max with TRY IT sign" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-lg font-semibold">Max</p>
                <p className="text-sm text-muted-foreground">
                  Not scared away!
                </p>
                <p className="text-sm text-muted-foreground">
                  Transparency: {Math.round(maxOpacity * 100)}%
                </p>
                <Button 
                  onClick={clickMax}
                  disabled={!gameActive}
                  className={`mt-2 ${gameActive && !winner ? 'fast-pulse bg-primary hover:bg-primary/90' : ''}`}
                  size="lg"
                >
                  🚀 Boost Max!
                </Button>
              </div>
            </div>

            {/* Winner Message - Overlay */}
            {winner && (
              <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="text-center max-w-md">
                  {winner === 'max' ? (
                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="mb-4">
                        <img 
                          src="/lovable-uploads/625f3ded-cf05-45a5-a01e-261ded14832a.png" 
                          alt="Godzilla Max dominating the city" 
                          className="w-48 h-48 mx-auto object-contain"
                        />
                      </div>
                      <p className="text-2xl mb-2">🎉 Max Wins! Strong PostHog beats scary Tanuki!</p>
                      <p className="text-lg mb-4">Transparency achieved!</p>
                      <Button 
                        onClick={() => window.open('https://posthog.com/handbook', '_blank')}
                        className="mr-2"
                      >
                        Go to PostHog Handbook
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <p className="text-2xl mb-2">😈 Tanuki Wins!</p>
                      <Button 
                        variant="destructive"
                        onClick={() => window.open('https://about.gitlab.com/handbook/', '_blank')}
                        className="mr-2"
                      >
                        Visit GitLab Handbook
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
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
