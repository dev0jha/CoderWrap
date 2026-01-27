import React from 'react'
import Container from './Container'
import { Github, Twitter, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <div className='border-t border-border mt-24'>
      <Container>
        <div className='flex flex-col items-center justify-center text-center py-12 gap-6'>
          <p className='text-sm text-muted-foreground'>© 2025 CoderWrap. All rights reserved.</p>
          <div className='flex items-center gap-6'>
            <a
              href='https://github.com/dev0jha'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-foreground transition-colors'
              aria-label='GitHub'
            >
              <Github className='w-5 h-5' />
            </a>
            <a
              href='https://twitter.com/dev0jha'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-foreground transition-colors'
              aria-label='Twitter'
            >
              <Twitter className='w-5 h-5' />
            </a>
            <a
              href='https://devfolio.tech'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-foreground transition-colors'
              aria-label='Portfolio'
            >
              <Globe className='w-5 h-5' />
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
