import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import Address from "../../../../../models/address";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const {userId} = getAuth(request)
        await connectDB()
        const addresses = await Address.find({userId})
        return NextResponse.json({success: true, addresses})
    } catch (error:unknown) {
        console.error("API Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown internal server error occurred";
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}