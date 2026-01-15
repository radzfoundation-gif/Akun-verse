'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { Clock, ChevronRight, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentlyViewed() {
    const { items, clearAll, isHydrated } = useRecentlyViewed();

    if (!isHydrated || items.length === 0) {
        return null;
    }

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    return (
        <section className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Terakhir Dilihat</h2>
                            <p className="text-gray-500 text-sm">{items.length} produk</p>
                        </div>
                    </div>
                    <button
                        onClick={clearAll}
                        className="text-gray-500 hover:text-red-400 text-sm flex items-center gap-1 transition-colors"
                    >
                        <Trash2 size={14} />
                        Hapus
                    </button>
                </div>

                {/* Scrollable Products */}
                <div className="relative">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex-shrink-0 w-36"
                            >
                                <Link href={`/produk/${item.slug}`} className="group">
                                    <div className="relative aspect-square rounded-xl overflow-hidden mb-2">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-purple-400 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-purple-400 text-sm font-bold mt-1">
                                        {formatCurrency(item.price)}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Fade gradient on right */}
                    <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
