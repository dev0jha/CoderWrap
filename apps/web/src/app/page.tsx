import Container from "@/components/core/Container";
import Footer from "@/components/core/Footer";
import GenerateWrap from "@/components/core/GenerateWrap";
import Hero from "@/components/core/Hero";
import Navbar from "@/components/core/navbar";
import SchematicBackground from "@/components/core/SchematicBackground";
import { cn } from "@/lib/utils";

import React from "react";

function page() {
  return (
    <main className="relative min-h-screen bg-[#121212]">
      <SchematicBackground />
      <Container className="relative">
        {/* Left Side Decorative Border */}
        <div
          className={cn(
            "pointer-events-none",
            "absolute inset-y-0 left-0 hidden sm:block",
            "z-10",
            "-translate-x-14",
            "h-full w-10 sm:w-14",
            "border-r border-[rgba(255,255,255,0.1)]",
            "bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_10px)]",
          )}
        />

        {/* Right Side Decorative Border */}
        <div
          className={cn(
            "pointer-events-none",
            "absolute inset-y-0 right-0 hidden sm:block",
            "z-10",
            "translate-x-14",
            "h-full w-10 sm:w-14",
            "border-l border-[rgba(255,255,255,0.1)]",
            "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_10px)]",
          )}
        />

        <Navbar />
        <Hero />
        <GenerateWrap />
        <Footer />
      </Container>
    </main>
  );
}

export default page;
