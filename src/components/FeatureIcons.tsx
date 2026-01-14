"use client";

import Link from "next/link";
import { Gamepad2, Zap, Gift, Smartphone, Monitor, ShieldCheck, Percent, Star, Crown, Code2 } from "lucide-react";

// Feature Icons List
const features = [
    { label: "Game Steam", icon: Gamepad2, color: "text-blue-500", href: "/kategori/game-steam" },
    { label: "Akun Premium", icon: Crown, color: "text-yellow-500", href: "/kategori/akun-premium" },
    { label: "Software", icon: Code2, color: "text-purple-500", href: "/kategori/software" },
    { label: "Voucher", icon: Gift, color: "text-red-500", href: "/kategori/voucher" },
    { label: "Flash Sale", icon: Zap, color: "text-orange-500", href: "/flash-sale" },
    { label: "Termurah", icon: Percent, color: "text-green-500", href: "/produk?sort=price_asc" },
    { label: "Terlaris", icon: Star, color: "text-orange-400", href: "/produk?sort=best_seller" },
    { label: "Garansi", icon: ShieldCheck, color: "text-teal-500", href: "/toolkit" },
    { label: "Entertainment", icon: Monitor, color: "text-pink-500", href: "/kategori/entertainment" },
    { label: "Top Up", icon: Smartphone, color: "text-indigo-500", href: "/kategori/top-up" },
];

export default function FeatureIcons() {
    return (
        <section className="py-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex overflow-x-auto pb-4 pt-2 gap-4 md:gap-8 justify-start md:justify-center scrollbar-hide">
                    {features.map((feature, idx) => (
                        <Link
                            key={idx}
                            href={feature.href}
                            className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer group hover:-translate-y-1 transition-transform duration-200"
                        >
                            <div className={`w-12 h-12 md:w-14 md:h-14 bg-[#1F2933] border border-white/10 rounded-[18px] shadow-sm flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#FACC15]/20 transition-all ${feature.color}`}>
                                <feature.icon size={24} className="md:w-7 md:h-7" strokeWidth={1.5} />
                            </div>
                            <span className="text-[11px] md:text-sm text-center font-medium text-gray-400 leading-tight max-w-[80px] group-hover:text-[#FACC15] transition-colors">
                                {feature.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
