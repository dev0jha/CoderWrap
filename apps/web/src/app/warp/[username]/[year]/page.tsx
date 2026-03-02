import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchGitHubStats, getTopRepos } from "@/lib/github";
import Container from "@/components/core/Container";
import { Button } from "@/components/ui/button";
import { DownloadWrapButton } from "@/components/core/DownloadWrapButton";
import { EmbedIframeButton } from "@/components/core/EmbedIframeButton";
import { DownloadCard } from "@/components/DownloadCard";
import { AchievementBadge } from "@/components/Badge";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";

import {
  getCommitMessage,
  getRepoMessage,
  getLanguageMessage,
  getStreakMessage,
  getRandomFinalMessage,
  generateShareText,
} from "@/lib/wrap-messages";

interface PageProps {
  params: Promise<{
    username: string;
    year: string;
  }>;
}

function LoadingSlides() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      <p className="text-xl font-medium">Loading your GitHub Wrapped...</p>
      <p className="text-muted-foreground">Fetching your awesome stats 🚀</p>
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
  const totalLanguages = Object.values(stats.languageStats).reduce(
    (sum, count) => sum + count,
    0,
  );

  const nightOwlCommits = Math.floor(stats.totalCommits * 0.3);
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
      <div id="wrap-container" className="bg-background">
        <Container className="py-16 sm:py-24 space-y-16 sm:space-y-24 max-w-5xl px-4 sm:px-8">
          <div className="flex items-center justify-between border-b border-border pb-10">
            <Link href="/">
              <h2 className="text-xl font-syne font-bold uppercase tracking-tighter text-foreground">
                CodeWrap
              </h2>
            </Link>
            <div className="flex items-center gap-4">
              <DownloadWrapButton username={username} year={year} iconOnly />
              <EmbedIframeButton username={username} year={year} iconOnly />
            </div>
          </div>

          <header className="space-y-10">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              <div className="relative w-32 h-32 lg:w-48 lg:h-48 rounded-none border border-border flex-shrink-0 bg-muted overflow-hidden">
                <Image
                  src={stats.user.avatar_url}
                  alt={username}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>

              <div className="flex-1 space-y-6 text-center md:text-left">
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-syne font-bold tracking-tighter uppercase text-foreground leading-[0.9]">
                    {stats.user.name || username}
                  </h1>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-geist-mono mt-4">
                    Profile_Report // @{stats.user.login}
                  </p>
                </div>

                {stats.user.bio && (
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-geist-mono leading-relaxed max-w-2xl opacity-70">
                    {stats.user.bio}
                  </p>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[9px] uppercase tracking-[0.4em] font-geist-mono text-muted-foreground">
                  <span className="flex flex-col gap-1">
                    <span className="text-foreground font-bold text-lg tracking-tighter">
                      {stats.user.public_repos}
                    </span>{" "}
                    REPOS
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-foreground font-bold text-lg tracking-tighter">
                      {stats.user.followers}
                    </span>{" "}
                    FOLLOWERS
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-foreground font-bold text-lg tracking-tighter">
                      {stats.user.following}
                    </span>{" "}
                    FOLLOWING
                  </span>
                </div>
              </div>
            </div>
          </header>

          <section className="space-y-10 border-t border-border pt-16">
            <div className="space-y-4">
              <h2 className="text-xs uppercase tracking-[0.5em] text-muted-foreground font-geist-mono">
                AGGREGATED_DATA_LOG__{year}
              </h2>
              <p className="text-4xl font-syne font-bold uppercase tracking-tighter text-foreground">
                Sequential Coding Matrix
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              <div className="bg-background p-8 space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                  Contributions
                </p>
                <p className="text-3xl font-bold font-geist-mono tracking-tighter">
                  {stats.contributionsThisYear.toLocaleString()}
                </p>
              </div>
              <div className="bg-background p-8 space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                  Commits
                </p>
                <p className="text-3xl font-bold font-geist-mono tracking-tighter">
                  {stats.totalCommits.toLocaleString()}
                </p>
              </div>
              <div className="bg-background p-8 space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                  Active_Days
                </p>
                <p className="text-3xl font-bold font-geist-mono tracking-tighter">
                  {stats.activeDays}
                </p>
              </div>
              <div className="bg-background p-8 space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                  Peak_Streak
                </p>
                <p className="text-3xl font-bold font-geist-mono tracking-tighter">
                  {stats.longestStreak}
                </p>
              </div>
              <div className="bg-background p-8 space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                  Current_Streak
                </p>
                <p className="text-3xl font-bold font-geist-mono tracking-tighter">
                  {stats.currentStreak}
                </p>
              </div>
              <div className="bg-background p-8 space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                  Hot_Month
                </p>
                <p className="text-3xl font-bold font-geist-mono tracking-tighter">
                  {stats.mostActiveMonth.substring(0, 3).toUpperCase()}
                </p>
              </div>
              <div className="bg-background p-8 space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                  Stars_Earned
                </p>
                <p className="text-3xl font-bold font-geist-mono tracking-tighter">
                  {stats.totalStars}
                </p>
              </div>
              <div className="bg-background p-8 space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-geist-mono">
                  Total_Forks
                </p>
                <p className="text-3xl font-bold font-geist-mono tracking-tighter">
                  {stats.totalForks}
                </p>
              </div>
            </div>

            {sortedLanguages.length > 0 && (
              <div className="space-y-6 pt-10">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground">
                  Tech_Stack_Audit
                </h3>
                <div className="flex flex-wrap gap-4">
                  {sortedLanguages.map(([language]) => (
                    <div
                      key={language}
                      className="px-6 py-3 border border-border text-[10px] uppercase tracking-widest font-geist-mono hover:bg-foreground hover:text-background transition-all cursor-crosshair"
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {topRepos.length > 0 && (
              <div className="space-y-6 pt-10">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground">
                  Top_Project_Node
                </h3>
                <div className="border border-border p-10 group hover:border-foreground transition-all duration-500">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                    <div className="flex-1 space-y-6">
                      <a
                        href={topRepos[0].html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-4xl font-syne font-bold uppercase tracking-tighter text-foreground hover:underline decoration-1 underline-offset-[12px]"
                      >
                        {topRepos[0].name}
                      </a>
                      {topRepos[0].description && (
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-geist-mono leading-relaxed max-w-xl">
                          {topRepos[0].description}
                        </p>
                      )}
                      {topRepos[0].language && (
                        <span className="inline-flex items-center gap-3 text-[9px] uppercase tracking-widest font-geist-mono text-foreground font-bold">
                          <span className="w-1.5 h-1.5 bg-foreground"></span>
                          {topRepos[0].language}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-10 text-[9px] uppercase tracking-[0.2em] font-geist-mono">
                      <span className="flex flex-col gap-1">
                        <span className="text-foreground font-bold text-xl tracking-tighter">
                          {topRepos[0].stargazers_count}
                        </span>{" "}
                        STARS
                      </span>
                      <span className="flex flex-col gap-1">
                        <span className="text-foreground font-bold text-xl tracking-tighter">
                          {topRepos[0].forks_count}
                        </span>{" "}
                        FORKS
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {earnedBadges.length > 0 && (
              <div className="space-y-8 pt-10">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-geist-mono text-muted-foreground">
                  ACHIEVEMENTS_COLLECTION [{earnedBadges.length}/{badges.length}
                  ]
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {earnedBadges.map((badge) => (
                    <AchievementBadge key={badge.title} {...badge} />
                  ))}
                </div>
              </div>
            )}
          </section>
        </Container>
      </div>

      <div className="border-t border-border bg-muted/30">
        <Container className="py-24 max-w-5xl px-8">
          <section className="space-y-12">
            <div className="text-left space-y-6">
              <h3 className="text-6xl font-syne font-bold uppercase tracking-tighter text-foreground leading-[0.8]">
                Commit
                <br />
                To The Record
              </h3>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-geist-mono max-w-md">
                Generate your archival summary. Share your process with the
                collective.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <DownloadWrapButton username={username} year={year} />
              <EmbedIframeButton username={username} year={year} />
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-none border-border font-geist-mono text-[10px] uppercase tracking-widest"
              >
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `🎯 My ${year} GitHub Wrapped:\n\n` +
                      `💻 ${stats.totalCommits} commits\n` +
                      `📦 ${stats.user.public_repos} repos\n` +
                      `🔥 ${stats.longestStreak} day streak\n` +
                      `🏆 ${earnedBadges.length} badges earned\n\n` +
                      `Check out yours at CodeWrap! #GitHubWrapped #${year}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <span className="text-lg">𝕏</span>
                  SHARE_STATUS
                </a>
              </Button>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 rounded-none border-border font-geist-mono text-[10px] uppercase tracking-widest w-full"
                >
                  RETURN_HOME
                </Button>
              </Link>
            </div>

            <p className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-geist-mono opacity-50">
              Archival session ends. Preparations for {year + 1} initiated.
            </p>
          </section>
        </Container>
      </div>

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
