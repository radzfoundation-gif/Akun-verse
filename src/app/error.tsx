'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to console (in production, send to error tracking service)
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {/* Error Icon */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Terjadi Kesalahan
                    </h2>
                    <p className="text-gray-400 mb-2">
                        Maaf, terjadi kesalahan saat memuat halaman ini.
                    </p>
                    {error.digest && (
                        <p className="text-xs text-gray-600 mb-6">
                            Error ID: {error.digest}
                        </p>
                    )}
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25"
                    >
                        <RefreshCw size={18} />
                        Coba Lagi
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all backdrop-blur-sm"
                    >
                        <Home size={18} />
                        Kembali ke Beranda
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
