import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { categories } from "@/data/categories";

export const metadata = {
    title: "Semua Kategori - RLabs Store",
    description: "Jelajahi semua kategori produk digital di RLabs Store",
};

export default function AllCategoriesPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <section className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Semua Kategori
                    </h1>
                    <p className="text-gray-500 max-w-2xl">
                        Temukan berbagai produk digital mulai dari akun game, software, voucher, hingga jasa boosting.
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <Link
                                    key={category.id}
                                    href={`/kategori/${category.slug}`}
                                    className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className={`${category.bgColor} ${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-brand-500 transition-colors">
                                        {category.name}
                                    </h2>
                                    <p className="text-gray-500 mb-4">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-400">
                                            {category.productCount.toLocaleString('id-ID')} produk
                                        </span>
                                        <span className="text-sm font-medium text-brand-500 group-hover:translate-x-1 transition-transform">
                                            Lihat →
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
