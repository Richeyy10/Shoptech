'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { FiSearch } from 'react-icons/fi';
import { Product } from '@/assets/types';

interface ProductDisplayProps {
    initialProducts: Product[];
}

export default function ProductDisplay({ initialProducts }: ProductDisplayProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);

    // 💡 Debouncing is still necessary here to avoid lag on every keystroke!
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredProducts(initialProducts); // Reset to all products if search is empty
            return;
        }

        const handler = setTimeout(() => {
            const lowerCaseQuery = searchTerm.toLowerCase();

            // Perform in-memory filtering on the initial list
            const results = initialProducts.filter(product =>
                product.name.toLowerCase().includes(lowerCaseQuery) ||
                product.category.toLowerCase().includes(lowerCaseQuery)
            );
            
            setFilteredProducts(results);
        }, 300); // 300ms is a fast, unnoticeable debounce delay

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, initialProducts]); // Recalculate when search term or initial products change

    return (
        <main>
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Shop</h1>

            {/* --- Filter Input Bar --- */}
            <div className="mb-8 flex items-center border border-gray-300 rounded-lg max-w-lg">
                <FiSearch className="ml-3 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Live search by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 p-3 rounded-lg focus:outline-none dark:bg-gray-800 dark:text-white"
                />
            </div>
            
            {/* --- Product Grid --- */}
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-300">
                Displaying {filteredProducts.length} results
            </h2>

            {filteredProducts.length === 0 && searchTerm.trim() !== '' ? (
                <p className="text-lg text-red-500">
                    No products found matching "{searchTerm}".
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </main>
    );
}