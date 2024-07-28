import "../(home)/globals.css";
import { ClerkProvider } from "@/app/components/clerk-provider";
import { ThemeProvider } from "@/app/components/theme-provider";

export const metadata = {
  title: "Authentication",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-[100vh] w-[100vw] items-center justify-center">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>{children}</ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
