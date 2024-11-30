import { prisma } from "@/lib/prisma";

export async function getSocialLinks() {
  return prisma.socialLink.findMany();
}

export async function getCustomLinks() {
  return prisma.customLink.findMany();
}

export async function createSocialLink(data: any) {
  return prisma.socialLink.create({ data });
}

export async function createCustomLink(data: any) {
  return prisma.customLink.create({ data });
}

export async function updateSocialLink(id: number, data: any) {
  return prisma.socialLink.update({ where: { id }, data });
}

export async function updateCustomLink(id: number, data: any) {
  return prisma.customLink.update({ where: { id }, data });
}

export async function deleteSocialLink(id: number) {
  return prisma.socialLink.delete({ where: { id } });
}

export async function deleteCustomLink(id: number) {
  return prisma.customLink.delete({ where: { id } });
}
