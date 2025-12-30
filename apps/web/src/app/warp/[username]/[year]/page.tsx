import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGitHubStats, getTopRepos } from '@/lib/github';
import Container from '@/components/core/Container';
import { Button } from '@/components/ui/button';
import { DownloadWrapButton } from '@/components/core/DownloadWrapButton';
import { DownloadCard } from '@/components/DownloadCard';
import { AchievementBadge } from '@/components/Badge';
import { Card, CardContent,  } from '@/components/ui/card';
import { StatCard } from '@/components/StatCard';

import { 

  getCommitMessage, 
  getRepoMessage, 
  getLanguageMessage,
  getStreakMessage,

  getRandomFinalMessage,
  generateShareText
} from '@/lib/wrap-messages';

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

async function WrapContent({ username, year }: { username: string; year: number }) {
  let stats;
  
  try {
    stats = await fetchGitHubStats(username, year);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
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
  const totalLanguages = Object.values(stats.languageStats).reduce((sum, count) => sum + count, 0);

  const nightOwlCommits = Math.floor(stats.totalCommits * 0.3);
  const badges = [
    {
      title: 'Night Owl',
      description: 'Most commits after 10 PM',
      icon: '🦉',
      earned: stats.timingStats.peakCodingHour >= 22 || stats.timingStats.peakCodingHour <= 5,
    },
    {
      title: 'Issue Slayer',
      description: 'Closed 20+ issues',
      icon: '⚔️',
      earned: stats.collaborationStats.issuesClosed >= 20,
    },
    {
      title: 'Repo Hoarder',
      description: 'Created 10+ repositories',
      icon: '📦',
      earned: stats.user.public_repos >= 10,
    },
    {
      title: 'Social Coder',
      description: '50+ followers',
      icon: '👥',
      earned: stats.user.followers >= 50,
    },
    {
      title: 'Streak Master',
      description: '30+ day streak',
      icon: '🔥',
      earned: stats.longestStreak >= 30,
    },
    {
      title: 'Code Polyglot',
      description: '5+ languages used',
      icon: '🌐',
      earned: Object.keys(stats.languageStats).length >= 5,
    },
    {
      title: 'Review Hero',
      description: '25+ reviews given',
      icon: '🦸',
      earned: stats.collaborationStats.reviewsGiven >= 25,
    },
    {
      title: 'Star Collector',
      description: '100+ stars earned',
      icon: '⭐',
      earned: stats.totalStars >= 100,
    },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const weekendPercentage = stats.timingStats.weekendVsWeekday.weekend > 0 
    ? ((stats.timingStats.weekendVsWeekday.weekend / (stats.timingStats.weekendVsWeekday.weekend + stats.timingStats.weekendVsWeekday.weekday)) * 100).toFixed(0)
    : 0;

  return (
    <>
      <div id="wrap-container" className="bg-white dark:bg-gray-950">
        <Container className="py-8 sm:py-12 lg:py-16 space-y-8 sm:space-y-12 lg:space-y-16 max-w-4xl px-4 sm:px-6">
      
      <div className="pb-4 flex items-center gap-2">
        <Link href="/">
          <h2 className="text-base sm:text-lg font-Poppins font-bold italic tracking-tight text-gray-900 dark:text-gray-100">CodeWrap</h2>
        </Link>
      </div>

      <header className="space-y-4 sm:space-y-6">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 items-center md:items-start">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden ring-2 sm:ring-4 ring-border flex-shrink-0">
            <Image
              src={stats.user.avatar_url}
              alt={username}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-gray-900 dark:text-gray-100 mb-2">
                {stats.user.name || username}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">@{stats.user.login}</p>
            </div>
            
            {stats.user.bio && (
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                {stats.user.bio}
              </p>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span>{stats.user.public_repos} repos</span>
              <span>{stats.user.followers} followers</span>
              <span>{stats.user.following} following</span>
            </div>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">This Was Your Coding Year</h2>
          <p className="text-gray-600 dark:text-gray-400">Your GitHub journey in {year} at a glance</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Contributions"
            value={stats.contributionsThisYear.toLocaleString()}
          />
          
          <StatCard
            title="Total Commits"
            value={stats.totalCommits.toLocaleString()}
          />
          
          <StatCard
            title="Active Days"
            value={stats.activeDays}
          />
          
          <StatCard
            title="Longest Streak"
            value={`${stats.longestStreak} days`}
            suffix="🔥"
          />
          
          <StatCard
            title="Current Streak"
            value={`${stats.currentStreak} days`}
          />
          
          <StatCard
            title="Most Active Month"
            value={stats.mostActiveMonth}
          />
          
          <StatCard
            title="Total Stars"
            value={stats.totalStars}
            suffix="⭐"
          />
          
          <StatCard
            title="Total Forks"
            value={stats.totalForks}
            suffix="🍴"
          />
          
          <StatCard
            title="PRs Opened"
            value={stats.collaborationStats.totalPRs}
          />
          
          <StatCard
            title="Issues Opened"
            value={stats.collaborationStats.totalIssues}
          />
          
          <StatCard
            title="Issues Closed"
            value={stats.collaborationStats.issuesClosed}
          />
          
          <StatCard
            title="Reviews Given"
            value={stats.collaborationStats.reviewsGiven}
          />
        </div>

        {sortedLanguages.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">Top Languages</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {sortedLanguages.map(([language]) => (
                <span
                  key={language}
                  className="px-3 py-1.5 rounded-full bg-secondary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {topRepos.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">Top Repository</h3>
            <Card className="hover:border-primary transition-colors">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <a
                      href={topRepos[0].html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors block"
                    >
                      {topRepos[0].name}
                    </a>
                    {topRepos[0].description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{topRepos[0].description}</p>
                    )}
                    {topRepos[0].language && (
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                        {topRepos[0].language}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-1">
                      ⭐ <span className="font-semibold">{topRepos[0].stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      🍴 <span className="font-semibold">{topRepos[0].forks_count}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {earnedBadges.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
              Badges Earned ({earnedBadges.length}/{badges.length})
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {earnedBadges.map((badge) => (
                <AchievementBadge key={badge.title} {...badge} />
              ))}
            </div>
          </div>
        )}
      </section>
        </Container>
      </div>

      <Container className="py-6 sm:py-8 max-w-4xl px-4 sm:px-6">
      <section className="space-y-6">
        <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold">Share Your {year} Wrap</h3>
              <p className="text-lg text-muted-foreground">
                <span className="font-bold text-primary">{stats.totalCommits}</span> commits •{' '}
                <span className="font-bold text-primary">{stats.longestStreak}</span> day streak •{' '}
                <span className="font-bold text-primary">{earnedBadges.length}</span> badges
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          <DownloadWrapButton username={username} year={year} />
          <Button size="lg" className="w-full sm:w-auto">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `🎯 My ${year} GitHub Wrapped:\n\n` +
                `💻 ${stats.totalCommits} commits\n` +
                `📦 ${stats.user.public_repos} repos\n` +
                `🔥 ${stats.longestStreak} day streak\n` +
                `🏆 ${earnedBadges.length} badges earned\n\n` +
                `Check out yours at CodeWrap! #GitHubWrapped #${year}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center"
            >
              <span className="text-lg">𝕏</span>
              Share on Twitter
            </a>
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full">
              ← Back Home
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground pt-2 sm:pt-4 text-center">
          Here&apos;s to an even better {year + 1}! 🚀
        </p>
      </section>
      </Container>

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
        card: 'summary_large_image',
        title: `${stats.user.name || stats.user.login}'s ${year} GitHub Wrapped`,
        description: `${stats.totalCommits} commits, ${stats.user.public_repos} repos, and more!`,
        images: [stats.user.avatar_url],
      },
    };
  } catch {
    return {
      title: `${year} GitHub Wrapped`,
      description: 'Your year in code, wrapped up!',
    };
  }
}
