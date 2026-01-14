'use client';

import { useState, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

export default function Promo88Popup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        // Show every time on refresh/mount, no session storage check
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 500); // Slightly faster than the other one to take precedence or stack
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 min-h-screen overflow-y-auto overflow-x-hidden md:overflow-visible">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Popup Content */}
            <div className="relative bg-[#1F2933] w-full max-w-4xl rounded-2xl overflow-hidden border border-[#FACC15]/20 shadow-2xl shadow-[#FACC15]/10 animate-fade-in-up flex flex-col md:flex-row z-[111]">

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
                        src="/promo-88.mp4"
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

                    {/* 8.8 Badge overlay */}
                    <div className="absolute top-4 left-4 bg-[#FACC15] text-[#111827] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider transform -rotate-2 shadow-lg">
                        Promo 8.8
                    </div>
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
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white text-xs font-bold mb-3 shadow-lg shadow-orange-500/20">
                            TERBATAS HARI INI
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                            Mega Sale <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-orange-500 font-extrabold">8.8</span>
                            <br />Dimulai!
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Diskon hingga <span className="text-[#FACC15] font-bold">88%</span> untuk item game pilihan. Klaim voucher spesialmu sekarang sebelum kehabisan!
                        </p>
                    </div>

                    <div className="space-y-3 mt-auto">
                        <a
                            href="/coupons"
                            className="w-full bg-gradient-to-r from-[#FACC15] to-orange-500 text-[#111827] py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 decoration-0 text-center block"
                        >
                            Cek Diskon 8.8
                        </a>
                        <button
                            onClick={handleClose}
                            className="w-full py-2 bg-transparent text-gray-500 text-sm hover:text-white transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
