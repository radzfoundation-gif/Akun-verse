'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Check, Zap, Clock, Flame } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { games } from '@/lib/data';

// Flash sale games with extra discount
const flashSaleGames = games.map(game => ({
    ...game,
    flashPrice: "Rp 3K",
    flashPriceValue: 3000,
    flashDiscount: "-99%",
    stock: Math.floor(Math.random() * 50) + 10
}));

export default function FlashSalePage() {
    const { addItem, items } = useCart();
    const [addedItems, setAddedItems] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 30, seconds: 0 });

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAddToCart = (gameId: number) => {
        const game = flashSaleGames.find(g => g.id === gameId);
        if (game) {
            addItem({
                ...game,
                priceDiscount: game.flashPrice,
                priceValue: game.flashPriceValue,
                discount: game.flashDiscount
            });
            setAddedItems(prev => [...prev, gameId]);
            setTimeout(() => {
                setAddedItems(prev => prev.filter(id => id !== gameId));
            }, 1500);
        }
    };

    const isInCart = (gameId: number) => items.some(item => item.id === gameId);
    const justAdded = (gameId: number) => addedItems.includes(gameId);

    return (
        <div className="min-h-screen bg-[#0B0F19]">
            {/* Header */}
            <header className="bg-[#111827]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-400" />
                    </Link>
                    <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Zap size={20} className="text-[#FACC15]" />
                        Flash Sale
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Flash Sale Banner */}
                <div className="bg-gradient-to-r from-[#FACC15]/20 via-[#EAB308]/20 to-[#FACC15]/20 border border-[#FACC15]/20 rounded-3xl p-6 sm:p-8 mb-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC15]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                                <Flame size={24} className="animate-pulse text-[#FACC15]" />
                                <span className="text-sm font-semibold uppercase tracking-wider text-[#FACC15]">Flash Sale</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Semua Game Cuma Rp 3K!</h2>
                            <p className="text-gray-300 text-sm">Stok terbatas! Buruan sebelum kehabisan.</p>
                        </div>

                        {/* Countdown */}
                        <div className="flex items-center gap-2 text-[#FACC15]">
                            <Clock size={20} />
                            <div className="flex items-center gap-1 text-2xl font-bold text-white">
                                <div className="bg-[#111827]/50 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg">
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </div>
                                <span>:</span>
                                <div className="bg-[#111827]/50 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg">
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </div>
                                <span>:</span>
                                <div className="bg-[#111827]/50 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg">
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flash Sale Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {flashSaleGames.map((game) => (
                        <div key={game.id} className="group bg-[#1F2933] rounded-2xl border border-white/5 p-2 shadow-sm hover:shadow-xl hover:shadow-[#FACC15]/5 hover:-translate-y-1 transition-all duration-300 relative">
                            {/* Flash Badge */}
                            <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-[#FACC15] to-[#EAB308] text-[#111827] text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                                <Zap size={10} />
                                FLASH
                            </div>

                            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#111827] mb-3">
                                <img src={game.image} alt={game.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">{game.flashDiscount}</div>

                                {/* Stock indicator */}
                                <div className="absolute bottom-2 left-2 right-2">
                                    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                                        <div className="flex items-center justify-between text-[10px] text-white mb-1">
                                            <span>Stok</span>
                                            <span>{game.stock} tersisa</span>
                                        </div>
                                        <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-yellow-400 to-[#FACC15] rounded-full"
                                                style={{ width: `${Math.min((game.stock / 60) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-2 pb-2">
                                <div className="text-xs text-gray-500 mb-1">{game.genre}</div>
                                <h3 className="font-semibold text-white text-sm truncate mb-2">{game.title}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 line-through">{game.priceOriginal}</span>
                                        <span className="text-sm font-bold text-[#FACC15]">{game.flashPrice}</span>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(game.id)}
                                        className={`h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 ${justAdded(game.id)
                                            ? 'bg-green-500 text-white scale-110'
                                            : isInCart(game.id)
                                                ? 'bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white'
                                                : 'bg-white/10 text-gray-400 hover:bg-[#FACC15] hover:text-[#111827]'
                                            }`}
                                    >
                                        {justAdded(game.id) ? <Check size={16} /> : <Plus size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
