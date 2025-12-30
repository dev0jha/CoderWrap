import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/core/theme-provider";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500","600","700","800","900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CodeWrap",
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
  description: "CoderWrap generates a GitHub Wrapped-style yearly summary for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
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
