'use client';
import React from "react";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import black_logo from "../assets/images/Shoptech-2.png";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "../assets/assets.js";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import ThemeSwitch from "./themeswitch";
import { useClerk, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
    const currentPath = usePathname();
    const isActive = currentPath === href;

    const activeClasses = isActive 
        ? "text-orange-600 dark:text-orange-600 underline decoration-orange-600 decoration-2 underline-offset-4" 
        : "hover:text-orange-600 dark:text-white dark:hover:text-orange-600";

    const baseClasses = "transition";

    return (
        <Link href={href} className={`${baseClasses} ${activeClasses}`}>
            {children}
        </Link>
    );
};

export default function Navbar() {
    const { isSeller, router, user } = useAppContext();
    const { openSignIn } = useClerk();

    return (
        <>
            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
                <Link href="/">
                    <Image
                        className="cursor-pointer w-11 md:w-28"
                        src={logo}
                        alt="logo"
                    />
                </Link>
                <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
                    <NavLink href="/" >
                        Home
                    </NavLink>
                    <NavLink href="/shop" >
                        Shop
                    </NavLink>
                    <NavLink href="/contact" >
                        Contact
                    </NavLink>
                </div>

                <ThemeSwitch />


                <ul className="hidden md:flex items-center gap-4 ">
                    <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
                    {user 
                        ? <>   
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action label = "Cart" labelIcon = {<CartIcon />} onClick = {() => router.push('/cart')} />
                                </UserButton.MenuItems>
                                <UserButton.MenuItems>
                                    <UserButton.Action label = "My Orders" labelIcon = {<BagIcon />} onClick = {() => router.push('/my-orders')} />
                                </UserButton.MenuItems>
                            </UserButton> 
                        </> 
                    : <button onClick={()=> {openSignIn} } className="flex items-center gap-2 hover:text-gray-900 transition">
                        <Image src={assets.user_icon} alt="user icon" />
                        Account
                    </button>}
                </ul>
                
                <div className="flex items-center md:hidden gap-3">
                    {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
                    {user 
                        ? <>   
                            <UserButton>
                            <UserButton.MenuItems>
                                    <UserButton.Action label = "Home" labelIcon = {<HomeIcon />} onClick = {() => router.push('/')} />
                                </UserButton.MenuItems>
                                <UserButton.MenuItems>
                                    <UserButton.Action label = "Shop" labelIcon = {<BoxIcon />} onClick = {() => router.push('/shop')} />
                                </UserButton.MenuItems>
                                <UserButton.MenuItems>
                                    <UserButton.Action label = "Contact" labelIcon = {<CartIcon />} onClick = {() => router.push('/')} />
                                </UserButton.MenuItems>
                                <UserButton.MenuItems>
                                    <UserButton.Action label = "Cart" labelIcon = {<CartIcon />} onClick = {() => router.push('/cart')} />
                                </UserButton.MenuItems>
                                <UserButton.MenuItems>
                                    <UserButton.Action label = "My Orders" labelIcon = {<BagIcon />} onClick = {() => router.push('/my-orders')} />
                                </UserButton.MenuItems>
                            </UserButton> 
                        </> 
                        : <button onClick={()=> {openSignIn}} className="flex items-center gap-2 hover:text-gray-900 transition">
                        <Image src={assets.user_icon} alt="user icon" />
                        Account
                    </button>}
                </div> 
            </nav>
        </>
    )
}
