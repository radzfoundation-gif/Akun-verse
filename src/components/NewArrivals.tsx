"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";
import { getNewArrivals } from "@/lib/productService";

export default function NewArrivals() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getNewArrivals();
            setProducts(data);
        } catch (err) {
            console.error("Failed to load new arrivals:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-12 bg-[#111827]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#FACC15]/10 text-[#FACC15] p-2 rounded-xl">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                                Produk Terbaru
                            </h2>
                            <p className="text-gray-400 mt-1">
                                Item game dan software paling fresh!
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/produk?sort=newest"
                        className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#FACC15] hover:text-[#EAB308] transition-colors"
                    >
                        <span>Lihat Semua</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-[#FACC15] animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {/* Mobile See All */}
                <div className="mt-6 sm:hidden">
                    <Link
                        href="/produk?sort=newest"
                        className="flex items-center justify-center gap-1 text-sm font-medium text-[#FACC15] hover:text-[#EAB308] transition-colors"
                    >
                        <span>Lihat Semua Produk</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
