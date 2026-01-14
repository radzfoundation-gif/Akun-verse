"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Percent, Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { getPromoProducts } from '@/lib/productService';

export default function PromoSection() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getPromoProducts();
            setProducts(data);
        } catch (err) {
            console.error('Failed to load promo products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-16 bg-gradient-to-br from-[#111827] via-[#1F2933] to-[#111827]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500/10 text-red-500 p-2 rounded-xl">
                            <Percent size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                                Promo & Diskon
                            </h2>
                            <p className="text-gray-400 mt-1">Hemat hingga 70% untuk produk pilihan</p>
                        </div>
                    </div>
                    <Link
                        href="/promo"
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
