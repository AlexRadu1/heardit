import { NextRequest, NextResponse } from "next/server";
import { encode, getToken, type JWT } from "next-auth/jwt";

export const TOKEN_REFRESH_BUFFER_SECONDS = 60 * 5;

export function shouldUpdateToken(token: JWT): boolean {
  if (!token.spotify) return false;
  const timeInSeconds = Math.floor(Date.now() / 1000);
  return (
    timeInSeconds >= token.spotify.expires_at - TOKEN_REFRESH_BUFFER_SECONDS
  );
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const sessionCookie = "authjs.session-token"; // TODO set cookie accordingly if session is secure(https vs http)
  const response = NextResponse.next();
  if (!process.env.AUTH_SECRET) {
    throw new Error("auth secret env variable not set");
  }
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    salt: sessionCookie, // cookie name
  });
  // console.log("middleware token", token);

  if (token && shouldUpdateToken(token)) {
    try {
      const data = await fetch("https://accounts.spotify.com/api/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
          client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
          grant_type: "refresh_token",
          refresh_token: token!.spotify!.refresh_token,
        }),
        method: "POST",
      });
      const tokens = await data.json();
      if (!data.ok) throw tokens;
      console.log("spotify response data", tokens);
      const newSessionToken = await encode({
        secret: process.env.AUTH_SECRET,
        salt: sessionCookie,
        token: {
          ...token,
          spotify: {
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token,
            access_token: tokens.access_token,
          },
        },
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });

      response.cookies.set(sessionCookie, newSessionToken);
      return response;
    } catch (error) {
      console.error("Error refreshing access token", error);
      const newSessionToken = await encode({
        secret: process.env.AUTH_SECRET,
        salt: sessionCookie,
        token: {
          ...token,
          spotify: {
            error: "RefreshAccessTokenError",
          },
        },
      });
      response.cookies.set(sessionCookie, newSessionToken);
      return response;
    }
  }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
  ],
};
