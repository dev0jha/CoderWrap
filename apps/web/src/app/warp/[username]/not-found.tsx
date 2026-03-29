import Link from "next/link";
import MetalButton from "@/components/pixel-perfect/metal-button";
import Container from "@/components/core/Container";
import SchematicBackground from "@/components/core/SchematicBackground";
import Navbar from "@/components/core/navbar";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#121212]">
      <SchematicBackground />
      <Navbar />
      <Container className="relative">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="space-y-8 max-w-lg">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-geist-mono">
                Error_404
              </p>
              <h1 className="text-5xl md:text-6xl font-syne font-bold uppercase tracking-tighter text-foreground leading-[0.85]">
                User Not
                <br />
                Found
              </h1>
            </div>

            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-geist-mono leading-relaxed">
              Could not locate a GitHub user with that handle. Verify the
              spelling and retry.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/">
                <MetalButton
                  metal="silver"
                  className="h-12 px-8 font-geist-mono text-[10px] uppercase tracking-widest w-full"
                >
                  Retry_Search
                </MetalButton>
              </Link>
              <Link href="https://github.com" target="_blank">
                <MetalButton
                  metal="gunmetal"
                  className="h-12 px-8 font-geist-mono text-[10px] uppercase tracking-widest w-full"
                >
                  Browse_GitHub
                </MetalButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
