import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const profile = await prisma.profile.findFirst({
    where: {
      user: {
        username: params.username,
      },
      isPublic: true,
    },
    include: {
      socialLinks: true,
      customLinks: true,
      musicPlayer: true,
    },
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
