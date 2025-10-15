'use client';
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { FiSearch } from "react-icons/fi";
import { Product } from "@/assets/types";



export default function Shop() {
    const { products } = useAppContext();

    const [searchTerm, setSearchTerm] = useState('');

    const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setDisplayedProducts(products);
            return;
        }

        const handler = setTimeout(() => {
            const lowerCaseQuery = searchTerm.toLowerCase();

            const results = products.filter((product: Product) =>
                product.name.toLowerCase().includes(lowerCaseQuery) ||
                product.category.toLowerCase().includes(lowerCaseQuery)
            );

            setDisplayedProducts(results);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, products]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex gap-4">
                    <div className="flex flex-col items-end pt-12">
                        <p className="text-2xl font-medium dark:text-white">All Products</p>
                        <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                    </div>

                    <div className="mt-10 mb-4 flex items-center rounded-lg max-w-lg dark:bg-gray-800 dark:border-gray-700">
                        <FiSearch className="ml-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search for a product"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-10 p-3 rounded-lg focus:outline-none dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                {displayedProducts.length === 0 && searchTerm.trim() !== '' ? (
                    <p className="text-lg text-red-500 mt-8 pb-14">
                        No products found matching "{searchTerm}".
                    </p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
                        {displayedProducts.map((product: Product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}