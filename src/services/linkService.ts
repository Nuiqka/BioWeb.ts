import { prisma } from "@/lib/prisma";

export async function getSocialLinks(profileId: string) {
  return prisma.socialLink.findMany({ where: { profileId } });
}

export async function getCustomLinks(profileId: string) {
  return prisma.customLink.findMany({ where: { profileId } });
}

export async function createSocialLink(profileId: string, data: any) {
  return prisma.socialLink.create({ data: { ...data, profileId } });
}

export async function createCustomLink(profileId: string, data: any) {
  return prisma.customLink.create({ data: { ...data, profileId } });
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
