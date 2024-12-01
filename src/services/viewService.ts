import { prisma } from "@/lib/prisma";
import { generateUserId } from "@/lib/utils";

export async function incrementViewCount(ip: string, profileId: string) {
  try {
    const userId = generateUserId();

    await prisma.totalView.create({
      data: {
        ipAddress: ip,
        userId,
        profileId,
      },
    });

    const existingUniqueView = await prisma.uniqueView.findFirst({
      where: { ipAddress: ip, profileId },
    });

    if (!existingUniqueView) {
      await prisma.uniqueView.create({
        data: {
          ipAddress: ip,
          userId,
          profileId,
        },
      });
    }
  } catch (error) {
    console.error("Error incrementing view count:", error);
    throw new Error("Failed to increment view count");
  }
}

export async function getViewStats(profileId: string) {
  try {
    const uniqueViews = await prisma.uniqueView.count({
      where: { profileId },
    });

    const totalViews = await prisma.totalView.count({
      where: { profileId },
    });

    return { uniqueViews, totalViews };
  } catch (error) {
    console.error("Error getting view stats:", error);
    throw new Error("Failed to get view stats");
  }
}
