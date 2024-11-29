import { NextRequest, NextResponse } from "next/server";
import { incrementViewCount } from "@/services/viewService";

export async function POST(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const count = await incrementViewCount(ip);
  return NextResponse.json({ count });
}
