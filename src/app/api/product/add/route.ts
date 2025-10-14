import authSeller from "@/app/lib/authseller";
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary"; 
import { NextRequest, NextResponse } from "next/server";
import Product from "../../../../../models/product";

interface CloudinaryUploadResult {
    secure_url: string;
    [key: string]: any; // Allows for additional, unused properties
}

// Configure cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST (request:NextRequest) {
    try {
        const {userId} = getAuth(request)
        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({success: false, message: 'not authorized'})
        }

        const formData = await request.formData()
        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const files = formData.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json({success: false, message: 'no files uploaded'})
        }

        const imageFiles: File[] = files.filter((entry): entry is File => 
            typeof entry !== 'string'
        );
        
        if (imageFiles.length === 0) {
            return NextResponse.json({success: false, message: 'no valid image files uploaded'}, {status: 400})
        }

        const result:  CloudinaryUploadResult[] = await Promise.all(
            imageFiles.map(async (files: File) => {
                const arrayBuffer = await files.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                return new Promise<CloudinaryUploadResult>((resolve, reject)=> {
                    const stream = cloudinary.uploader.upload_stream(
                        {resource_type: 'auto'},
                        (error: Error | undefined, result: CloudinaryUploadResult | undefined) => {
                            if (error || !result) {
                                reject(error || new Error("Cloudinary upload failed: result missing."))
                            } else {
                                resolve(result)
                            }
                        }
                    )
                    stream.end(buffer)
                })
            })
        )

        const image = result.map(result => result.secure_url)
        await connectDB()
        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            price:Number(price),
            offerPrice:Number(offerPrice),
            image,
            date: Date.now()
        })

        return NextResponse.json({ success: true, message: 'Upload successful', newProduct })

    } catch (error:unknown) {
        console.error("API Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown internal server error occurred";
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}