import { NextResponse } from "next/server";
import { incrementViewCount, getViewCount } from "@/lib/viewCounter";

export async function POST() {
  await incrementViewCount();
  const count = await getViewCount();
  return NextResponse.json({ count });
}
