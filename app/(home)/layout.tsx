import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import Script from "next/script";
import { cn } from "../lib/utils";

import { ThemeProvider } from "@/app/components/theme-provider";
import { ModeToggle } from "../components/ui/themeToggle";
import { Button } from "../components/ui/button";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Home",
  description: "Homepage for heardit, a platform to share and discuss music!",
};

function Header() {
  return (
    <div className="flex h-16 items-center justify-between border-b-[1px]  px-1.5 dark:border-y-slate-500">
      <div className="flex gap-4">
        <Link href={"/"}>Home</Link>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link href={"/submit"} title="Create post" aria-label="Create post">
          <svg
            className="h-6 w-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
        <Script
          src="https://sdk.scdn.co/spotify-player.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
