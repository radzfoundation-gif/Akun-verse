'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Search, ArrowLeft, SlidersHorizontal, Loader2 } from "lucide-react";
import { getAllProducts } from "@/lib/productService";
import { Product } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getAllProducts();
            setAllProducts(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const searchResults = query
        ? allProducts.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        : allProducts;

    return (
        <>
            {/* Search Header */}
            <section className="bg-[#111827] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#FACC15] mb-4 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Beranda
                    </Link>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {query ? `Hasil pencarian "${query}"` : 'Semua Produk'}
                    </h1>
                    <p className="text-gray-400">
                        Ditemukan {searchResults.length} produk
                    </p>

                    {/* Search Form */}
                    <form className="mt-6 max-w-xl">
                        <div className="relative">
                            <input
                                type="text"
                                name="q"
                                defaultValue={query}
                                placeholder="Cari produk..."
                                className="w-full px-5 py-3 pl-12 bg-[#1F2933] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 focus:border-[#FACC15]"
                            />
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FACC15] text-[#111827] px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#EAB308] transition-colors"
                            >
                                Cari
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Filters & Results */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <aside className="lg:w-64 flex-shrink-0">
                            <div className="bg-[#1F2933] rounded-xl p-5 border border-white/5 sticky top-20">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-white">Filter</h3>
                                    <SlidersHorizontal size={18} className="text-gray-400" />
                                </div>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-300 mb-3">Kategori</h4>
                                    <div className="space-y-2">
                                        {categories.map((cat) => (
                                            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" className="rounded border-white/10 bg-[#111827] text-[#FACC15] focus:ring-[#FACC15]" />
                                                <span className="text-sm text-gray-400">{cat.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-300 mb-3">Rentang Harga</h4>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="w-full px-3 py-2 bg-[#111827] border border-white/10 rounded-lg text-sm text-white focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] focus:outline-none"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="w-full px-3 py-2 bg-[#111827] border border-white/10 rounded-lg text-sm text-white focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-2.5 bg-[#FACC15] text-[#111827] rounded-lg font-medium hover:bg-[#EAB308] transition-colors">
                                    Terapkan Filter
                                </button>
                            </div>
                        </aside>

                        {/* Results Grid */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-gray-400">
                                    <span className="font-medium text-white">{searchResults.length}</span> produk ditemukan
                                </p>
                                <select className="px-4 py-2 bg-[#1F2933] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 focus:border-[#FACC15]">
                                    <option>Urutkan: Relevan</option>
                                    <option>Harga: Terendah</option>
                                    <option>Harga: Tertinggi</option>
                                    <option>Terlaris</option>
                                </select>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 size={48} className="text-[#FACC15] animate-spin" />
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {searchResults.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <Search size={48} className="mx-auto text-gray-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        Tidak ada hasil untuk &quot;{query}&quot;
                                    </h3>
                                    <p className="text-gray-400 mb-6">
                                        Coba kata kunci lain atau jelajahi kategori kami
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
                    </div>
                </div>
            </section>
        </>
    );
}

export default function SearchPage() {
    return (
        <main className="min-h-screen bg-[#0B0F19]">
            <Navbar />
            <Suspense fallback={
                <div className="flex items-center justify-center py-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FACC15]"></div>
                </div>
            }>
                <SearchResults />
            </Suspense>
            <Footer />
        </main>
    );
}
