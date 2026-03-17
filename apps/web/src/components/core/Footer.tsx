import React from "react";
import Container from "./Container";
import { Github, Twitter, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between py-12 lg:py-16 gap-10">
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-geist-mono">
              © 2025 CODEWRAP // ALL_RIGHTS_RESERVED
            </p>
          </div>
          <nav className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center">
            {[
              {
                icon: Github,
                href: "https://github.com/dev0jha",
                label: "GITHUB",
              },
              {
                icon: Twitter,
                href: "https://twitter.com/dev0jha",
                label: "TWITTER",
              },
              { icon: Globe, href: "https://devfolio.tech", label: "DOMAIN" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-widest font-geist-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
              >
                <link.icon className="w-3 h-3 grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
