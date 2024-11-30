import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function createAdmin(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
}

export async function verifyAdmin(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return false;
  return bcrypt.compare(password, admin.password);
}
