import authSeller from "@/app/lib/authseller";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Address from "../../../../../models/address";
import Order from "../../../../../models/order";

export async function GET(request:NextRequest) {
    try {
        const {userId} = getAuth(request)
        const isSeller = await authSeller(userId)

        if(!isSeller) {
            return NextResponse.json({success:false, message: 'Not authorized'})
        }

        await connectDB()
        Address.length
        const orders = await Order.find({}).populate('address items.product')
        return NextResponse.json({success: true, orders})
    } catch (error:unknown) {
        console.error("API Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown internal server error occurred";
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}