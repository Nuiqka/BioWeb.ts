import { NextRequest, NextResponse } from "next/server";
import { incrementViewCount, getViewStats } from "@/services/viewService";

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";
  const { profileId } = await request.json();

  await incrementViewCount(ip, profileId);
  return NextResponse.json({ message: "View count incremented" });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get("profileId");

  if (!profileId) {
    return NextResponse.json(
      { error: "Profile ID is required" },
      { status: 400 }
    );
  }

  const stats = await getViewStats(profileId);
  return NextResponse.json(stats);
}
