import React, { Suspense } from 'react'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import SearchContent from '@/components/SearchContent';


export default function SearchPage() {
    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32">
                <Suspense fallback={
                    <div className="py-12 min-h-[60vh]">
                        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
                            Search Results...
                        </h1>
                        <p className="text-lg text-gray-500">Initializing search component...</p>
                    </div>
                }>
                    <SearchContent />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}