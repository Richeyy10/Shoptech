import connectDB from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: "User Not Found" });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    console.error("API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown internal server error occurred";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}