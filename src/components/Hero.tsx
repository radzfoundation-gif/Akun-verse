'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, ShieldCheck, Zap, Award, Headphones } from 'lucide-react';
import { categories } from '@/data/categories';

export default function Hero() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Content */}
                <div className="text-center max-w-4xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                        Marketplace #1 Indonesia — Aman & Terpercaya
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                        Jual Beli{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-300">
                            Akun Game
                        </span>
                        ,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                            Software
                        </span>
                        {' '}& Voucher
                    </h1>

                    <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        Temukan akun game premium, top up murah, software original, dan voucher digital.
                        Transaksi aman dengan garansi 100% uang kembali.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari akun game, software, voucher..."
                                className="w-full px-6 py-4 pl-14 pr-32 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300"
                            />
                            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors flex items-center gap-2"
                            >
                                <span className="hidden sm:inline">Cari</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </form>

                    {/* Quick Category Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.slice(0, 6).map((category) => (
                            <Link
                                key={category.id}
                                href={`/kategori/${category.slug}`}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-gray-400">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-green-400" />
                            <span className="text-sm font-medium text-white">Garansi Uang Kembali</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap size={20} className="text-yellow-400" />
                            <span className="text-sm font-medium text-white">Proses Instan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award size={20} className="text-blue-400" />
                            <span className="text-sm font-medium text-white">Seller Terverifikasi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Headphones size={20} className="text-purple-400" />
                            <span className="text-sm font-medium text-white">Support 24/7</span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50K+</div>
                        <div className="text-sm text-gray-400">Produk Tersedia</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">100K+</div>
                        <div className="text-sm text-gray-400">Transaksi Sukses</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">10K+</div>
                        <div className="text-sm text-gray-400">Seller Aktif</div>
                    </div>
                    <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">4.9/5</div>
                        <div className="text-sm text-gray-400">Rating Kepuasan</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
