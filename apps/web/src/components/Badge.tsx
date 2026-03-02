import { Badge as ShadcnBadge } from "@/components/ui/badge";

interface BadgeProps {
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}

export function AchievementBadge({
  title,
  description,
  icon,
  earned,
}: BadgeProps) {
  return (
    <div
      className={`p-4 rounded-none border transition-all ${
        earned
          ? "border-foreground bg-foreground/5"
          : "border-border bg-muted/20 opacity-40 grayscale"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl filter grayscale">{icon}</div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-tighter font-syne text-foreground">
              {title}
            </h4>
            {earned && (
              <span className="text-[8px] uppercase tracking-[0.2em] font-geist-mono text-muted-foreground">
                Unlocked
              </span>
            )}
          </div>
          <p className="text-[10px] leading-relaxed text-muted-foreground font-geist-mono uppercase tracking-wide">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
