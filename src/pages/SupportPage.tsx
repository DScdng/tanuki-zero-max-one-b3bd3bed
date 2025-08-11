import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Bot, ExternalLink, Send } from "lucide-react";

const SupportPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{title: string, href: string}>>([]);

  const openKapaWidget = (query?: string) => {
    if (typeof window !== 'undefined' && (window as any).Kapa) {
      if (query) {
        (window as any).Kapa.open({ defaultQuery: query });
      } else {
        (window as any).Kapa.open();
      }
    }
  };

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    
    // Simple keyword matching for demo
    const suggestions = [];
    if (value.toLowerCase().includes('api')) {
      suggestions.push(
        { title: "API Rate Limits & Authentication", href: "/docs/dev/api" },
        { title: "React SDK Integration", href: "/docs/dev/api" }
      );
    }
    if (value.toLowerCase().includes('deflector') || value.toLowerCase().includes('support')) {
      suggestions.push(
        { title: "How the Deflector Works", href: "/docs/integrations/deflector" },
        { title: "Support Form Integration", href: "/docs/integrations/deflector" }
      );
    }
    if (value.toLowerCase().includes('slack') || value.toLowerCase().includes('discord')) {
      suggestions.push(
        { title: "Slack Bot Setup", href: "/docs/integrations/slack" },
        { title: "Discord Integration", href: "/docs/integrations/discord" }
      );
    }
    if (value.toLowerCase().includes('failure') || value.toLowerCase().includes('biggest')) {
      suggestions.push(
        { title: "Biggest Failure & Recovery", href: "/docs/scenarios/demo-fail-recovery" },
        { title: "Discovery Loss Analysis", href: "/docs/scenarios/discovery-loss-to-competitor" }
      );
    }
    if (value.toLowerCase().includes('easter egg')) {
      suggestions.push(
        { title: "🥚 Secret Page Unlocked!", href: "/tanuki-vs-max" }
      );
    }
    
    setSuggestions(suggestions);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact Djordje</h1>
        <p className="text-xl text-muted-foreground">
          Need help? The AI can probably answer faster than I can.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                placeholder="What do you need help with?"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your question or request..."
                rows={6}
              />
            </div>
            <Button className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* Deflector Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Suggested Answers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {suggestions.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Found your answer? No need to submit.
                </p>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <a 
                        href={suggestion.href}
                        className="font-medium text-sm hover:text-primary flex items-center justify-between"
                      >
                        {suggestion.title}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={() => openKapaWidget(subject)}
                    className="w-full"
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    Ask AI: "{subject}"
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Start typing a subject to see relevant answers
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className="cursor-pointer" onClick={() => handleSubjectChange("API rate limits")}>
                    Try: "API rate limits"
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer" onClick={() => handleSubjectChange("deflector setup")}>
                    Try: "deflector setup"
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer" onClick={() => handleSubjectChange("biggest failure")}>
                    Try: "biggest failure"
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Demo Note */}
      <div className="mt-8 p-4 bg-card rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>Deflector Demo:</strong> This shows how support forms can suggest answers before submission. 
          In production, this reduces tickets by 20-30% while improving user experience.
        </p>
      </div>
    </div>
  );
};

export default SupportPage;