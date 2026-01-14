"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CAROUSEL_IMAGES = [
    "/promo-popup.png",
    "/promo-popup-2.png"
];

export default function ShopeeBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
    };

    return (
        <section className="bg-transparent pt-4 pb-4 md:pt-6 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-auto md:h-[280px] lg:h-[320px]">

                    {/* Main Carousel (2/3 width) */}
                    <div className="md:col-span-2 relative h-[200px] md:h-full rounded-lg overflow-hidden group shadow-sm bg-[#1F2933] border border-white/5">
                        <img
                            src={CAROUSEL_IMAGES[currentIndex]}
                            alt="Main Banner"
                            className="w-full h-full object-contain bg-[#1F2933] transition-all duration-500"
                        />

                        {/* Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {CAROUSEL_IMAGES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all border border-white/50 ${idx === currentIndex ? "bg-[#FACC15] w-2 scale-110 border-none" : "bg-white/50 hover:bg-white"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Static Banners (1/3 width, stacked) */}
                    <div className="hidden md:flex flex-col gap-2 h-full">
                        {/* Top Banner */}
                        <div className="flex-1 relative rounded-lg overflow-hidden bg-[#1F2933] border border-white/5 group cursor-pointer shadow-sm">
                            {/* Placeholder for now using CSS Pattern or generic image if available. Using solid color + text */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1F2933] to-[#111827] p-4 flex flex-col justify-center text-white">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#FACC15] opacity-80">Eksklusif</span>
                                <h3 className="text-xl font-bold leading-tight">Voucher Game <br />Diskon 50%</h3>
                                <div className="mt-2 text-xs bg-[#FACC15]/20 text-[#FACC15] w-fit px-2 py-1 rounded">Cek Sekarang &rarr;</div>
                            </div>
                            {/* <img src="..." className="absolute inset-0 w-full h-full object-cover" /> */}
                        </div>

                        {/* Bottom Banner */}
                        <div className="flex-1 relative rounded-lg overflow-hidden bg-[#1F2933] border border-white/5 group cursor-pointer shadow-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1F2933] to-[#111827] p-4 flex flex-col justify-center text-white">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#FACC15] opacity-80">Terlaris</span>
                                <h3 className="text-xl font-bold leading-tight">Akun Premium <br />Garansi 100%</h3>
                                <div className="mt-2 text-xs bg-[#FACC15]/20 text-[#FACC15] w-fit px-2 py-1 rounded">Beli Yuk &rarr;</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
