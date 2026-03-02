import React from "react";
import Container from "./Container";
import { TextGenerateEffect } from "../core/text-generate-effect";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { fetchGitHubStats } from "@/lib/github";

async function Hero() {
  let stats = null;
  let topLanguages: string[] = [];

  try {
    stats = await fetchGitHubStats("dev0jha", 2025);
    const sortedLanguages = Object.entries(stats.languageStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    topLanguages = sortedLanguages.map(([lang]) => lang);
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
  }

  return (
    <Container>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20 py-24 lg:py-32">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-10 animate-[fade-in_0.8s_ease-out]">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-syne font-bold text-foreground tracking-tighter uppercase leading-[0.85]">
            Code
            <br />
            Wrap
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-md leading-relaxed font-geist-mono uppercase tracking-tight">
            Turn GitHub activity into a brutally minimal yearly summary.
            Commits, languages, and streaks, refined.
          </p>

          <div className="flex flex-col items-center lg:items-start gap-4 text-xs uppercase tracking-widest text-muted-foreground font-geist-mono">
            <div className="space-y-2">
              <p className="flex items-center gap-3">
                <span className="text-foreground font-bold">[OK]</span>
                No login required. Public data only.
              </p>
              <p className="flex items-center gap-3">
                <span className="text-foreground font-bold">[OK]</span>
                Free forever for developers.
              </p>
            </div>

            <Link
              href="/warp/dev0jha/2025"
              className="group flex items-center gap-2 text-foreground font-bold transition-all hover:gap-4 underline decoration-2 underline-offset-8"
            >
              VIEW EXAMPLE: @DEV0JHA{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-6 w-full max-w-md animate-[fade-in_1s_ease-out]">
          <Card className="w-full border border-border shadow-none rounded-none bg-card relative overflow-hidden">
            <div
              className="absolute top-0 right-0 p-4 text-[10px] font-geist-mono text-muted-foreground opacity-20 uppercase tracking-[0.5em] vertical-text hidden sm:block"
              style={{ writingMode: "vertical-rl" }}
            >
              DATA_VISUALIZATION_V1.0
            </div>
            <CardContent className="p-10 space-y-10">
              <div className="flex items-center justify-between border-b border-border pb-8">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-14 h-14 rounded-none overflow-hidden border border-border flex-shrink-0">
                    <Image
                      src="https://github.com/dev0jha.png"
                      alt="dev0jha"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm font-geist-mono text-foreground uppercase tracking-tighter">
                      @dev0jha
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                      Wrapped // 2025
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-border border border-border">
                <div className="bg-background p-6">
                  <p className="text-3xl font-bold text-foreground font-geist-mono tracking-tighter">
                    {stats ? stats.totalCommits.toLocaleString() : "856"}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-geist-mono mt-1">
                    Commits
                  </p>
                </div>
                <div className="bg-background p-6">
                  <p className="text-3xl font-bold text-foreground font-geist-mono tracking-tighter text-right">
                    {stats ? stats.currentStreak : "32"}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-geist-mono mt-1 text-right">
                    Streak 🔥
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-geist-mono">
                  Top Stack
                </p>
                <div className="flex gap-2 flex-wrap">
                  {(topLanguages.length > 0
                    ? topLanguages
                    : ["TypeScript", "Rust", "Go"]
                  ).map((lang) => (
                    <Badge
                      key={lang}
                      variant="outline"
                      className="font-geist-mono text-[9px] uppercase tracking-widest rounded-none border-border px-3 py-1 bg-transparent"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
export default Hero;
