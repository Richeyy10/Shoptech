import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

export default function Footer() {

    const date = new Date();
    const year = date.getFullYear();


    return(
        <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10">
      <div className="flex items-center gap-4">
        <Image className="hidden md:block w-24 mt-3" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500 dark:text-white">
          Copyright {year} © Rettix. All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="#">
          <Image src={assets.facebook_icon} alt="facebook_icon" className="bg-white rounded-3xl" />
        </a>
        <a href="#">
          <Image src={assets.twitter_icon} alt="twitter_icon" className="bg-white rounded-3xl" />
        </a>
        <a href="#">
          <Image src={assets.instagram_icon} alt="instagram_icon"className="bg-white rounded-3xl" />
        </a>
      </div>
    </div>
    )
}