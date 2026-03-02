import type { Metadata } from "next";
import { Syne, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/core/theme-provider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CodeWrap",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
  description:
    "CoderWrap generates a GitHub Wrapped-style yearly summary for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${geistMono.variable} antialiased font-syne selection:bg-foreground selection:text-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
