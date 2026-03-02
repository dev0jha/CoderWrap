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
      className={`p-5 rounded-none border transition-all duration-300 ${
        earned
          ? "border-foreground/30 bg-foreground/[0.03] hover:border-foreground/60"
          : "border-border bg-muted/10 opacity-30 grayscale"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl filter grayscale opacity-80">{icon}</div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-tighter font-syne text-foreground">
              {title}
            </h4>
            {earned && (
              <span className="text-[8px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground">
                [OK]
              </span>
            )}
          </div>
          <p className="text-[9px] leading-relaxed text-muted-foreground font-geist-mono uppercase tracking-wide">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
