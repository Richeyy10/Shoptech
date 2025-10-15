'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard'; 
import { Product } from '@/assets/types';


export default function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || ''; 
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setProducts([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/product/search?q=${query}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Search fetch error:", error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="py-12 min-h-[60vh]">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
                Search Results for: <span className="text-orange-600">&quot;{query}&quot;</span>
            </h1>

            {isLoading ? (
                <p className="text-lg text-gray-500">Loading results...</p>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-lg text-red-500">
                    No products found matching &quot;{query}&quot;.
                </p>
            )}
        </div>
    );
}