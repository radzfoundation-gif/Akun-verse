import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Percent, Clock } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { promoProducts } from "@/data/products";

export const metadata = {
    title: "Promo & Diskon - RLabs Store",
    description: "Dapatkan produk digital dengan harga spesial. Promo terbatas!",
};

export default function PromoPage() {
    return (
        <main className="min-h-screen bg-[#0B0F19]">
            <Navbar />

            {/* Hero */}
            <section className="bg-gradient-to-r from-[#1F2933] to-[#111827] border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#FACC15]/10 text-[#FACC15] p-3 rounded-2xl border border-[#FACC15]/20">
                            <Percent size={32} />
                        </div>
                        <div className="bg-[#FACC15]/10 text-[#FACC15] p-3 rounded-2xl border border-[#FACC15]/20">
                            <Clock size={32} />
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
                        Promo & Diskon
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mb-8">
                        Hemat hingga 70%! Dapatkan produk digital favorit dengan harga spesial.
                        Promo terbatas, buruan sebelum kehabisan!
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[#FACC15]/10 border border-[#FACC15]/20 px-4 py-2 rounded-full">
                        <span className="flex h-2 w-2 rounded-full bg-[#FACC15] animate-pulse"></span>
                        <span className="font-medium text-[#FACC15]">Promo Aktif - Berakhir dalam 2 hari</span>
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white">
                            Produk Promo ({promoProducts.length})
                        </h2>
                        <select className="px-4 py-2 bg-[#1F2933] border border-white/10 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FACC15]">
                            <option>Urutkan: Diskon Tertinggi</option>
                            <option>Harga: Terendah</option>
                            <option>Harga: Tertinggi</option>
                            <option>Terlaris</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {promoProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {promoProducts.length === 0 && (
                        <div className="text-center py-16">
                            <Percent size={48} className="mx-auto text-gray-700 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-200 mb-2">
                                Belum ada promo aktif
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Tunggu promo menarik dari kami!
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-[#FACC15] text-[#111827] px-6 py-3 rounded-xl font-medium hover:bg-[#EAB308] transition-colors"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
