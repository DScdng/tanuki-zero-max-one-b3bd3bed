import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PostHogCardProps {
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "featured" | "compact";
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export function PostHogCard({ 
  title, 
  description, 
  badge, 
  children, 
  className,
  variant = "default",
  icon,
  style
}: PostHogCardProps) {
  const variants = {
    default: "hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
    featured: "bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2",
    compact: "hover:bg-accent transition-colors duration-200"
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer",
        variants[variant],
        className
      )}
      style={style}
    >
      <CardHeader className={cn(
        "pb-3",
        variant === "compact" && "pb-2"
      )}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className={cn(
                "text-lg font-semibold group-hover:text-primary transition-colors duration-200",
                variant === "compact" && "text-base"
              )}>
                {title}
              </CardTitle>
              {badge && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <CardDescription className={cn(
          "text-sm text-muted-foreground leading-relaxed",
          variant === "compact" && "text-xs"
        )}>
          {description}
        </CardDescription>
      </CardHeader>
      {children && (
        <CardContent className={cn(
          "pt-0",
          variant === "compact" && "pt-0 pb-3"
        )}>
          {children}
        </CardContent>
      )}
    </Card>
  );
}