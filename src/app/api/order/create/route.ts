import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "../../../../../models/product";
import { inngest } from "@/config/inngest";
import User from "../../../../../models/user";

export async function POST(request:any) {
    try {
        const {userId} = getAuth(request)
        const {address, items } = await request.json()

        if(!address || items.length === 0) {
            return NextResponse.json({success: false, message: 'Invalid data'})
        } 

        // calculate amount using items

        const amount = await items.reduce(async (acc:any, item:any) => {
            const product = await Product.findById(item.product)
            return acc + product.offerPrice * item.quantity
        }, 0)

        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                address,
                items,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now()
            }
        })

        // clear user cart
        const user = await User.findById(userId)
        user.cartItems = {}
        await user.save()

        return NextResponse.json({success: true, message: 'Order Placed'})
    } catch (error:any) {
        return NextResponse.json({success: false, message: error.message})
    }
}