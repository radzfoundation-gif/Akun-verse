'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { popularGames } from '@/data/categories';

export default function PopularGames() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                            Game Populer
                        </h2>
                        <p className="text-gray-400 mt-1">Cari produk berdasarkan game favorit</p>
                    </div>
                    <Link
                        href="/games"
                        className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#FACC15] hover:text-[#EAB308] transition-colors"
                    >
                        <span>Lihat Semua</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Games Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {popularGames.map((game) => (
                        <Link
                            key={game.id}
                            href={`/game/${game.slug}`}
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-3 ring-2 ring-white/10 group-hover:ring-[#FACC15] group-hover:scale-105 transition-all duration-300">
                                <img
                                    src={game.image}
                                    alt={game.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-[#FACC15] transition-colors line-clamp-2">
                                {game.name}
                            </h3>
                            <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                                {game.productCount.toLocaleString('id-ID')} produk
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
