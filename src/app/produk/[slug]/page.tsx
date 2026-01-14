import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, MessageCircle, Share2, Heart, ShoppingCart, CheckCircle, Clock, Package, Users, User } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import ChatSellerButton from "@/components/ChatSellerButton";
import ShareProductButton from "@/components/ShareProductButton";
import RealtimeSold from "@/components/RealtimeSold";
import ProductViewTracker from "@/components/ProductViewTracker";
import RealtimeStockBadge from "@/components/RealtimeStockBadge";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductsByCategory } from "@/lib/productService";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    // First check Supabase, then fall back to static
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: "Produk Tidak Ditemukan" };
    }

    return {
        title: `${product.name} - RLabs Store`,
        description: product.description.substring(0, 160),
        openGraph: {
            title: `${product.name} | RLabs Store`,
            description: product.description.substring(0, 160),
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 600,
                    alt: product.name,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} | RLabs Store`,
            description: product.description.substring(0, 160),
            images: [product.image],
        },
    };

}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    // Fetch from Supabase with static fallback
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const category = categories.find((c) => c.slug === product.category);

    // Get related products from same category
    const allCategoryProducts = await getProductsByCategory(product.category);
    const relatedProducts = allCategoryProducts
        .filter((p) => p.id !== product.id)
        .slice(0, 4);

    return (
        <main className="min-h-screen bg-[#0B0F19]">
            <ProductViewTracker
                productId={product.id}
                category={product.category}
                price={product.price}
            />
            <Navbar />

            {/* Breadcrumb */}
            <section className="bg-[#111827] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-400 hover:text-[#FACC15]">Beranda</Link>
                        <span className="text-gray-600">/</span>
                        {category && (
                            <>
                                <Link href={`/kategori/${category.slug}`} className="text-gray-400 hover:text-[#FACC15]">
                                    {category.name}
                                </Link>
                                <span className="text-gray-600">/</span>
                            </>
                        )}
                        <span className="text-gray-200 font-medium truncate max-w-[200px]">{product.name}</span>
                    </div>
                </div>
            </section>

            {/* Product Detail */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image */}
                        <div className="space-y-4">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1F2933] border border-white/5">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {product.discount && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                                        -{product.discount}%
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl hover:bg-white/5 text-gray-300 transition-colors">
                                    <Heart size={18} />
                                    <span className="text-sm font-medium">Wishlist</span>
                                </button>
                                <ShareProductButton
                                    productName={product.name}
                                    productImage={product.image}
                                    description={product.description}
                                />
                            </div>

                            {/* Description - Moved here */}
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <h3 className="font-semibold text-white mb-3">Deskripsi Produk</h3>
                                <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            {/* Title & Price */}
                            <div>
                                {product.accountType && (
                                    <div className="mb-3">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${product.accountType === 'private'
                                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                            {product.accountType === 'private' ? <User size={12} /> : <Users size={12} />}
                                            {product.accountType === 'private' ? 'Private Account' : 'Sharing Account'}
                                        </span>
                                    </div>
                                )}
                                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-3xl font-bold text-[#FACC15]">
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-lg text-gray-500 line-through">
                                            Rp {product.originalPrice.toLocaleString('id-ID')}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="text-[#FACC15] fill-[#FACC15]" />
                                        <span className="font-medium text-gray-200">{product.seller.rating}</span>
                                    </div>
                                    <span>•</span>
                                    <span>
                                        <RealtimeSold initialSold={product.sold} />
                                    </span>
                                    <span>•</span>
                                    <RealtimeStockBadge
                                        productId={product.id}
                                        initialStock={product.stock}
                                        size="sm"
                                    />
                                </div>
                            </div>

                            {/* Seller Info */}
                            <div className="p-4 bg-[#1F2933] border border-white/5 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-[#111827] text-[#FACC15] border border-white/5 rounded-full flex items-center justify-center font-bold text-lg">
                                            {product.seller.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-white">{product.seller.name}</span>
                                                {product.seller.verified && (
                                                    <ShieldCheck size={16} className="text-blue-500" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Star size={12} className="text-[#FACC15] fill-[#FACC15]" />
                                                <span>{product.seller.rating}</span>
                                                <span>•</span>
                                                <span>{product.seller.totalSales.toLocaleString('id-ID')} penjualan</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChatSellerButton productName={product.name} />
                                </div>
                            </div>



                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center p-3 bg-[#1F2933] border border-green-500/20 rounded-xl text-center">
                                    <CheckCircle size={20} className="text-green-500 mb-1" />
                                    <span className="text-xs text-green-400 font-medium">Garansi</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-[#1F2933] border border-blue-500/20 rounded-xl text-center">
                                    <Clock size={20} className="text-blue-500 mb-1" />
                                    <span className="text-xs text-blue-400 font-medium">Instan</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-[#1F2933] border border-purple-500/20 rounded-xl text-center">
                                    <Package size={20} className="text-purple-500 mb-1" />
                                    <span className="text-xs text-purple-400 font-medium">Original</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex gap-4">
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-8 bg-[#1F2933] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-xl font-semibold text-white mb-6">
                            Produk Serupa
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
