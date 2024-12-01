import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = parseInt(params.id);
  const link = await prisma.socialLink.findUnique({
    where: { id },
    include: { profile: { include: { user: true } } },
  });

  if (!link || link.profile.user.id !== session.user.id) {
    return NextResponse.json(
      { error: "Not found or not authorized" },
      { status: 404 }
    );
  }

  await prisma.socialLink.delete({ where: { id } });
  return NextResponse.json({ message: "Link deleted successfully" });
}
