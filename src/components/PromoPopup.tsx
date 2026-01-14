'use client';

import { useState, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

export default function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        // Check session storage
        const hasSeen = sessionStorage.getItem('hasSeenPromo');
        if (!hasSeen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenPromo', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-h-screen overflow-y-auto overflow-x-hidden md:overflow-visible">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Popup Content */}
            <div className="relative bg-[#1F2933] w-full max-w-4xl rounded-2xl overflow-hidden border border-[#FACC15]/20 shadow-2xl shadow-[#FACC15]/10 animate-fade-in-up flex flex-col md:flex-row z-[101]">

                {/* Close Button Mobile */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 z-20 p-2 bg-black/50 text-white rounded-full md:hidden hover:bg-[#FACC15] hover:text-[#111827] transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Video Section */}
                <div className="relative w-full md:w-3/5 bg-[#000] aspect-video md:aspect-auto">
                    <video
                        src="/promo-ongkir.mp4"
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute bottom-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-center relative bg-[#1F2933] md:border-l border-white/5">
                    {/* Close Button Desktop */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-20 hidden md:block text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div className="mb-6 md:mb-8">
                        <span className="inline-block px-3 py-1 bg-[#FACC15]/10 border border-[#FACC15]/20 rounded-full text-[#FACC15] text-xs font-bold mb-3">
                            SPECIAL OFFER
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                            Gratis Ongkir <br />
                            <span className="text-[#FACC15]">Ke Seluruh Indonesia!</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Jangan lewatkan kesempatan ini! Nikmati pengiriman gratis tanpa minimum belanja untuk semua produk.
                        </p>
                    </div>

                    <div className="space-y-3 mt-auto">
                        <button
                            onClick={handleClose}
                            className="w-full bg-[#FACC15] text-[#111827] py-3.5 rounded-xl font-bold hover:bg-[#EAB308] transition-colors shadow-lg shadow-[#FACC15]/20 flex items-center justify-center gap-2"
                        >
                            Ambil Promo Sekarang
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-full py-2 bg-transparent text-gray-500 text-sm hover:text-white transition-colors"
                        >
                            Nanti Saja
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
