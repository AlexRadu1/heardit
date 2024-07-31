import NextAuth, { type DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import Credential from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

import Google from "next-auth/providers/Google";
import Spotify from "next-auth/providers/spotify";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Spotify({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,streaming,user-read-private,user-read-playback-state,user-modify-playback-state,user-library-read,user-library-modify,user-read-currently-playing",
    }),
    Credential({
      async authorize(credentials) {
        const valdidatedFields = LoginSchema.safeParse(credentials);

        if (valdidatedFields.success) {
          const { email, password } = valdidatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, account }) {
      if (account?.provider === "spotify") {
        token.spotify = {
          expires_at: account.expires_at ?? 0,
          refresh_token: account.refresh_token!,
          access_token: account.access_token!,
        };
      }

      return token;
    },
    async session({ token, session }) {
      if (!token) return session;

      return {
        expires: session.expires,
        user: session.user,
        token: token,
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  // debug: true,
});
