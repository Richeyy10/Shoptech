import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import User from "../../../../../models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const {userId} = getAuth(request)
        const { cartData} = await request.json()
        await connectDB()
        const user = await User.findById(userId)
        user.cartItems = cartData
        await user.save()

        return NextResponse.json({success: true})
    } catch (error:unknown) {
        console.error("API Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown internal server error occurred";
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}