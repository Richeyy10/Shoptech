'use client';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";

import logo from "../assets/images/logo.png";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "../assets/assets.js";
import ThemeSwitch from "./themeswitch";
import { FiSearch } from "react-icons/fi";
import { Product } from "@/assets/types";

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
    const { isSeller } = useAppContext();
    const router = useRouter(); // Use useRouter from next/navigation
    const { openSignIn } = useClerk();
    const { isSignedIn } = useUser(); // ✅ Best practice for checking auth status
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]); 

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        const handler = setTimeout(() => {
            fetchSearchResults(query);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const fetchSearchResults = async (searchQuery: string) => {
        const response = await fetch(`/api/product/search?q=${searchQuery}`);
        if (!response.ok) {
            console.error("Search API failed:", response.statusText);
            setResults([]);
            return;
        }
        const data = await response.json();
        const results = data.products || [];
    };

    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim() !== '') {
            e.preventDefault();
            if (results.length === 1) {
                const product = results[0];
                // Redirect to single product page
                router.push(`/product/${product._id}`);
            } else {
                // Navigate to search results page for zero or multiple results
                router.push(`/search?q=${query}`);
            }
            setIsSearchVisible(false);
            setQuery('');
            setResults([]);
        }
    };
    const handleSearchClick = () => {
        setIsSearchVisible(prev => !prev);
        if (!isSearchVisible) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

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


                {/* --- Desktop User/Account Section --- */}
                <ul className="hidden md:flex items-center gap-4 ">
                    <ThemeSwitch />
                    <div className="flex gap-4">
                        <button
                            onClick={handleSearchClick}
                            className="search-icon-button"
                            aria-label="Toggle Search Input"
                        >
                            <FiSearch className="ml-3 text-gray-500" />
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearchSubmit}
                            className={`
                                    transition-all duration-300 ease-in-out 
                                    h-10 rounded-lg p-2 text-black dark:text-white dark:bg-gray-800
                                    ${isSearchVisible ? 'w-48 opacity-100 mr-2' : 'w-0 opacity-0'} 
                                `}
                            onBlur={() => {
                                setIsSearchVisible(false);
                            }
                            }
                        />
                    </div>
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
                    <ThemeSwitch />
                    <div className="flex gap-4">
                        <button
                            onClick={handleSearchClick}
                            className="search-icon-button"
                            aria-label="Toggle Search Input"
                        >
                            <FiSearch />
                        </button>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearchSubmit}
                            className={`
                                    transition-all duration-300 ease-in-out 
                                    h-10 border border-gray-300 rounded-lg p-2 text-black dark:text-white
                                    ${isSearchVisible ? 'w-48 opacity-100 mr-2' : 'w-0 opacity-0'} 
                                `}
                            onBlur={() => {
                                setIsSearchVisible(false);
                            }
                            }
                        />
                    </div>
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
