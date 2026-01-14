'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Check, Search, Filter, Gamepad2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { games } from '@/lib/data';

const genres = ['Semua', 'Survival Horror', 'Action Adventure', 'RPG', 'Strategy', 'Racing', 'Open World'];

export default function KatalogPage() {
    const { addItem, items } = useCart();
    const [addedItems, setAddedItems] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('Semua');

    const handleAddToCart = (gameId: number) => {
        const game = games.find(g => g.id === gameId);
        if (game) {
            addItem(game);
            setAddedItems(prev => [...prev, gameId]);
            setTimeout(() => {
                setAddedItems(prev => prev.filter(id => id !== gameId));
            }, 1500);
        }
    };

    const isInCart = (gameId: number) => items.some(item => item.id === gameId);
    const justAdded = (gameId: number) => addedItems.includes(gameId);

    const filteredGames = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre === 'Semua' || game.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-lg font-semibold text-gray-900">Katalog Game</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari game..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedGenre === genre
                                        ? 'bg-brand-500 text-white'
                                        : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-500'
                                    }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <p className="text-sm text-gray-500 mb-6">
                    Menampilkan {filteredGames.length} game
                </p>

                {/* Grid */}
                {filteredGames.length === 0 ? (
                    <div className="text-center py-20">
                        <Gamepad2 size={64} className="text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500">Tidak ada game ditemukan</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredGames.map((game) => (
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
                )}
            </main>
        </div>
    );
}
