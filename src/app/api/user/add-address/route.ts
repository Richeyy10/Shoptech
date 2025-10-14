import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import Address from "../../../../../models/address";
import { NextResponse } from "next/server";

export async function POST(request:any) {
    try {
        const { userId } = getAuth(request)
        const { address } = await request.json()
        await connectDB()
        const newAddress = await Address.create({...address,userId})
        return NextResponse.json({success: true, message: "Address added successfully", newAddress})
    } catch (error:any) {
        return NextResponse.json({success: false, message: error.message})
    }
}