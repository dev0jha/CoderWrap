import React from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import GithubStar from "./GithubStar";
const navitems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Warp",
    href: "/warp/dev0jha/2025",
  },
];

export default function Navbar() {
  return (
    <div className="border-b border-border sticky top-0 bg-background/50 backdrop-blur-xl z-50">
      <Container className="py-3 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6 sm:gap-12">
            <Link
              href="/"
              className="text-lg font-bold tracking-tighter uppercase font-syne"
            >
              CODEWRAP
            </Link>
            <nav className="hidden sm:flex gap-8">
              {navitems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs uppercase tracking-widest font-geist-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="flex sm:hidden gap-4">
              {navitems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[10px] uppercase tracking-widest font-geist-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <GithubStar />
          </div>
        </div>
      </Container>
    </div>
  );
}
