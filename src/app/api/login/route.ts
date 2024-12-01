import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "@/services/adminService";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const isValid = await verifyAdmin(username, password);

  if (isValid) {
    cookies().set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
    });
    return NextResponse.json({ message: "Logged in successfully" });
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
