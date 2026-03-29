import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchGitHubStats, getTopRepos } from "@/lib/github";
import Container from "@/components/core/Container";
import Navbar from "@/components/core/navbar";
import SchematicBackground from "@/components/core/SchematicBackground";
import MetalButton from "@/components/pixel-perfect/metal-button";
import { DownloadWrapButton } from "@/components/core/DownloadWrapButton";
import { EmbedIframeButton } from "@/components/core/EmbedIframeButton";
import { DownloadCard } from "@/components/DownloadCard";
import { AchievementBadge } from "@/components/Badge";
import { cn } from "@/lib/utils";

import {
  getCommitMessage,
  getRepoMessage,
  getLanguageMessage,
  getStreakMessage,
  getRandomFinalMessage,
} from "@/lib/wrap-messages";

interface PageProps {
  params: Promise<{
    username: string;
    year: string;
  }>;
}

function LoadingSlides() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 bg-background">
      <div className="w-12 h-12 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      <div className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.5em] font-geist-mono text-foreground">
          Fetching Data...
        </p>
        <p className="text-[9px] uppercase tracking-widest font-geist-mono text-muted-foreground">
          Compiling activity report
        </p>
      </div>
    </div>
  );
}

async function WrapContent({
  username,
  year,
}: {
  username: string;
  year: number;
}) {
  let stats;

  try {
    stats = await fetchGitHubStats(username, year);
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    notFound();
  }

  const topRepos = getTopRepos(stats.repos, 5);
  const commitMessage = getCommitMessage(stats.totalCommits);
  const repoMessage = getRepoMessage(stats.user.public_repos);
  const languageMessage = getLanguageMessage(stats.topLanguage);
  const streakMessage = getStreakMessage(stats.currentStreak);
  const finalMessage = getRandomFinalMessage();

  const sortedLanguages = Object.entries(stats.languageStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const badges = [
    {
      title: "Night Owl",
      description: "Most commits after 10 PM",
      icon: "🦉",
      earned:
        stats.timingStats.peakCodingHour >= 22 ||
        stats.timingStats.peakCodingHour <= 5,
    },
    {
      title: "Issue Slayer",
      description: "Closed 20+ issues",
      icon: "⚔️",
      earned: stats.collaborationStats.issuesClosed >= 20,
    },
    {
      title: "Repo Hoarder",
      description: "Created 10+ repositories",
      icon: "📦",
      earned: stats.user.public_repos >= 10,
    },
    {
      title: "Social Coder",
      description: "50+ followers",
      icon: "👥",
      earned: stats.user.followers >= 50,
    },
    {
      title: "Streak Master",
      description: "30+ day streak",
      icon: "🔥",
      earned: stats.longestStreak >= 30,
    },
    {
      title: "Code Polyglot",
      description: "5+ languages used",
      icon: "🌐",
      earned: Object.keys(stats.languageStats).length >= 5,
    },
    {
      title: "Review Hero",
      description: "25+ reviews given",
      icon: "🦸",
      earned: stats.collaborationStats.reviewsGiven >= 25,
    },
    {
      title: "Star Collector",
      description: "100+ stars earned",
      icon: "⭐",
      earned: stats.totalStars >= 100,
    },
  ];

  const earnedBadges = badges.filter((b) => b.earned);
  const weekendPercentage =
    stats.timingStats.weekendVsWeekday.weekend > 0
      ? (
          (stats.timingStats.weekendVsWeekday.weekend /
            (stats.timingStats.weekendVsWeekday.weekend +
              stats.timingStats.weekendVsWeekday.weekday)) *
          100
        ).toFixed(0)
      : 0;

  return (
    <>
      <main className="relative min-h-screen bg-[#121212]">
        <SchematicBackground />

        <div id="wrap-container" className="relative">
          {/* Navbar */}
          <Navbar />

          <Container className="relative">
            {/* Left Side Decorative Border */}
            <div
              className={cn(
                "pointer-events-none",
                "absolute inset-y-0 left-0 hidden sm:block",
                "z-10",
                "-translate-x-16",
                "h-full w-10 sm:w-14",
                "border-r border-[rgba(255,255,255,0.08)]",
                "bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_10px)]",
              )}
            />

            {/* Right Side Decorative Border */}
            <div
              className={cn(
                "pointer-events-none",
                "absolute inset-y-0 right-0 hidden sm:block",
                "z-10",
                "translate-x-16",
                "h-full w-10 sm:w-14",
                "border-l border-[rgba(255,255,255,0.08)]",
                "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_10px)]",
              )}
            />

            {/* Profile Header */}
            <header className="py-12 sm:py-20 lg:py-28 space-y-10 animate-[fade-in_0.8s_ease-out]">
              <div className="flex flex-col md:flex-row gap-6 sm:gap-10 lg:gap-14 items-center md:items-start">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-40 rounded-none border border-border shrink-0 bg-muted overflow-hidden">
                  <Image
                    src={stats.user.avatar_url}
                    alt={username}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                </div>

                <div className="flex-1 space-y-5 text-center md:text-left">
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-geist-mono">
                      Profile_Report // {year}
                    </p>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-syne font-bold tracking-tighter uppercase text-foreground leading-[0.85]">
                      {stats.user.name || username}
                    </h1>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-geist-mono">
                      @{stats.user.login}
                    </p>
                  </div>

                  {stats.user.bio && (
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-geist-mono leading-relaxed max-w-lg opacity-60">
                      {stats.user.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-8 text-[9px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground pt-2">
                    <span className="flex flex-col gap-1">
                      <span className="text-foreground font-bold text-lg tracking-tighter font-geist-mono">
                        {stats.user.public_repos}
                      </span>
                      Repos
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-foreground font-bold text-lg tracking-tighter font-geist-mono">
                        {stats.user.followers}
                      </span>
                      Followers
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-foreground font-bold text-lg tracking-tighter font-geist-mono">
                        {stats.user.following}
                      </span>
                      Following
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 self-start">
                  <DownloadWrapButton
                    username={username}
                    year={year}
                    iconOnly
                  />
                  <EmbedIframeButton username={username} year={year} iconOnly />
                </div>
              </div>
            </header>

            {/* Stats Section */}
            <section className="space-y-8 sm:space-y-10 border-t border-border pt-10 sm:pt-16 lg:pt-20 animate-[fade-in_1s_ease-out]">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-geist-mono">
                  Aggregated_Data // {year}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-bold uppercase tracking-tighter text-foreground">
                  Sequential Coding Matrix
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
                {[
                  {
                    label: "Contributions",
                    value: stats.contributionsThisYear.toLocaleString(),
                  },
                  {
                    label: "Commits",
                    value: stats.totalCommits.toLocaleString(),
                  },
                  { label: "Active_Days", value: stats.activeDays },
                  { label: "Peak_Streak", value: stats.longestStreak },
                  { label: "Current_Streak", value: stats.currentStreak },
                  {
                    label: "Hot_Month",
                    value: stats.mostActiveMonth.substring(0, 3).toUpperCase(),
                  },
                  { label: "Stars_Earned", value: stats.totalStars },
                  { label: "Total_Forks", value: stats.totalForks },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-background p-4 sm:p-6 lg:p-8 space-y-2"
                  >
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                      {stat.label}
                    </p>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-bold font-geist-mono tracking-tighter text-foreground">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Collaboration Stats */}
              <div className="space-y-4 pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground">
                  Collaboration_Metrics
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
                  {[
                    {
                      label: "PRs_Opened",
                      value: stats.collaborationStats.totalPRs,
                    },
                    {
                      label: "Issues_Opened",
                      value: stats.collaborationStats.totalIssues,
                    },
                    {
                      label: "Issues_Closed",
                      value: stats.collaborationStats.issuesClosed,
                    },
                    {
                      label: "Reviews_Given",
                      value: stats.collaborationStats.reviewsGiven,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-background p-4 sm:p-6 lg:p-8 space-y-2"
                    >
                      <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                        {stat.label}
                      </p>
                      <p className="text-lg sm:text-2xl lg:text-3xl font-bold font-geist-mono tracking-tighter text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timing Stats */}
              <div className="space-y-4 pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground">
                  Timing_Analysis
                </p>
                <div className="grid grid-cols-3 gap-px bg-border border border-border">
                  <div className="bg-background p-4 sm:p-6 lg:p-8 space-y-2">
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                      Peak_Day
                    </p>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-bold font-geist-mono tracking-tighter text-foreground uppercase">
                      {stats.timingStats.mostActiveWeekday.substring(0, 3)}
                    </p>
                  </div>
                  <div className="bg-background p-4 sm:p-6 lg:p-8 space-y-2">
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                      Peak_Hour
                    </p>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-bold font-geist-mono tracking-tighter text-foreground">
                      {stats.timingStats.peakCodingHour}:00
                    </p>
                  </div>
                  <div className="bg-background p-4 sm:p-6 lg:p-8 space-y-2">
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                      Weekend_%
                    </p>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-bold font-geist-mono tracking-tighter text-foreground">
                      {weekendPercentage}%
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Languages Section */}
            {sortedLanguages.length > 0 && (
              <section className="space-y-6 border-t border-border pt-10 sm:pt-16 lg:pt-20 mt-10 sm:mt-16 lg:mt-20 animate-[fade-in_1s_ease-out]">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-geist-mono">
                    Stack_Audit
                  </p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-bold uppercase tracking-tighter text-foreground">
                    Tech Stack
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sortedLanguages.map(([language, count]) => (
                    <div
                      key={language}
                      className="px-5 py-3 border border-border text-[10px] uppercase tracking-widest font-geist-mono hover:bg-foreground hover:text-background transition-all duration-300 cursor-crosshair group"
                    >
                      <span>{language}</span>
                      <span className="ml-3 text-muted-foreground group-hover:text-background/60">
                        [{count}]
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Top Repo Section */}
            {topRepos.length > 0 && (
              <section className="space-y-6 border-t border-border pt-10 sm:pt-16 lg:pt-20 mt-10 sm:mt-16 lg:mt-20 animate-[fade-in_1s_ease-out]">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-geist-mono">
                    Featured_Node
                  </p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-bold uppercase tracking-tighter text-foreground">
                    Top Project
                  </h2>
                </div>
                <div className="border border-border p-5 sm:p-8 lg:p-10 group hover:border-foreground/40 transition-all duration-500">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <a
                        href={topRepos[0].html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl sm:text-2xl lg:text-3xl font-syne font-bold uppercase tracking-tighter text-foreground hover:underline decoration-1 underline-offset-8 transition-all"
                      >
                        {topRepos[0].name}
                      </a>
                      {topRepos[0].description && (
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-geist-mono leading-relaxed max-w-lg">
                          {topRepos[0].description}
                        </p>
                      )}
                      {topRepos[0].language && (
                        <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest font-geist-mono text-foreground font-bold">
                          <span className="w-1.5 h-1.5 bg-foreground"></span>
                          {topRepos[0].language}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] font-geist-mono text-muted-foreground">
                      <span className="flex flex-col gap-1">
                        <span className="text-foreground font-bold text-xl tracking-tighter font-geist-mono">
                          {topRepos[0].stargazers_count}
                        </span>
                        Stars
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="text-foreground font-bold text-xl tracking-tighter font-geist-mono">
                          {topRepos[0].forks_count}
                        </span>
                        Forks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional repos */}
                {topRepos.length > 1 && (
                  <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
                    {topRepos.slice(1, 5).map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-background p-6 space-y-3 hover:bg-foreground/2 transition-colors"
                      >
                        <p className="text-sm font-syne font-bold uppercase tracking-tighter text-foreground">
                          {repo.name}
                        </p>
                        {repo.description && (
                          <p className="text-[9px] uppercase tracking-wide text-muted-foreground font-geist-mono leading-relaxed line-clamp-2">
                            {repo.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-[8px] uppercase tracking-widest font-geist-mono text-muted-foreground">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span className="w-1 h-1 bg-muted-foreground"></span>
                              {repo.language}
                            </span>
                          )}
                          <span>★ {repo.stargazers_count}</span>
                          <span>⑂ {repo.forks_count}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Achievements Section */}
            {earnedBadges.length > 0 && (
              <section className="space-y-8 border-t border-border pt-10 sm:pt-16 lg:pt-20 mt-10 sm:mt-16 lg:mt-20 animate-[fade-in_1s_ease-out]">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-geist-mono">
                    Achievement_Log
                  </p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-bold uppercase tracking-tighter text-foreground">
                    Badges [{earnedBadges.length}/{badges.length}]
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => (
                    <AchievementBadge key={badge.title} {...badge} />
                  ))}
                </div>
              </section>
            )}

            {/* CTA Section */}
            <section className="border-t border-border pt-10 sm:pt-16 lg:pt-20 mt-10 sm:mt-16 lg:mt-20 pb-14 sm:pb-20 lg:pb-28 animate-[fade-in_1s_ease-out]">
              <div className="space-y-8 sm:space-y-10">
                <div className="space-y-4">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-bold uppercase tracking-tighter text-foreground leading-[0.85]">
                    Commit
                    <br />
                    To The Record
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-geist-mono max-w-sm">
                    Generate your archival summary. Share your process with the
                    collective.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <DownloadWrapButton username={username} year={year} />
                  <EmbedIframeButton username={username} year={year} />
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `My ${year} GitHub Wrapped:\n\n` +
                        `${stats.totalCommits} commits\n` +
                        `${stats.user.public_repos} repos\n` +
                        `${stats.longestStreak} day streak\n` +
                        `${earnedBadges.length} badges earned\n\n` +
                        `Check out yours at CodeWrap! #GitHubWrapped #${year}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MetalButton
                      metal="gold"
                      className="h-12 px-8 font-geist-mono text-[10px] uppercase tracking-widest"
                    >
                      <span className="text-lg">𝕏</span>
                      Share_Status
                    </MetalButton>
                  </a>
                  <Link href="/">
                    <MetalButton
                      metal="titanium"
                      className="h-12 px-8 font-geist-mono text-[10px] uppercase tracking-widest w-full"
                    >
                      Return_Home
                    </MetalButton>
                  </Link>
                </div>

                <p className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-geist-mono opacity-40">
                  Session_{year}_complete // Preparing {year + 1}
                </p>
              </div>
            </section>
          </Container>
        </div>
      </main>

      <DownloadCard
        username={stats.user.login}
        name={stats.user.name}
        avatarUrl={stats.user.avatar_url}
        year={year}
        totalCommits={stats.totalCommits}
        currentStreak={stats.currentStreak}
        longestStreak={stats.longestStreak}
        activeDays={stats.activeDays}
        contributionsThisYear={stats.contributionsThisYear}
        mostActiveMonth={stats.mostActiveMonth}
        totalStars={stats.totalStars}
        totalForks={stats.totalForks}
        totalPRs={stats.collaborationStats.totalPRs}
        totalIssues={stats.collaborationStats.totalIssues}
        issuesClosed={stats.collaborationStats.issuesClosed}
        reviewsGiven={stats.collaborationStats.reviewsGiven}
        topLanguages={sortedLanguages.map(([lang]) => lang)}
      />
    </>
  );
}

export default async function WrapPage({ params }: PageProps) {
  const { username, year: yearStr } = await params;
  const year = parseInt(yearStr, 10);

  if (isNaN(year) || year < 2008 || year > new Date().getFullYear()) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSlides />}>
      <WrapContent username={username} year={year} />
    </Suspense>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { username, year: yearStr } = await params;
  const year = parseInt(yearStr, 10);

  try {
    const stats = await fetchGitHubStats(username, year);
    return {
      title: `${stats.user.name || stats.user.login}'s ${year} GitHub Wrapped`,
      description: `Check out ${stats.user.name || stats.user.login}'s GitHub achievements for ${year}!`,
      openGraph: {
        title: `${stats.user.name || stats.user.login}'s ${year} GitHub Wrapped`,
        description: `${stats.totalCommits} commits, ${stats.user.public_repos} repos, and more!`,
        images: [stats.user.avatar_url],
      },
      twitter: {
        card: "summary_large_image",
        title: `${stats.user.name || stats.user.login}'s ${year} GitHub Wrapped`,
        description: `${stats.totalCommits} commits, ${stats.user.public_repos} repos, and more!`,
        images: [stats.user.avatar_url],
      },
    };
  } catch {
    return {
      title: `${year} GitHub Wrapped`,
      description: "Your year in code, wrapped up!",
    };
  }
}
