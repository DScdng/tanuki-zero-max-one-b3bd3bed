import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageSquare, Search, Zap, Clock, ArrowRight } from "lucide-react";

const HomePage = () => {
  const openKapaWidget = () => {
    if (typeof window !== 'undefined' && (window as any).Kapa) {
      (window as any).Kapa.open();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Docs that talk. Support that sleeps never.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            I wired kapa.ai into my own 'product' — me — to show time-to-value, 
            multi-channel rollout, and the analytics loop.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={openKapaWidget} size="lg" className="bg-primary text-primary-foreground">
              <MessageSquare className="mr-2 h-5 w-5" />
              Ask the AI
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/docs">
                See the Docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Multi-surface
                </CardTitle>
                <CardDescription>
                  Widget, Search, Deflector, Slack/Discord sims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Deployed across every touchpoint where questions happen. 
                  From docs widget to community channels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  AI-ready docs
                </CardTitle>
                <CardDescription>
                  Structured, chunkable, citation-friendly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every page optimized for retrieval. Clear headings, 
                  short paragraphs, exact phrases users will ask.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  AE brain
                </CardTitle>
                <CardDescription>
                  ICP, discovery, ROI calculator
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  MEDDPICC playbooks, objection handling, 
                  and real deal scenarios built into the knowledge base.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Time to Value */}
      <section className="px-6 py-16 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Time to Value</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <Badge variant="outline" className="mb-4">Day 1</Badge>
              <h3 className="font-semibold mb-2">Ingest docs</h3>
              <p className="text-sm text-muted-foreground">
                Connect data sources, structure content
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Badge variant="outline" className="mb-4">Day 2</Badge>
              <h3 className="font-semibold mb-2">Ship widget & deflector</h3>
              <p className="text-sm text-muted-foreground">
                Deploy across surfaces, configure search mode
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Badge variant="outline" className="mb-4">Day 3</Badge>
              <h3 className="font-semibold mb-2">Analytics → doc fixes</h3>
              <p className="text-sm text-muted-foreground">
                Review uncertain answers, fill gaps
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            If I can do this solo in 72h, imagine the lift with your team.
          </p>
        </div>
      </section>

      {/* RAG Visualizer */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">RAG Flow</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">User question</h3>
              <p className="text-sm text-muted-foreground">
                "How does the deflector work?"
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Retrieve chunks</h3>
              <div className="space-y-1">
                <Badge variant="secondary" className="text-xs">Overview</Badge>
                <Badge variant="secondary" className="text-xs">Deflector</Badge>
                <Badge variant="secondary" className="text-xs">Support</Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Compose answer</h3>
              <p className="text-sm text-muted-foreground">
                Grounded response + citations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Mode CTA */}
      <section className="px-6 py-16 bg-card">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Interview Mode</h2>
          <p className="text-muted-foreground mb-6">
            Skip the scheduling. Ask me anything about deals, discovery, or technical implementation.
          </p>
          <Button size="lg" asChild>
            <a href="/interview">
              <Clock className="mr-2 h-5 w-5" />
              Start Interview
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;