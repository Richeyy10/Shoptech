'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs"; // ⬅️ Added useUser
import { useAppContext } from "@/context/AppContext";

// --- Imports for Assets (assuming they are correct) ---
import logo from "../assets/images/logo.png";
// import black_logo from "../assets/images/Shoptech-2.png"; // Not used, can be removed
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "../assets/assets.js";
import ThemeSwitch from "./themeswitch";

// --- NavLink Component ---
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

// --- Navbar Component ---
export default function Navbar() {
    // ⚠️ Replaced 'user' from useAppContext with 'isSignedIn' from useUser for reliability.
    const { isSeller } = useAppContext(); 
    const router = useRouter(); // Use useRouter from next/navigation
    const { openSignIn } = useClerk();
    const { isSignedIn } = useUser(); // ✅ Best practice for checking auth status

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

                {/* --- Desktop User/Account Section --- */}
                <ul className="hidden md:flex items-center gap-4 ">
                    <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
                    {isSignedIn 
                        ? (
                            // ✅ User is Signed In: Show the UserButton
                            <UserButton>
                                {/* 💡 Best Practice: Consolidate actions into a single MenuItems block */}
                                <UserButton.MenuItems>
                                    <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                                    <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                                </UserButton.MenuItems>
                            </UserButton>
                        ) 
                        : (
                            // ✅ User is Signed Out: Show the Sign In Button
                            <button 
                                onClick={() => openSignIn()} // ⬅️ Correctly calls the function
                                className="flex items-center gap-2 hover:text-gray-900 transition"
                            >
                                <Image src={assets.user_icon} alt="user icon" />
                                Account
                            </button>
                        )
                    }
                </ul>
                
                {/* --- Mobile User/Account Section --- */}
                <div className="flex items-center md:hidden gap-3">
                    <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
                    {isSignedIn 
                        ? (
                            // ✅ User is Signed In: Show the UserButton (for mobile menu)
                            <UserButton>
                                {/* 💡 Best Practice: Consolidate actions into a single MenuItems block */}
                                <UserButton.MenuItems>
                                    <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
                                    <UserButton.Action label="Shop" labelIcon={<BoxIcon />} onClick={() => router.push('/shop')} />
                                    <UserButton.Action label="Contact" labelIcon={<CartIcon />} onClick={() => router.push('/contact')} /> {/* Corrected contact path */}
                                    <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                                    <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                                </UserButton.MenuItems>
                            </UserButton>
                        ) 
                        : (
                            // ✅ User is Signed Out: Show the Sign In Button
                            <button 
                                onClick={() => openSignIn()} // ⬅️ Correctly calls the function
                                className="flex items-center gap-2 hover:text-gray-900 transition"
                            >
                                <Image src={assets.user_icon} alt="user icon" />
                                Account
                            </button>
                        )
                    }
                </div> 
            </nav>
        </>
    )
}
