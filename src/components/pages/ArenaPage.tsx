import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import confetti from 'canvas-confetti';
import { posthog } from '@/lib/posthog-client';
import TransparencyMeter from '@/components/TransparencyMeter';
import FakeCommitHistory from '@/components/FakeCommitHistory';

const ArenaPage = () => {
  // Track page view
  useEffect(() => {
    posthog.capture('page_view', { page_name: 'arena' });
  }, []);
  
  const [maxTransparency, setMaxTransparency] = useState(0.3);
  const [tanukiTransparency, setTanukiTransparency] = useState(0.3);
  const [gameActive, setGameActive] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const battleStats = [
    { label: "Open Source Commitment", tanuki: "75%", max: "100%", winner: "max" },
    { label: "Documentation Quality", tanuki: "Good", max: "Obsessive", winner: "max" },
    { label: "Meme Potential", tanuki: "Solid", max: "Legendary", winner: "max" },
    { label: "Mascot Swag", tanuki: "Traditional", max: "Sunglasses", winner: "max" },
    { label: "Community Vibes", tanuki: "Corporate", max: "Family", winner: "max" },
    { label: "Transparency Score", tanuki: "85%", max: "100%", winner: "max" },
  ];

  // Convert transparency values to percentage for progress bars
  const maxProgress = ((maxTransparency - 0.3) / 0.7) * 100;
  const tanukiProgress = ((tanukiTransparency - 0.3) / 0.7) * 100;

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const clickMax = useCallback(() => {
    if (!gameActive) return;
    posthog.capture('arena_character_click', { character: 'max', current_opacity: maxTransparency });
    const newTransparency = Math.min(maxTransparency + 0.08, 1.0);
    setMaxTransparency(newTransparency);
    
    if (newTransparency >= 1.0) {
      setWinner('max');
      setGameActive(false);
      triggerConfetti();
      posthog.capture('max_wins', { max_opacity: newTransparency, tanuki_opacity: tanukiTransparency });
    }
  }, [maxTransparency, gameActive, triggerConfetti, tanukiTransparency]);

  const clickTanuki = useCallback(() => {
    if (!gameActive) return;
    posthog.capture('arena_character_click', { character: 'tanuki', current_opacity: tanukiTransparency });
    const newTransparency = Math.min(tanukiTransparency + 0.05, 1.0);
    setTanukiTransparency(newTransparency);
    
    if (newTransparency >= 1.0) {
      setWinner('tanuki');
      setGameActive(false);
      posthog.capture('tanuki_wins', { max_opacity: maxTransparency, tanuki_opacity: newTransparency });
    }
  }, [tanukiTransparency, gameActive, maxTransparency]);

  const resetGame = useCallback(() => {
    posthog.capture('arena_game_reset');
    setMaxTransparency(0.3);
    setTanukiTransparency(0.3);
    setGameActive(false);
    setGameStarted(false);
    setCountdown(3);
    setWinner(null);
    setCurrentStat(0);
  }, []);

  useEffect(() => {
    if (!gameStarted && !winner) {
      const timer = setTimeout(() => {
        if (countdown > 1) {
          setCountdown(countdown - 1);
        } else {
          posthog.capture('arena_game_start');
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
      setTanukiTransparency(prev => {
        const newTransparency = Math.min(prev + 0.04, 1.0);
        if (newTransparency >= 1.0) {
          setWinner('tanuki');
          setGameActive(false);
          posthog.capture('tanuki_wins', { max_opacity: maxTransparency, tanuki_opacity: newTransparency });
        }
        return newTransparency;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [gameActive, maxTransparency]);

  // Rotate battle stats every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % battleStats.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-primary">Hedgehog Arena</h1>
        <p className="text-xl text-muted-foreground mb-4">
          The ultimate transparency showdown. Can you click faster than Tanuki's corporate opacity?
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

            {/* Progress Battle Arena */}
            <div className="space-y-8">
              {/* Live Progress Bars */}
              <div className="space-y-6">
                {/* Max Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 transition-opacity duration-300 flex items-center justify-center"
                        style={{ opacity: maxTransparency }}
                      >
                        <img 
                          src="/lovable-uploads/896b5bc5-ab2a-4f03-9999-d2b5652cfaff.png" 
                          alt="PostHog Max hedgehog" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-lg font-bold text-primary">Max</span>
                    </div>
                    <span className="text-lg font-mono text-primary">
                      {Math.round(maxTransparency * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={maxProgress} 
                    className="h-4 bg-secondary/50"
                  />
                </div>

                {/* Battle VS Indicator */}
                <div className="text-center">
                  <span className="text-2xl font-bold text-muted-foreground">⚔️ VS ⚔️</span>
                </div>

                {/* Tanuki Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 transition-opacity duration-300 flex items-center justify-center"
                        style={{ opacity: tanukiTransparency }}
                      >
                        <img 
                          src="/lovable-uploads/1da7b2b5-a55a-42c4-bc6d-86345a46a1c1.png" 
                          alt="GitLab Tanuki" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-lg font-bold text-destructive">Tanuki</span>
                    </div>
                    <span className="text-lg font-mono text-destructive">
                      {Math.round(tanukiTransparency * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={tanukiProgress} 
                    className="h-4 bg-secondary/50 [&>div]:bg-destructive"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-8">
                <Button 
                  onClick={clickMax}
                  disabled={!gameActive}
                  size="lg"
                  className={`px-8 ${gameActive && !winner ? 'animate-pulse shadow-lg shadow-primary/50' : ''}`}
                >
                  🚀 Boost Max!
                </Button>
                <Button 
                  onClick={clickTanuki}
                  disabled={!gameActive}
                  variant="destructive"
                  size="lg"
                  className={`px-8 ${gameActive && !winner ? 'animate-pulse shadow-lg shadow-destructive/50' : ''}`}
                >
                  😈 Boost Tanuki!
                </Button>
              </div>

              {/* Live Battle Stat */}
              {gameStarted && (
                <div className="text-center p-4 bg-secondary/20 rounded-lg border">
                  <div className="text-sm font-semibold text-muted-foreground mb-1">
                    Live Battle Stat
                  </div>
                  <div className="text-lg font-bold">
                    {battleStats[currentStat].label}
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <span className="text-destructive">Tanuki: {battleStats[currentStat].tanuki}</span>
                    <span className="text-primary">Max: {battleStats[currentStat].max}</span>
                  </div>
                </div>
              )}
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
                      <p className="text-lg mb-4">Max says: Transparency unlocked! Here's PostHog's Handbook.</p>
                      <Button 
                        onClick={() => {
                          posthog.capture('arena_handbook_click', { winner: 'max' });
                          window.open('https://posthog.com/handbook', '_blank');
                        }}
                        className="mr-2"
                      >
                        Go to PostHog Handbook
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <p className="text-2xl mb-2">😈 Tanuki Wins!</p>
                      <p className="text-lg mb-4">Tanuki grins: Back to GitLab's handbook for you.</p>
                      <Button 
                        variant="destructive"
                        onClick={() => {
                          posthog.capture('arena_handbook_click', { winner: 'tanuki' });
                          window.open('https://about.gitlab.com/handbook/', '_blank');
                        }}
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

      {/* Dynamic Commit History */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transparency Meter */}
          <div className="space-y-4">
            <TransparencyMeter 
              value={Math.round((maxTransparency + tanukiTransparency) / 2 * 100)} 
              onValueChange={() => {}} 
            />
          </div>
          
          {/* Live Commit History */}
          <div className="space-y-4">
            <FakeCommitHistory 
              transparencyValue={Math.round((maxTransparency + tanukiTransparency) / 2 * 100)} 
            />
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
              {battleStats.map((stat, index) => (
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
