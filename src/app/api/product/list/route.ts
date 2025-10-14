import { NextResponse } from "next/server";
import Product from "../../../../../models/product";
import connectDB from "@/config/db";

export async function GET(request:any) {
    try {

        await connectDB()
        const products = await Product.find({})
        return NextResponse.json({success: true, products})

    } catch (error:any) {
        return NextResponse.json({success: false, message: error.message})
    }
}