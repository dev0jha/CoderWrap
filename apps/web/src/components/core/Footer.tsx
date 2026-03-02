import React from "react";
import Container from "./Container";
import { Github, Twitter, Globe } from "lucide-react";

export default function Footer() {
  return (
    <div className="border-t border-border mt-24">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between py-16 gap-8 border-t border-border mt-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-geist-mono">
            © 2025 CODEWRAP // ALL_RIGHTS_RESERVED
          </p>
          <div className="flex items-center gap-10">
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
                className="text-[10px] uppercase tracking-widest font-geist-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <link.icon className="w-3 h-3 grayscale opacity-50" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
