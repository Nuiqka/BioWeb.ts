import {
  createViewCount,
  getViewCount as getDbViewCount,
  getUserIdByIp,
} from "@/models/viewCount";
import { generateUserId } from "@/lib/utils";

export async function incrementViewCount(ip: string) {
  let userId = await getUserIdByIp(ip);
  if (!userId) {
    userId = generateUserId();
    await createViewCount(ip, userId);
  }
  return getViewCount();
}

export async function getViewCount() {
  return getDbViewCount();
}
