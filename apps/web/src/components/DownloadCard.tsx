'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface DownloadCardProps {
  username: string
  name: string | null
  avatarUrl: string
  year: number
  totalCommits: number
  currentStreak: number
  longestStreak: number
  activeDays: number
  contributionsThisYear: number
  mostActiveMonth: string
  totalStars: number
  totalForks: number
  totalPRs: number
  totalIssues: number
  issuesClosed: number
  reviewsGiven: number
  topLanguages: string[]
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
      className="fixed left-0 top-0 w-200 p-8 bg-gray-50 opacity-0 pointer-events-none"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif', zIndex: -1, backgroundColor: '#f9fafb' }}
    >
      <Card className="w-full bg-gray-50 border-gray-200" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                <img
                  src={avatarUrl}
                  alt={username}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {name || `@${username}`}
                </p>
                <p className="text-sm text-gray-600">GitHub Wrapped</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-gray-200 text-gray-700 border-gray-300" style={{ backgroundColor: '#e5e7eb', color: '#374151', borderColor: '#d1d5db' }}>
              {year} Wrap
            </Badge>
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">This Was Your Coding Year</h2>
            <p className="text-sm text-gray-600">Your GitHub journey in {year} at a glance</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{contributionsThisYear.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Total Contributions</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{totalCommits.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Total Commits</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{activeDays}</p>
              <p className="text-xs text-gray-600">Active Days</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{longestStreak} 🔥</p>
              <p className="text-xs text-gray-600">Longest Streak</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{currentStreak}</p>
              <p className="text-xs text-gray-600">Current Streak</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{mostActiveMonth}</p>
              <p className="text-xs text-gray-600">Most Active Month</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{totalStars} ⭐</p>
              <p className="text-xs text-gray-600">Total Stars</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{totalForks} 🍴</p>
              <p className="text-xs text-gray-600">Total Forks</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{totalPRs}</p>
              <p className="text-xs text-gray-600">PRs Opened</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{totalIssues}</p>
              <p className="text-xs text-gray-600">Issues Opened</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{issuesClosed}</p>
              <p className="text-xs text-gray-600">Issues Closed</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <p className="text-xl font-bold text-gray-900">{reviewsGiven}</p>
              <p className="text-xs text-gray-600">Reviews Given</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm" style={{ backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <p className="text-sm font-semibold text-gray-900 mb-2 text-center">Top Languages</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {topLanguages.slice(0, 5).map((lang) => (
                <Badge key={lang} variant="outline" className="bg-white" style={{ backgroundColor: '#ffffff' }}>
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
