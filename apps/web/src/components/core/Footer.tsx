import React from 'react'
import Container from './Container'
import { Github, Twitter, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <Container>
      <div className='flex flex-col items-center justify-center text-center py-25 '>
        <p className='text-sm text-gray-500 mb-2'>© 2025 CoderWrap. All rights reserved.</p>
        <div className='flex items-center gap-6'>
          <a
            href='https://github.com/dev0jha'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
            aria-label='GitHub'
          >
            <Github className='w-4 h-4' />
          </a>
          <a
            href='https://twitter.com/dev0jha'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
            aria-label='Twitter'
          >
            <Twitter className='w-4 h-4' />
          </a>
          <a
            href='https://devfolio.tech'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors'
            aria-label='Portfolio'
          >
            <Globe className='w-4 h-4' />
          </a>
        </div>
      </div>
    </Container>
  )
}
