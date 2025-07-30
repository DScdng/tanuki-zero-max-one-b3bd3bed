import { PostHogCard } from "./PostHogCard";
import { BarChart3, Play, Flag, MessageSquare, Route, Monitor, Target, Zap } from "lucide-react";

const products = [
  {
    title: "Product Analytics",
    description: "Understand user behavior with event-based analytics, cohorts, and conversion funnels. Includes auto capture & SQL access.",
    icon: <BarChart3 className="w-5 h-5" />,
    badge: "Core",
    featured: true
  },
  {
    title: "Session Replay",
    description: "Watch how users interact with your app. Debug issues and understand user journeys with pixel-perfect recordings.",
    icon: <Play className="w-5 h-5" />,
    badge: "Popular"
  },
  {
    title: "Feature Flags",
    description: "Roll out features safely with instant rollbacks. Target specific users and gradually release new functionality.",
    icon: <Flag className="w-5 h-5" />,
    badge: "Developer"
  },
  {
    title: "A/B Testing",
    description: "Test changes with statistical significance. Run experiments and measure impact on key metrics.",
    icon: <Target className="w-5 h-5" />,
    badge: "Growth"
  },
  {
    title: "Surveys",
    description: "Collect user feedback directly in your app. Ask the right questions at the right moment.",
    icon: <MessageSquare className="w-5 h-5" />,
    badge: "Insights"
  },
  {
    title: "User Paths",
    description: "Visualize user journeys through your app. Identify drop-off points and optimization opportunities.",
    icon: <Route className="w-5 h-5" />,
    badge: "Analysis"
  },
  {
    title: "Heatmaps",
    description: "See where users click, scroll, and interact. Optimize your interface with visual insights.",
    icon: <Monitor className="w-5 h-5" />,
    badge: "Design"
  },
  {
    title: "Real-time Events",
    description: "Monitor user activity as it happens. React to user behavior in real-time.",
    icon: <Zap className="w-5 h-5" />,
    badge: "Live"
  }
];

export function PostHogProductGrid() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything you need to build{' '}
            <span className="bg-gradient-to-r from-primary to-posthog-blue bg-clip-text text-transparent">
              successful products
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The single platform to analyze, test, observe, and deploy new features. 
            Each product offers the lowest pricing vs. every competitor at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <PostHogCard
              key={product.title}
              title={product.title}
              description={product.description}
              badge={product.badge}
              icon={product.icon}
              variant={product.featured ? "featured" : "default"}
              className={`animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Just starting out?{' '}
            <a 
              href="#" 
              className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
            >
              Explore our founder stack
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}