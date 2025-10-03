'use client';
import React from "react";
import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Siderbar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <div>
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
    )
}