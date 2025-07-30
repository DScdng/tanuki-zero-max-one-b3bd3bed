import { PostHogButton } from "./PostHogButton";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BarChart3, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostHogHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
  badge?: string;
  className?: string;
}

export function PostHogHero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  badge,
  className
}: PostHogHeroProps) {
  return (
    <section className={cn(
      "relative min-h-[80vh] flex items-center justify-center overflow-hidden",
      "bg-gradient-to-br from-background via-background to-primary/5",
      className
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container relative z-10 max-w-4xl mx-auto px-4 text-center">
        {badge && (
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            {badge}
          </Badge>
        )}

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-foreground">{title.split(' ').slice(0, -1).join(' ')}</span>
          {' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title.split(' ').slice(-1)}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
          {subtitle}
        </p>

        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryAction && (
            <PostHogButton
              variant="gradient"
              size="lg"
              onClick={primaryAction.onClick}
              icon={<BarChart3 className="w-5 h-5" />}
              showArrow
              className="px-8 py-4 text-lg"
            >
              {primaryAction.text}
            </PostHogButton>
          )}
          
          {secondaryAction && (
            <PostHogButton
              variant="ghost"
              size="lg"
              onClick={secondaryAction.onClick}
              icon={<Zap className="w-5 h-5" />}
              className="px-8 py-4 text-lg"
            >
              {secondaryAction.text}
            </PostHogButton>
          )}
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-bounce delay-1000">
          <div className="w-3 h-3 bg-primary rounded-full opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-2000">
          <div className="w-2 h-2 bg-secondary rounded-full opacity-60" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-500">
          <div className="w-4 h-4 bg-primary/60 rounded-full opacity-40" />
        </div>
      </div>
    </section>
  );
}