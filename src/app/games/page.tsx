import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { popularGames } from "@/data/categories";

export const metadata = {
    title: "Semua Game - RLabs Store",
    description: "Jelajahi semua game populer di RLabs Store",
};

export default function AllGamesPage() {
    return (
        <main className="min-h-screen bg-[#0B0F19]">
            <Navbar />

            {/* Header */}
            <section className="bg-gradient-to-r from-[#111827] to-[#1F2933] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                        Semua Game
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        Pilih game favoritmu dan temukan akun, top up, item, dan jasa boosting.
                    </p>
                </div>
            </section>

            {/* Games Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {popularGames.map((game) => (
                            <Link
                                key={game.id}
                                href={`/game/${game.slug}`}
                                className="group bg-[#1F2933] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FACC15]/20 hover:shadow-xl hover:shadow-[#FACC15]/5 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden bg-[#111827]">
                                    <img
                                        src={game.image}
                                        alt={game.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h2 className="font-semibold text-white group-hover:text-[#FACC15] transition-colors">
                                        {game.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {game.productCount.toLocaleString('id-ID')} produk
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
