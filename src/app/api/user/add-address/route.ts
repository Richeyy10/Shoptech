import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import Address from "../../../../../models/address";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const { userId } = getAuth(request)
        const { address } = await request.json()
        await connectDB()
        const newAddress = await Address.create({...address,userId})
        return NextResponse.json({success: true, message: "Address added successfully", newAddress})
    } catch (error:unknown) {
        console.error("API Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown internal server error occurred";
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}