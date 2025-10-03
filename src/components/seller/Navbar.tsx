import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import ThemeSwitch from "../themeswitch";

export default function Navbar() {

    const { router } = useAppContext();

    return(
        <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
            <Image onClick={()=>router.push('/')} className='w-20 cursor-pointer' src={assets.logo} alt="" />
            <div className="flex">
                <div className="px-4 py-3 mr-6">
                    <ThemeSwitch />
                </div>
                <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
            </div>
        </div>
    )
}