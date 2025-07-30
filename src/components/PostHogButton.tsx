import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";

interface PostHogButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "default" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  showArrow?: boolean;
  animated?: boolean;
}

export function PostHogButton({
  children,
  variant = "primary",
  size = "default",
  className,
  onClick,
  disabled,
  icon,
  showArrow,
  animated = true
}: PostHogButtonProps) {
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl",
    secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl",
    ghost: "bg-transparent hover:bg-primary/10 text-primary border border-primary/20 hover:border-primary/40",
    gradient: "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl"
  };

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden",
        variants[variant],
        animated && "transition-all duration-300 hover:scale-105",
        "font-medium",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className={cn(
            "transition-transform duration-200",
            animated && "group-hover:rotate-12"
          )}>
            {icon}
          </span>
        )}
        <span>{children}</span>
        {showArrow && (
          <ArrowRight className={cn(
            "h-4 w-4 transition-transform duration-200",
            animated && "group-hover:translate-x-1"
          )} />
        )}
      </div>
      
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      )}
    </Button>
  );
}