import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Hash, Users, Bot } from "lucide-react";

const CommunityPage = () => {
  const openKapaWidget = () => {
    if (typeof window !== 'undefined' && (window as any).Kapa) {
      (window as any).Kapa.open();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Community</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Community is where questions really happen. Here's how kapa would behave.
        </p>
        <Button onClick={openKapaWidget} className="mb-8">
          <Bot className="mr-2 h-4 w-4" />
          Try the Real Widget
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Slack Simulation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Slack Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              {/* Channel header */}
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <Hash className="h-4 w-4" />
                <span className="font-medium">ask-ai</span>
                <Badge variant="secondary" className="text-xs">47 members</Badge>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center text-xs font-medium">
                    JM
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">jenny.martinez</span>
                      <span className="text-xs text-muted-foreground">2:34 PM</span>
                    </div>
                    <p className="text-sm">@ai what's the API rate limit?</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-kapa-primary/20 rounded-md flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Kapa AI</span>
                      <Badge variant="outline" className="text-xs">BOT</Badge>
                      <span className="text-xs text-muted-foreground">2:34 PM</span>
                    </div>
                    <div className="bg-card p-3 rounded-lg border border-border">
                      <p className="text-sm mb-2">
                        For this site's demo: <strong>60 req/min per IP</strong>. In production, 
                        Kapa typically handles 1000+ req/min with proper rate limiting and caching.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <strong>Sources:</strong> <a href="/docs/dev/api" className="text-primary hover:underline">Dev/API</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-secondary/20 rounded-md flex items-center justify-center text-xs font-medium">
                    MK
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">mike.kim</span>
                      <span className="text-xs text-muted-foreground">2:35 PM</span>
                    </div>
                    <p className="text-sm">Perfect, thanks! 🙏</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Discord Simulation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Discord Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              {/* Discord header */}
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Hash className="h-4 w-4" />
                <span className="font-medium">general-help</span>
              </div>

              {/* Discord thread */}
              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-xs font-medium">
                    AS
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">alexsanders</span>
                      <span className="text-xs text-muted-foreground">Today at 3:42 PM</span>
                    </div>
                    <p className="text-sm mb-2">
                      How do I implement the deflector on my support form? Having trouble with the integration.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 ml-6">
                  <div className="w-8 h-8 bg-kapa-primary/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Kapa Bot</span>
                      <Badge variant="outline" className="text-xs">BOT</Badge>
                      <span className="text-xs text-muted-foreground">Today at 3:42 PM</span>
                    </div>
                    <div className="bg-card p-3 rounded-lg border border-border">
                      <p className="text-sm mb-3">
                        The deflector works by querying Kapa as users type in the subject field. 
                        Here's the basic implementation:
                      </p>
                      <div className="bg-muted/50 p-2 rounded text-xs font-mono mb-3">
                        // Listen for subject input<br/>
                        // Query Kapa API with subject text<br/>
                        // Show suggested answers
                      </div>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="secondary">
                          <a href="/docs/integrations/deflector" className="text-primary">Deflector Guide</a>
                        </Badge>
                        <Badge variant="secondary">
                          <a href="/support" className="text-primary">Live Demo</a>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Note */}
      <div className="mt-8 p-4 bg-card rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> In production, I'd deploy real Slack/Discord bots with proper OAuth and permissions. 
          These simulations show the user experience and response quality you can expect.
        </p>
      </div>
    </div>
  );
};

export default CommunityPage;