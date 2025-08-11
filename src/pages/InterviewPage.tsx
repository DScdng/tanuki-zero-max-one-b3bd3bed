import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, Target, Lightbulb } from "lucide-react";

const InterviewPage = () => {
  const openKapaWidget = (query: string) => {
    if (typeof window !== 'undefined' && (window as any).Kapa) {
      (window as any).Kapa.open({ defaultQuery: query });
    }
  };

  const promptCategories = [
    {
      title: "Discovery & Qualification",
      icon: Target,
      prompts: [
        "Walk me through a tough deal you lost and what you changed after.",
        "Give me a MEDDPICC-style discovery plan for a PLG devtools prospect.",
        "When have you pushed back on a bad-fit deal?"
      ]
    },
    {
      title: "Technical Implementation",
      icon: Lightbulb,
      prompts: [
        "How would you roll out Kapa to reduce tickets by 30%?",
        "Teach RAG to a non-technical buyer in 60s.",
        "What's your approach to API integration and custom UI?"
      ]
    },
    {
      title: "Demo & Objections", 
      icon: MessageSquare,
      prompts: [
        "Biggest mistake in a demo — and the fix.",
        "How do you handle security and PII concerns?",
        "How do you qualify timeline without being pushy?"
      ]
    },
    {
      title: "Process & Forecasting",
      icon: Clock,
      prompts: [
        "How do you forecast with incomplete info?",
        "Walk me through your onboarding process.",
        "How do you handle pricing objections while protecting margin?"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Interview Mode</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Ask me anything — no scheduling needed.
        </p>
        <p className="text-muted-foreground">
          This page bundles common interview prompts and live Q&A. Use the chat or click a prompt.
        </p>
      </div>

      {/* Quick AI Access */}
      <div className="mb-12 text-center">
        <Button 
          size="lg" 
          onClick={() => openKapaWidget("")}
          className="mb-4"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Open AI Chat
        </Button>
        <p className="text-sm text-muted-foreground">
          Or click any prompt below for instant answers with citations
        </p>
      </div>

      {/* Prompt Categories */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {promptCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-primary" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 text-sm"
                    onClick={() => openKapaWidget(prompt)}
                  >
                    "{prompt}"
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Prompts */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>More Questions</CardTitle>
          <CardDescription>
            Try these or ask anything else about my experience, methodology, or technical approach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "What's your biggest win and what made it successful?",
              "How do you handle multiple stakeholders in enterprise deals?",
              "Describe your approach to competitive situations.",
              "How do you build trust with technical buyers?",
              "What's your strategy for expanding within existing accounts?",
              "How do you handle deals that stall in legal/procurement?"
            ].map((prompt, index) => (
              <Button
                key={index}
                variant="ghost"
                className="text-left justify-start h-auto p-2 text-sm"
                onClick={() => openKapaWidget(prompt)}
              >
                • {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grounding Note */}
      <div className="p-4 bg-card rounded-lg border border-border">
        <div className="flex items-start gap-3">
          <Badge variant="outline">Note</Badge>
          <p className="text-sm text-muted-foreground">
            Every answer is grounded in the <a href="/scenarios" className="text-primary hover:underline">Scenarios pages</a> and 
            documentation on this site. You'll see citations showing exactly where each insight comes from.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;