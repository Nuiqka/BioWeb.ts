import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect("/dashboard?error=spotify_auth_failed");
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    // Update user's profile with Spotify tokens
    await prisma.profile.update({
      where: { id: state },
      data: {
        spotifyAccessToken: access_token,
        spotifyRefreshToken: refresh_token,
        isSpotifyEnabled: true,
      },
    });

    return NextResponse.redirect("/dashboard?success=spotify_connected");
  } catch (error) {
    console.error("Spotify auth error:", error);
    return NextResponse.redirect("/dashboard?error=spotify_auth_failed");
  }
}
