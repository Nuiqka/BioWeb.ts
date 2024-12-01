import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.profile.update({
    where: { id: session.user.profileId },
    data: {
      isSpotifyEnabled: false,
      spotifyAccessToken: null,
      spotifyRefreshToken: null,
    },
  });

  return NextResponse.json({ message: "Spotify disconnected successfully" });
}
