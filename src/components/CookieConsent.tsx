'use client';

import { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'rlabs-cookie-consent';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            // Show after a short delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50">
                        <div className="p-4 md:p-6">
                            <div className="flex flex-col md:flex-row gap-4 md:items-center">
                                {/* Icon & Text */}
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Cookie className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">
                                            🍪 Kami Menggunakan Cookies
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Website ini menggunakan cookies untuk meningkatkan pengalaman Anda,
                                            menyimpan preferensi, dan menganalisis traffic. Dengan melanjutkan,
                                            Anda menyetujui penggunaan cookies sesuai{' '}
                                            <Link href="/privacy" className="text-purple-400 hover:underline">
                                                Kebijakan Privasi
                                            </Link>
                                            {' '}kami.
                                        </p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={handleDecline}
                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Tolak
                                    </button>
                                    <button
                                        onClick={handleAccept}
                                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium text-sm transition-all"
                                    >
                                        Terima Semua
                                    </button>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Shield size={14} className="text-green-400" />
                                    Data terenkripsi
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Cookie size={14} className="text-purple-400" />
                                    Personalisasi pengalaman
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
