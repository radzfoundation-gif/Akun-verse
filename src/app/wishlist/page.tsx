'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistPage() {
    const { items, removeItem, clearWishlist, isHydrated } = useWishlist();
    const { addItem: addToCart } = useCart();

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    const handleAddToCart = (item: typeof items[0]) => {
        addToCart({
            id: parseInt(item.id) || Math.random(),
            title: item.name,
            genre: item.category,
            priceOriginal: item.originalPrice ? formatCurrency(item.originalPrice) : formatCurrency(item.price),
            priceDiscount: formatCurrency(item.price),
            priceValue: item.price,
            discount: item.originalPrice ? `${Math.round((1 - item.price / item.originalPrice) * 100)}%` : null,
            image: item.image,
            tag: null,
            tagColor: '',
        });
    };

    if (!isHydrated) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <Navbar />
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-700/50 rounded w-48 mb-8" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="aspect-square bg-gray-700/50 rounded-2xl" />
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Beranda
                </Link>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Wishlist Saya</h1>
                            <p className="text-gray-400 text-sm">{items.length} produk tersimpan</p>
                        </div>
                    </div>
                    {items.length > 0 && (
                        <button
                            onClick={clearWishlist}
                            className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Hapus Semua
                        </button>
                    )}
                </div>

                {/* Empty State */}
                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-12 h-12 text-gray-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">Wishlist Kosong</h2>
                        <p className="text-gray-400 mb-8">Belum ada produk yang kamu simpan</p>
                        <Link
                            href="/katalog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                        >
                            Jelajahi Produk
                        </Link>
                    </motion.div>
                ) : (
                    /* Wishlist Grid */
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white/5 rounded-2xl overflow-hidden group"
                                >
                                    {/* Image */}
                                    <Link href={`/produk/${item.slug}`}>
                                        <div className="aspect-square relative overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* Remove Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    removeItem(item.id);
                                                }}
                                                className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </Link>

                                    {/* Content */}
                                    <div className="p-4">
                                        <Link href={`/produk/${item.slug}`}>
                                            <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 hover:text-purple-400 transition-colors">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-500 text-xs mb-3">{item.category}</p>

                                        {/* Price */}
                                        <div className="mb-3">
                                            <span className="text-purple-400 font-bold">
                                                {formatCurrency(item.price)}
                                            </span>
                                            {item.originalPrice && (
                                                <span className="text-gray-500 text-xs line-through ml-2">
                                                    {formatCurrency(item.originalPrice)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => handleAddToCart(item)}
                                            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <ShoppingCart size={16} />
                                            Tambah ke Keranjang
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
