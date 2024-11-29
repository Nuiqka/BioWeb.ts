import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function incrementViewCount() {
  const viewCount = await prisma.viewCount.findFirst();
  if (viewCount) {
    return prisma.viewCount.update({
      where: { id: viewCount.id },
      data: { count: viewCount.count + 1 },
    });
  } else {
    return prisma.viewCount.create({
      data: { count: 1 },
    });
  }
}

export async function getViewCount(): Promise<number> {
  const viewCount = await prisma.viewCount.findFirst();
  return viewCount?.count || 0;
}
