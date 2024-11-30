import { prisma } from "@/lib/prisma";

export async function getProfile() {
  return prisma.profile.findFirst();
}

export async function updateProfile(data: any) {
  return prisma.profile.upsert({
    where: { id: 1 },
    update: data,
    create: data,
  });
}
