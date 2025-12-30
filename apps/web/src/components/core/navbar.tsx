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
label : 'Warp',
href : '/warp/dev0jha/2025'
},

]

export default function Navbar() {
  return (
    <Container className='py-4 px-4'>
        <div className='flex justify-between items-center '>
            {/*Logo and Nav Items*/}
         <div className='flex items-baseline gap-4'>
            <Image className='size-12'
             src="/logo.webp" 
             alt="Codewrap"
             width={100} 
             height={100} />
             {
               navitems.map((items)=>{
                return(
                    <Link key={items.label} href={items.href}>
                    <span className='text-sm font-medium text-gray-500 hover:text-gray-700 hidden md:block'>{items.label}</span>
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
  )
}
