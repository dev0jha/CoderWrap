import { Badge as ShadcnBadge } from '@/components/ui/badge';

interface BadgeProps {
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}

export function AchievementBadge({ title, description, icon, earned }: BadgeProps) {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        earned
          ? 'border-primary bg-primary/5'
          : 'border-muted bg-muted/30 opacity-60'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{title}</h4>
            {earned && (
              <ShadcnBadge variant="default" className="text-xs">
                Unlocked
              </ShadcnBadge>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
