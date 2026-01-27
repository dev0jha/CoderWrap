import React from 'react'
import Container from './Container'
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from './theme-toggle'
import GithubStar from './GithubStar'
const navitems = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Warp',
    href: '/warp/dev0jha/2025'
  },

]

export default function Navbar() {
  return (
    <div className='border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-50'>
      <Container className='py-4 px-4'>
        <div className='flex justify-between items-center'>
          {/*Logo and Nav Items*/}
          <div className='flex items-baseline gap-8'>
            <Image className='size-10 hover:opacity-80 transition-opacity cursor-pointer'
              src="/logo.webp"
              alt="Codewrap"
              width={100}
              height={100} />
            {
              navitems.map((items) => {
                return (
                  <Link key={items.label} href={items.href}>
                    <span className='text-sm font-medium text-muted-foreground hover:text-foreground hidden md:block transition-colors'>{items.label}</span>
                  </Link>
                );
              })
            }
          </div>
          <div className='flex items-center gap-4'>
            <GithubStar />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </div>
  )
}
