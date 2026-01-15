'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {/* 404 Animation */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-[150px] font-bold leading-none bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                        404
                    </h1>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Halaman Tidak Ditemukan
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25"
                    >
                        <Home size={18} />
                        Kembali ke Beranda
                    </Link>
                    <Link
                        href="/katalog"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all backdrop-blur-sm"
                    >
                        <Search size={18} />
                        Cari Produk
                    </Link>
                </motion.div>

                {/* Back Link */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    onClick={() => window.history.back()}
                    className="mt-8 inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
                >
                    <ArrowLeft size={16} />
                    Kembali ke halaman sebelumnya
                </motion.button>
            </div>
        </div>
    );
}
