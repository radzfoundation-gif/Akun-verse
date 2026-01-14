import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/productService";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const category = categories.find((c) => c.slug === slug);

    if (!category) {
        return { title: "Kategori Tidak Ditemukan" };
    }

    return {
        title: `${category.name} - RLabs Store`,
        description: category.description,
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const category = categories.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    // Fetch from Supabase with static fallback
    const categoryProducts = await getProductsByCategory(slug);
    const Icon = category.icon;

    return (
        <main className="min-h-screen bg-[#0B0F19]">
            <Navbar />

            {/* Header */}
            <section className="bg-[#111827] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#FACC15] mb-4"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Beranda
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className={`bg-[#1F2933] border border-white/10 ${category.color} w-16 h-16 rounded-2xl flex items-center justify-center`}>
                            <Icon size={32} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                {category.name}
                            </h1>
                            <p className="text-gray-400 mt-1">
                                {category.description} • {categoryProducts.length} produk
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {categoryProducts.length > 0 ? (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-gray-400">
                                    Menampilkan <span className="font-medium text-white">{categoryProducts.length}</span> produk
                                </p>
                                <select className="px-4 py-2 bg-[#1F2933] border border-white/10 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FACC15]">
                                    <option>Urutkan: Terbaru</option>
                                    <option>Harga: Terendah</option>
                                    <option>Harga: Tertinggi</option>
                                    <option>Terlaris</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {categoryProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-[#1F2933] text-gray-600 border border-white/5 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Icon size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Belum ada produk
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Produk untuk kategori ini akan segera tersedia
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

            {/* Other Categories */}
            <section className="py-8 bg-[#1F2933] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold text-white mb-6">
                        Kategori Lainnya
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.filter(c => c.slug !== slug).map((cat) => {
                            const CatIcon = cat.icon;
                            return (
                                <Link
                                    key={cat.id}
                                    href={`/kategori/${cat.slug}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] border border-white/5 rounded-xl hover:bg-[#1F2933] hover:border-[#FACC15]/20 hover:text-[#FACC15] transition-all group"
                                >
                                    <CatIcon size={18} className={`${cat.color} group-hover:text-[#FACC15] transition-colors`} />
                                    <span className="text-sm font-medium text-gray-400 group-hover:text-white">{cat.name}</span>
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
