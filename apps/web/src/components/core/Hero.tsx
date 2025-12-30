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
      <div className='flex flex-col lg:flex-row items-center justify-between gap-12 py-25'>
        <div className='flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6'>
          <h1 className='text-5xl md:text-7xl font-poppins font-medium hover:text-gray-600'> 
            CoderWrap
          </h1>
          
          <TextGenerateEffect 
            className="text-2xl md:text-3xl font-poppins sm:text-4xl" 
            words="Turn GitHub activity into a beautiful yearly wrap — showcasing your commits, languages, and streaks in a shareable image." 
          />
          
          <p className='text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl px-4 sm:px-0'>
            Generate a clean, shareable image of your commits, languages, and streaks for any year in seconds—just enter your GitHub username.
          </p>
          
          <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl px-4 sm:px-0'>
            Perfect for <span className='font-semibold text-gray-900 dark:text-gray-100'>GitHub READMEs</span>, <span className='font-semibold text-gray-900 dark:text-gray-100'>portfolios</span>, <span className='font-semibold text-gray-900 dark:text-gray-100'>LinkedIn posts</span>, and <span className='font-semibold text-gray-900 dark:text-gray-100'>year-in-review tweets</span>.
          </p>

          <div className='flex flex-col items-center lg:items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4 sm:px-0'>
            <p className='flex items-center gap-2'>
              <span className='text-green-600 dark:text-green-400'>✓</span> 
              No login required. Uses only your public GitHub data.
            </p>
            <p className='flex items-center gap-2'>
              <span className='text-green-600 dark:text-green-400'>✓</span> 
              Free for developers, forever.
            </p>
            <p className='text-gray-600 dark:text-gray-300'>
              Already used by <span className='font-semibold'>100+ developers</span> to show off their year in code.
            </p>
            <Link 
              href='/warp/dev0jha/2025' 
              className='text-primary hover:underline font-medium'
            >
              View a live wrap: @dev0jha →
            </Link>
          </div>
        </div>

        <div className='flex-1 flex flex-col items-center gap-6 w-full px-4 sm:px-0'>
          <Card className='w-full max-w-md bg-linear-to-br from-primary/5 to-primary/10 border-primary/20'>
            <CardContent className='p-4 sm:p-6 space-y-3 sm:space-y-4'>
              <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
                  <div className='relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-primary/20 flex-shrink-0'>
                    <Image
                      src='https://github.com/dev0jha.png'
                      alt='dev0jha'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='min-w-0'>
                    <p className='font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate'>@dev0jha</p>
                    <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>GitHub Wrapped</p>
                  </div>
                </div>
                <Badge variant='secondary' className='bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm flex-shrink-0'>
                  2025 Wrap
                </Badge>
              </div>

              <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                <div className='bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 shadow-sm'>
                  <p className='text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100'>
                    {stats ? stats.totalCommits.toLocaleString() : '856'}
                  </p>
                  <p className='text-xs text-gray-600 dark:text-gray-400'>Total Commits</p>
                </div>
                <div className='bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 shadow-sm'>
                  <p className='text-xl sm:text-2xl font-bold text-orange-500'>
                    {stats ? stats.currentStreak : '32'}
                  </p>
                  <p className='text-xs text-gray-600 dark:text-gray-400'>Day Streak 🔥</p>
                </div>
              </div>

              <div className='bg-white dark:bg-gray-900 rounded-lg p-3 sm:p-4 shadow-sm'>
                <p className='text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2'>Top Languages</p>
                <div className='flex gap-2 flex-wrap'>
                  {topLanguages.length > 0 ? (
                    topLanguages.map((lang) => (
                      <Badge key={lang} variant='outline'>{lang}</Badge>
                    ))
                  ) : (
                    <>
                      <Badge variant='outline'>JavaScript</Badge>
                      <Badge variant='outline'>TypeScript</Badge>
                      <Badge variant='outline'>Python</Badge>
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
