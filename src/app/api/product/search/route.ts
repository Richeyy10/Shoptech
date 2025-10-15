import connectDB from "@/config/db";
import Product from "../../../../../models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const query = url.searchParams.get('q'); 

        if (!query) {
            return NextResponse.json({ success: true, products: [] });
        }

        await connectDB();

        const searchPattern = new RegExp(query, 'i'); 

        const products = await Product.find({
            $or: [
                { name: { $regex: searchPattern } },
                { description: { $regex: searchPattern } }
            ]
        });

        return NextResponse.json({ success: true, products });
    } catch (error:unknown) {
        console.error("API Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown internal server error occurred";
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}