import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { cn } from "../../lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "../../components/themeToggle";
import { auth, signOut } from "@/auth";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Home",
  description: "Homepage for heardit, a platform to share and discuss music!",
};

interface SessionProps {
  session: Session | null;
}

function Header({ session }: SessionProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b-[1px]  px-1.5 dark:border-y-slate-500">
      <div className="flex gap-4">
        <Link href={"/"}>Home</Link>
      </div>
      <div className="flex items-center justify-center gap-2">
        {session ? (
          <div className="flex ">
            <Link
              href={"/submit"}
              title="Create post"
              aria-label="Create post"
              className="p-2"
            >
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
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="flex"
            >
              <button type="submit">Sign out</button>
            </form>
          </div>
        ) : (
          <LoginButton>
            <Button variant="secondary">Login</Button>
          </LoginButton>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(session);

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
          <Header session={session} />
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
