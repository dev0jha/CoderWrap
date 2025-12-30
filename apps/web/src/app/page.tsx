import Container from '@/components/core/Container'
import Footer from '@/components/core/Footer'
import GenerateWrap from '@/components/core/GenerateWrap'
import Hero from '@/components/core/Hero'
import Navbar from "@/components/core/navbar";

import React from 'react'

function page() {
  return (
    <Container>
      <Navbar />
       <Hero />
     <GenerateWrap />
     <Footer />
    </Container>
  )
}

export default page
