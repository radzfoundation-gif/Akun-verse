import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { popularGames } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return popularGames.map((game) => ({
        slug: game.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const game = popularGames.find((g) => g.slug === slug);

    if (!game) {
        return { title: "Game Tidak Ditemukan" };
    }

    return {
        title: `${game.name} - RLabs Store`,
        description: `Jual beli akun, top up, dan item ${game.name}`,
    };
}

export default async function GamePage({ params }: PageProps) {
    const { slug } = await params;
    const game = popularGames.find((g) => g.slug === slug);

    if (!game) {
        notFound();
    }

    const gameProducts = products.filter((p) => p.game === slug);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-6"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Beranda
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/20">
                            <img
                                src={game.image}
                                alt={game.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                                {game.name}
                            </h1>
                            <p className="text-gray-300">
                                {game.productCount.toLocaleString('id-ID')} produk tersedia
                            </p>
                        </div>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium">
                            Semua
                        </button>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
                            Akun
                        </button>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
                            Top Up
                        </button>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
                            Joki
                        </button>
                        <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
                            Item
                        </button>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {gameProducts.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-gray-600">
                                    Menampilkan <span className="font-medium">{gameProducts.length}</span> produk
                                </p>
                                <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                                    <option>Urutkan: Terbaru</option>
                                    <option>Harga: Terendah</option>
                                    <option>Harga: Tertinggi</option>
                                    <option>Terlaris</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {gameProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4">
                                <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum ada produk untuk {game.name}
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Produk akan segera tersedia. Coba lihat game lainnya.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-600 transition-colors"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Other Games */}
            <section className="py-8 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Game Lainnya
                    </h2>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                        {popularGames.filter(g => g.slug !== slug).map((g) => (
                            <Link
                                key={g.id}
                                href={`/game/${g.slug}`}
                                className="group flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-xl overflow-hidden mb-2 ring-2 ring-gray-100 group-hover:ring-brand-200 transition-all">
                                    <img src={g.image} alt={g.name} className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-medium text-gray-700 group-hover:text-brand-500 line-clamp-1">
                                    {g.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
