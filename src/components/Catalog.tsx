'use client';

import Link from 'next/link';
import { ArrowRight, Plus, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { games } from '@/lib/data';
import { useState } from 'react';

export default function Catalog() {
    const { addItem, items } = useCart();
    const [addedItems, setAddedItems] = useState<number[]>([]);

    const handleAddToCart = (gameId: number) => {
        const game = games.find(g => g.id === gameId);
        if (game) {
            addItem(game);
            setAddedItems(prev => [...prev, gameId]);

            // Remove the check after 1.5 seconds
            setTimeout(() => {
                setAddedItems(prev => prev.filter(id => id !== gameId));
            }, 1500);
        }
    };

    const isInCart = (gameId: number) => items.some(item => item.id === gameId);
    const justAdded = (gameId: number) => addedItems.includes(gameId);

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-2">Sedang Trending 🔥</h2>
                        <p className="text-gray-500 text-sm sm:text-base">Game terlaris minggu ini dengan penawaran terbaik.</p>
                    </div>
                    <Link href="/katalog" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        Lihat Semua
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {games.slice(0, 4).map((game) => (
                        <div key={game.id} className="group bg-white rounded-2xl border border-gray-100 p-2 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-200 mb-3">
                                <img src={game.image} alt={game.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                {game.discount && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">{game.discount}</div>
                                )}
                                {game.tag && (
                                    <div className={`absolute top-2 left-2 ${game.tagColor === 'brand' ? 'bg-brand-500' : 'bg-blue-500'} text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm`}>{game.tag}</div>
                                )}
                            </div>
                            <div className="px-2 pb-2">
                                <div className="text-xs text-gray-400 mb-1">{game.genre}</div>
                                <h3 className="font-semibold text-gray-900 text-sm truncate mb-2">{game.title}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 line-through">{game.priceOriginal}</span>
                                        <span className="text-sm font-bold text-brand-600">{game.priceDiscount}</span>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(game.id)}
                                        className={`h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 ${justAdded(game.id)
                                                ? 'bg-green-500 text-white scale-110'
                                                : isInCart(game.id)
                                                    ? 'bg-brand-100 text-brand-600 hover:bg-brand-500 hover:text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-brand-500 hover:text-white'
                                            }`}
                                    >
                                        {justAdded(game.id) ? <Check size={16} /> : <Plus size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/katalog" className="inline-flex sm:hidden items-center justify-center w-full gap-2 px-6 py-3 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300">
                        Lihat Semua Game
                    </Link>
                </div>
            </div>
        </section>
    );
}
