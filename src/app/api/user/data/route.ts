import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";

export async function GET(request:any) {
    try {
        const {userId} = getAuth(request)
        await connectDB()
        const user = await User.findById(userId)

        if(!user) {
            return NextResponse.json({success: false, message: "User Not Found"})
        }

        return NextResponse.json({success:true, user})
    } catch (error:any) { 
        return NextResponse.json({success: false, message: error.message})
    }
}