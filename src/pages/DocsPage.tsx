import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Users, Zap, Settings, BarChart } from "lucide-react";

const DocsPage = () => {
  const sections = [
    {
      title: "Overview",
      icon: BookOpen,
      description: "Core concepts and how it works",
      items: [
        { title: "What this is & how it works", href: "/docs/overview" },
        { title: "RAG 101", href: "/docs/rag-101", badge: "Popular" }
      ]
    },
    {
      title: "Integrations",
      icon: Zap,
      description: "Deploy across surfaces",
      items: [
        { title: "Website Widget + Search Mode", href: "/docs/integrations/widget" },
        { title: "Support Form Deflector", href: "/docs/integrations/deflector" },
        { title: "Slack Bot (sim)", href: "/docs/integrations/slack" },
        { title: "Discord Bot (sim)", href: "/docs/integrations/discord" }
      ]
    },
    {
      title: "Developer",
      icon: Code,
      description: "API and custom implementations",
      items: [
        { title: "Kapa API & React SDK", href: "/docs/dev/api" },
        { title: "Custom UI Examples", href: "/docs/dev/custom-ui" }
      ]
    },
    {
      title: "Sales Playbooks",
      icon: Users,
      description: "AE methodology and scenarios",
      items: [
        { title: "ICP & Discovery (MEDDPICC)", href: "/docs/playbooks/ae" },
        { title: "Objection Handling", href: "/docs/scenarios/objection-security" },
        { title: "Demo Best Practices", href: "/docs/scenarios/demo-fail-recovery" }
      ]
    },
    {
      title: "Personal API",
      icon: Settings,
      description: "Fun CV as endpoints",
      items: [
        { title: "Djordje API Reference", href: "/docs/cv/api-reference", badge: "Fun" },
        { title: "Win/Loss Scenarios", href: "/docs/scenarios/win-expansion" }
      ]
    },
    {
      title: "Case Studies",
      icon: BarChart,
      description: "Real implementations and learnings",
      items: [
        { title: "PostHog Demo Project", href: "/docs/case-studies/posthog" },
        { title: "Week 1 → Week 2 Analytics Loop", href: "/case-study" }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Everything the bot knows is here. Kick the tires.
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card key={section.title} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <section.icon className="h-5 w-5 text-primary" />
                {section.title}
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-sm hover:text-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access */}
      <div className="mt-16 p-6 bg-card rounded-lg">
        <h3 className="font-semibold mb-4">Quick Access</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">For Interviewers:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <a href="/docs/scenarios/discovery-loss-to-competitor" className="hover:text-primary">Discovery & qualification failure</a></li>
              <li>• <a href="/docs/scenarios/demo-fail-recovery" className="hover:text-primary">Demo recovery story</a></li>
              <li>• <a href="/docs/playbooks/ae" className="hover:text-primary">MEDDPICC approach</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">For Technical Review:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <a href="/docs/rag-101" className="hover:text-primary">RAG explained simply</a></li>
              <li>• <a href="/docs/dev/api" className="hover:text-primary">API integration approach</a></li>
              <li>• <a href="/dev" className="hover:text-primary">Live dev mode demo</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;