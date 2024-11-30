import { NextRequest, NextResponse } from "next/server";
import { incrementViewCount } from "@/services/viewService";

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";
  const count = await incrementViewCount(ip);
  return NextResponse.json({ count });
}
