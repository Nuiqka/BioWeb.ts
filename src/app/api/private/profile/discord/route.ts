import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { isEnabled } = await request.json();

  await prisma.profile.update({
    where: { id: session.user.profileId },
    data: { isDiscordEnabled: isEnabled },
  });

  return NextResponse.json({
    message: "Discord integration updated successfully",
  });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { discordId } = await request.json();

  await prisma.profile.update({
    where: { id: session.user.profileId },
    data: { discordId },
  });

  return NextResponse.json({ message: "Discord ID updated successfully" });
}
