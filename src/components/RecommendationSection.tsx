'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { getRecommendations, ProductRecommendation, RecommendationResult } from '@/lib/recommendations';

export default function RecommendationSection() {
    const [result, setResult] = useState<RecommendationResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecommendations() {
            try {
                const data = await getRecommendations(5);
                setResult(data);
            } catch (error) {
                console.error('Failed to fetch recommendations:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchRecommendations();
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-12">
                        <Loader2 size={24} className="text-[#FACC15] animate-spin" />
                        <span className="ml-2 text-gray-400">Memuat rekomendasi...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (!result || result.products.length === 0) {
        return null;
    }

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#FACC15] to-orange-500 rounded-xl flex items-center justify-center">
                            <Sparkles size={20} className="text-[#111827]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Rekomendasi Untukmu</h2>
                            <p className="text-sm text-gray-400">{result.recommendationReason}</p>
                        </div>
                    </div>
                    <Link
                        href="/promo"
                        className="hidden sm:flex items-center gap-1 text-[#FACC15] text-sm font-medium hover:underline"
                    >
                        Lihat Semua
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {result.products.map((product) => (
                        <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="mt-4 sm:hidden">
                    <Link
                        href="/promo"
                        className="flex items-center justify-center gap-1 text-[#FACC15] text-sm font-medium"
                    >
                        Lihat Semua Produk
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ProductCard({
    product,
    formatPrice
}: {
    product: ProductRecommendation;
    formatPrice: (price: number) => string;
}) {
    return (
        <Link href={`/produk/${product.slug}`}>
            <div className="bg-[#1F2933] rounded-xl overflow-hidden border border-white/5 hover:border-[#FACC15]/30 transition-all hover:shadow-lg hover:shadow-[#FACC15]/5 group">
                {/* Image */}
                <div className="aspect-square bg-[#111827] relative overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Reason Badge */}
                    <div className="absolute top-2 left-2 right-2">
                        <span className="inline-block bg-[#FACC15]/90 text-[#111827] text-xs font-bold px-2 py-1 rounded-md truncate max-w-full">
                            {product.reason}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="p-3">
                    <h3 className="text-sm font-medium text-white line-clamp-2 mb-2 group-hover:text-[#FACC15] transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-[#FACC15] font-bold">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </div>
        </Link>
    );
}
