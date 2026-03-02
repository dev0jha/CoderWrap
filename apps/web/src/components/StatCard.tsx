import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  suffix?: ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  suffix,
  className = "",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "rounded-none border-border bg-background shadow-none",
        className,
      )}
    >
      <CardHeader className="pb-2 space-y-0">
        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground font-geist-mono">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold flex items-center gap-2 text-foreground font-syne tracking-tighter uppercase">
          {value}
          {suffix && (
            <span className="text-xs text-muted-foreground font-geist-mono normal-case tracking-normal">
              {suffix}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
