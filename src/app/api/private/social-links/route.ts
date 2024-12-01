import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = await prisma.socialLink.findMany({
    where: { profile: { user: { id: session.user.id } } },
  });
  return NextResponse.json(links);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const profile = await prisma.profile.findUnique({
    where: { user: { id: session.user.id } },
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const newLink = await prisma.socialLink.create({
    data: {
      ...data,
      profileId: profile.id,
    },
  });

  return NextResponse.json(newLink);
}
