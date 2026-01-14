'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/categories';

export default function CategoryGrid() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                            Kategori Produk
                        </h2>
                        <p className="text-gray-400 mt-1">Temukan produk digital yang kamu butuhkan</p>
                    </div>
                    <Link
                        href="/kategori"
                        className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#FACC15] hover:text-[#EAB308] transition-colors"
                    >
                        <span>Lihat Semua</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.id}
                                href={`/kategori/${category.slug}`}
                                className="group bg-[#1F2933] border border-white/5 rounded-2xl p-5 hover:border-[#FACC15]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 bg-[#111827] text-[#FACC15]`}>
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-semibold text-white mb-1 group-hover:text-[#FACC15] transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                                    {category.description}
                                </p>
                                <span className="text-xs text-gray-500">
                                    {category.productCount.toLocaleString('id-ID')} produk
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile See All */}
                <div className="mt-6 sm:hidden">
                    <Link
                        href="/kategori"
                        className="flex items-center justify-center gap-1 text-sm font-medium text-[#FACC15] hover:text-[#EAB308] transition-colors"
                    >
                        <span>Lihat Semua Kategori</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
