import Container from "@/components/core/Container";
import Footer from "@/components/core/Footer";
import GenerateWrap from "@/components/core/GenerateWrap";
import Hero from "@/components/core/Hero";
import Navbar from "@/components/core/navbar";
import StarBorders from "@/components/pixel-perfect/star-border";
import SchematicBackground from "@/components/core/SchematicBackground";
import { cn } from "@/lib/utils";

import React from "react";

function SectionFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative py-1 sm:py-2 mb-4 sm:mb-6">
      <div className="mx-auto max-w-7xl px-0 sm:px-1">
        <StarBorders
          className="bg-background/10 border-[rgba(255,255,255,0.12)]"
          contentClassName="h-full"
        >
          {children}
        </StarBorders>
      </div>
    </section>
  );
}

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
            "-translate-x-16",
            "h-full w-10 sm:w-14",
            "border-r border-[rgba(255,255,255,0.08)]",
            "bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_10px)]",
          )}
        />

        {/* Right Side Decorative Border */}
        <div
          className={cn(
            "pointer-events-none",
            "absolute inset-y-0 right-0 hidden sm:block",
            "z-10",
            "translate-x-16",
            "h-full w-10 sm:w-14",
            "border-l border-[rgba(255,255,255,0.08)]",
            "bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_10px)]",
          )}
        />

        <Navbar />
        <div className="mb-4 sm:mb-6" />
        <SectionFrame>
          <Hero />
        </SectionFrame>
        <SectionFrame>
          <GenerateWrap />
        </SectionFrame>
        <SectionFrame>
          <Footer />
        </SectionFrame>
      </Container>
    </main>
  );
}

export default page;
