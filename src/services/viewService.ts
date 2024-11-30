import { prisma } from "@/lib/prisma";
import { generateUserId } from "@/lib/utils";

export async function incrementViewCount(ip: string) {
  const userId = generateUserId();

  await prisma.totalView.create({
    data: {
      ipAddress: ip,
      userId,
    },
  });

  const existingUniqueView = await prisma.uniqueView.findFirst({
    where: { ipAddress: ip },
  });

  if (!existingUniqueView) {
    await prisma.uniqueView.create({
      data: {
        ipAddress: ip,
        userId,
      },
    });
  }

  return getUniqueViewCount();
}

export async function getUniqueViewCount() {
  return prisma.uniqueView.count();
}

export async function getTotalViewCount() {
  return prisma.totalView.count();
}

export async function getViewStats() {
  const uniqueViews = await getUniqueViewCount();
  const totalViews = await getTotalViewCount();
  return { uniqueViews, totalViews };
}
