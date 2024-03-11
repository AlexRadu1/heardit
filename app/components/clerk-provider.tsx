"use client";

import { ClerkProvider as ImportedClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Suspense } from "react";

export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  if (theme === "dark") {
    return (
      <Suspense fallback={<p>loading...</p>}>
        <ImportedClerkProvider appearance={{ baseTheme: dark }}>
          {children}
        </ImportedClerkProvider>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<p>loading...</p>}>
      <ImportedClerkProvider>{children}</ImportedClerkProvider>
    </Suspense>
  );
};
