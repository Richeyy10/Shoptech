import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const authSeller = async (userId: string | undefined | null): Promise<boolean> => {
    try {
        if (!userId) {
            console.warn("authSeller called with missing userId.");
            return false;
        }
        const client = await clerkClient()
        const user = await client.users.getUser(userId)

        if(user.publicMetadata?.role === 'seller') {
            return true;
        } else {
            return false;
        }
    } catch (error:any) {
        console.error("Clerk authSeller error:", error);
        return false;
    }
}

export default authSeller;