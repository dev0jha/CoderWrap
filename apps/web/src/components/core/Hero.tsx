import React from 'react'
import Container from './Container'
import { TextGenerateEffect } from "../core/text-generate-effect";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { fetchGitHubStats } from '@/lib/github';

async function Hero() {
  let stats = null;
  let topLanguages: string[] = [];

  try {
    stats = await fetchGitHubStats('dev0jha', 2025);
    const sortedLanguages = Object.entries(stats.languageStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    topLanguages = sortedLanguages.map(([lang]) => lang);
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
  }

  return (
    <Container>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-20 py-24'>
        <div className='flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-[fade-in_0.8s_ease-out]'>
          <h1 className='text-6xl md:text-7xl lg:text-8xl font-inter font-bold text-foreground tracking-tight'>
            CoderWrap
          </h1>

          <p className='text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed'>
            Turn GitHub activity into a beautiful yearly wrap — showcasing your commits, languages, and streaks in a shareable image.
          </p>

          <p className='text-base text-muted-foreground max-w-2xl'>
            Generate a clean, shareable image of your commits, languages, and streaks for any year in seconds—just enter your GitHub username.
          </p>

          <p className='text-sm text-muted-foreground max-w-2xl'>
            Perfect for <span className='text-foreground font-medium'>GitHub READMEs</span>, <span className='text-foreground font-medium'>portfolios</span>, <span className='text-foreground font-medium'>LinkedIn posts</span>, and <span className='text-foreground font-medium'>year-in-review tweets</span>.
          </p>

          <div className='flex flex-col items-center lg:items-start gap-3 text-sm text-muted-foreground'>
            <p className='flex items-center gap-2'>
              <span className='text-foreground'>✓</span>
              No login required. Uses only your public GitHub data.
            </p>
            <p className='flex items-center gap-2'>
              <span className='text-foreground'>✓</span>
              Free for developers, forever.
            </p>
            <p className='text-foreground font-medium'>
              Already used by <span className='font-semibold'>100+</span> developers to show off their year in code.
            </p>
            <Link
              href='/warp/dev0jha/2025'
              className='text-foreground hover:text-muted-foreground font-medium transition-colors underline underline-offset-4'
            >
              View a live wrap: @dev0jha →
            </Link>
          </div>
        </div>

        <div className='flex-1 flex flex-col items-center gap-6 w-full px-4 sm:px-0 animate-[fade-in_1s_ease-out]'>
          <Card className='w-full max-w-md border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card'>
            <CardContent className='p-8 space-y-6'>
              <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3 min-w-0'>
                  <div className='relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-border flex-shrink-0'>
                    <Image
                      src='https://github.com/dev0jha.png'
                      alt='dev0jha'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='min-w-0'>
                    <p className='font-semibold text-sm font-jetbrains text-foreground truncate'>@dev0jha</p>
                    <p className='text-xs text-muted-foreground'>GitHub Wrapped</p>
                  </div>
                </div>
                <Badge variant='secondary' className='font-medium font-jetbrains text-xs px-3 py-1'>
                  2025
                </Badge>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='bg-secondary/50 rounded-lg p-4 border border-border'>
                  <p className='text-2xl font-bold text-foreground font-jetbrains'>
                    {stats ? stats.totalCommits.toLocaleString() : '856'}
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>Total Commits</p>
                </div>
                <div className='bg-secondary/50 rounded-lg p-4 border border-border'>
                  <p className='text-2xl font-bold text-foreground font-jetbrains'>
                    {stats ? stats.currentStreak : '32'}
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>Day Streak 🔥</p>
                </div>
              </div>

              <div className='bg-secondary/50 rounded-lg p-4 border border-border'>
                <p className='text-sm font-semibold text-foreground mb-3'>Top Languages</p>
                <div className='flex gap-2 flex-wrap'>
                  {topLanguages.length > 0 ? (
                    topLanguages.map((lang) => (
                      <Badge
                        key={lang}
                        variant='outline'
                        className='font-jetbrains text-xs'
                      >
                        {lang}
                      </Badge>
                    ))
                  ) : (
                    <>
                      <Badge variant='outline' className='font-jetbrains text-xs'>JavaScript</Badge>
                      <Badge variant='outline' className='font-jetbrains text-xs'>TypeScript</Badge>
                      <Badge variant='outline' className='font-jetbrains text-xs'>Python</Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
export default Hero;
