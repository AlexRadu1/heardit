"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const onCick = () => {
    router.push("/auth/login");
  };
  if (mode === "modal") return <span>Todo:implement modal</span>;
  return <span onClick={onCick}>{children}</span>;
};
