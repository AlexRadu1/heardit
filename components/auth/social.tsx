"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SlSocialSpotify } from "react-icons/sl";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { auth } from "@/auth";

export function Social() {
  const onClick = (provider: "google" | "github" | "spotify") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("spotify")}
      >
        <SlSocialSpotify className="h-5 w-5 bg-[#1ed760] rounded-full" />
      </Button>
      <div className="border-s-emerald-50"></div>
    </div>
  );
}
