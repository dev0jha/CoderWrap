"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface DownloadCardProps {
  username: string;
  name: string | null;
  avatarUrl: string;
  year: number;
  totalCommits: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  contributionsThisYear: number;
  mostActiveMonth: string;
  totalStars: number;
  totalForks: number;
  totalPRs: number;
  totalIssues: number;
  issuesClosed: number;
  reviewsGiven: number;
  topLanguages: string[];
}

export function DownloadCard({
  username,
  name,
  avatarUrl,
  year,
  totalCommits,
  currentStreak,
  longestStreak,
  activeDays,
  contributionsThisYear,
  mostActiveMonth,
  totalStars,
  totalForks,
  totalPRs,
  totalIssues,
  issuesClosed,
  reviewsGiven,
  topLanguages,
}: DownloadCardProps) {
  return (
    <div
      id="download-card-container"
      className="fixed left-0 top-0 w-[800px] p-12 bg-background opacity-0 pointer-events-none"
      style={{ fontFamily: "var(--font-syne)", zIndex: -1 }}
    >
      <Card className="w-full bg-background border-border border-[1px] shadow-none rounded-none">
        <CardContent className="p-10 space-y-10">
          <div className="flex items-center justify-between border-b border-border pb-8">
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 rounded-none overflow-hidden border border-border">
                <img
                  src={avatarUrl}
                  alt={username}
                  className="w-full h-full object-cover grayscale"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold tracking-tighter uppercase">
                  {name || `@${username}`}
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-geist-mono">
                  GitHub Wrapped // {year}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold tracking-tighter font-syne italic">
                CODEWRAP
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter uppercase leading-none">
              Your Coding Year In Review
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-geist-mono">
              A data-driven summary of your {year} journey
            </p>
          </div>

          <div className="grid grid-cols-4 gap-px bg-border border border-border">
            {[
              {
                label: "Total Contributions",
                value: contributionsThisYear.toLocaleString(),
              },
              { label: "Total Commits", value: totalCommits.toLocaleString() },
              { label: "Active Days", value: activeDays },
              { label: "Longest Streak", value: `${longestStreak}d` },
              { label: "Current Streak", value: `${currentStreak}d` },
              {
                label: "Most Active Month",
                value: mostActiveMonth.toUpperCase(),
              },
              { label: "Total Stars", value: totalStars },
              { label: "Total Forks", value: totalForks },
              { label: "PRs Opened", value: totalPRs },
              { label: "Issues Opened", value: totalIssues },
              { label: "Issues Closed", value: issuesClosed },
              { label: "Reviews Given", value: reviewsGiven },
            ].map((stat, i) => (
              <div key={i} className="bg-background p-6 space-y-2">
                <p className="text-2xl font-bold tracking-tighter font-geist-mono">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-geist-mono leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border flex justify-between items-end">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-geist-mono">
                Top Technologies
              </p>
              <div className="flex gap-2 flex-wrap">
                {topLanguages.slice(0, 5).map((lang) => (
                  <Badge
                    key={lang}
                    variant="outline"
                    className="rounded-none border-border px-3 py-1 text-[10px] uppercase tracking-widest font-geist-mono"
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-geist-mono">
                Generated Via
              </p>
              <p className="text-sm font-bold tracking-tighter uppercase underline decoration-2 underline-offset-4">
                Codewrap.dev
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
