import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProfile(profileId: string) {
  if (!profileId) {
    throw new Error("Profile ID is required");
  }
  return prisma.profile.findUnique({
    where: { id: profileId },
    include: {
      socialLinks: true,
      customLinks: true,
      musicPlayer: true,
    },
  });
}
