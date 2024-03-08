import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getSpotifyToken(user: User | null) {
  let accessToken: string | undefined;
  if (user) {
    const oAuthToken = await clerkClient.users.getUserOauthAccessToken(
      user?.id,
      "oauth_spotify",
    );
    if (oAuthToken.length !== 0) accessToken = oAuthToken[0].token;
  }
  return accessToken;
}
