'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/data/products';
import { getFeaturedProducts } from '@/lib/productService';
import { supabase } from '@/lib/supabase';

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const data = await getFeaturedProducts();
            setProducts(data);
        } catch (err) {
            console.error('Failed to load featured products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();

        // Realtime subscription
        const channel = supabase
            .channel('realtime-featured-products')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'products' },
                () => {
                    loadProducts();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <section className="py-16 bg-[#111827]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-500/10 text-orange-500 p-2 rounded-xl">
                            <Flame size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                                Produk Terlaris
                            </h2>
                            <p className="text-gray-400 mt-1">Produk paling diminati minggu ini</p>
                        </div>
                    </div>
                    <Link
                        href="/produk?sort=best_seller"
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
                        href="/produk?sort=best_seller"
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
