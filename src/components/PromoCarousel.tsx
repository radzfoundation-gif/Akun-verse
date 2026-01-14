"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PROMO_IMAGES = [
    "/promo-popup.png",
    "/promo-popup-2.png"
];

export default function PromoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PROMO_IMAGES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % PROMO_IMAGES.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + PROMO_IMAGES.length) % PROMO_IMAGES.length);
    };

    return (
        <section className="bg-gradient-to-r from-brand-50 to-white py-6 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">

                    {/* Slider Container */}
                    <div className="relative w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-xl aspect-[3/4] group md:order-2">
                        <img
                            src={PROMO_IMAGES[currentIndex]}
                            alt={`Promo ${currentIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />

                        {/* Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {PROMO_IMAGES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Text Content (Optional, making it look like a hero section) */}
                    <div className="flex-1 text-center md:text-left md:order-1">
                        <div className="inline-block px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-sm font-semibold mb-4">
                            🎉 Promo Spesial
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            Diskon Besar <br /> <span className="text-brand-500">Awal Tahun!</span>
                        </h1>
                        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto md:mx-0">
                            Nikmati harga spesial untuk top up game dan voucher favoritmu. Jangan sampai ketinggalan penawaran terbatas ini.
                        </p>
                        <button className="px-8 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-all shadow-lg hover:shadow-brand-500/25">
                            Cek Promo Sekarang
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
