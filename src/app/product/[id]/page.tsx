'use client';
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import ProductCard from "@/components/ProductCard";
import {assets} from "@/assets/assets";
import { Product } from '@/assets/types';
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";

export default function Products () {

    const { id } = useParams();

    const { products, router, addToCart } = useAppContext() as {
        products: Product[];
        router: any;
        addToCart: (id: string) => void; 
    }

    const [mainImage, setMainImage] = useState<string | null>(null);
    const [productData, setProductData] = useState<Product | null> (null);

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product !== undefined ? product : null);
    }

    useEffect(() => {
        if (id && products.length > 0) {
         fetchProductData();   
        }
    }, [id, products.length])

    // useEffect(() => {
    //     if (productData) {
    //         console.log("Product Data:", productData);
    //         setMainImage(productData.image[0]);
    //     }
    // }, [productData]);

    useEffect(() => {
        if (productData && productData.image.length > 0) {
            const firstImage = productData.image[0];
    
            if (typeof firstImage === 'string') {
                setMainImage(firstImage);
            } else {
                setMainImage(firstImage.src);
            }
        }
    }, [productData]);

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 dark:bg-[#D3D3D3] mb-4">
                        <Image
                            src={mainImage || productData.image[0]}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image:StaticImageData | string, index:number) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(typeof image === 'string' ?  image : image.src)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 dark:bg-[#D3D3D3]"
                            >
                                <Image
                                    src={image}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 dark:text-white mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="text-gray-600 dark:text-white mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        ${productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 dark:text-white line-through ml-2">
                            ${productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 dark:text-white font-medium">Brand</td>
                                    <td className="text-gray-800/50 dark:text-white ">Generic</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 dark:text-white font-medium">Color</td>
                                    <td className="text-gray-800/50 dark:text-white ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 dark:text-white font-medium">Category</td>
                                    <td className="text-gray-800/50 dark:text-white">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button onClick={() => addToCart(productData._id.toString())} className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(productData._id.toString()); router.push('/cart') }} className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                    <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
}