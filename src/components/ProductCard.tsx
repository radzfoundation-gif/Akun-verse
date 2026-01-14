'use client';

import Link from 'next/link';
import { Star, ShieldCheck, TrendingUp, Tag, Sparkles, ShoppingCart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
    product: Product;
}

const badgeConfig = {
    best_seller: {
        label: 'Terlaris',
        icon: TrendingUp,
        className: 'bg-orange-500 text-white'
    },
    termurah: {
        label: 'Termurah',
        icon: Tag,
        className: 'bg-green-500 text-white'
    },
    promo: {
        label: 'Promo',
        icon: Sparkles,
        className: 'bg-red-500 text-white'
    },
    new: {
        label: 'Baru',
        icon: Sparkles,
        className: 'bg-blue-500 text-white'
    }
};

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem, setIsCartOpen } = useCart();
    const badge = product.badge ? badgeConfig[product.badge] : null;
    const BadgeIcon = badge?.icon;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addItem({
            id: Number(product.id) || parseInt(product.id) || Date.now(),
            title: product.name,
            genre: product.category || 'General',
            priceOriginal: product.originalPrice ? `Rp ${product.originalPrice.toLocaleString('id-ID')}` : '',
            priceDiscount: `Rp ${product.price.toLocaleString('id-ID')}`,
            priceValue: product.price,
            discount: product.discount ? `-${product.discount}%` : null,
            image: product.image,
            tag: product.badge || null,
            tagColor: 'bg-brand-500', // Default color
        });
        setIsCartOpen(true);
    };

    return (
        <Link
            href={`/produk/${product.slug}`}
            className="group bg-[#1F2933] border border-white/5 rounded-2xl overflow-hidden hover:border-[#FACC15]/50 hover:shadow-xl hover:shadow-[#FACC15]/10 hover:-translate-y-1 transition-all duration-300 relative"
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {badge && BadgeIcon && (
                    <div className={`absolute top-3 left-3 ${badge.className} px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1`}>
                        <BadgeIcon size={12} />
                        <span>{badge.label}</span>
                    </div>
                )}

                {/* Discount Badge */}
                {product.discount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        -{product.discount}%
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="font-medium text-gray-100 mb-2 line-clamp-2 group-hover:text-[#FACC15] transition-colors min-h-[48px]">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#FACC15]">
                            Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                Rp {product.originalPrice.toLocaleString('id-ID')}
                            </span>
                        )}
                    </div>
                </div>

                {/* Seller Info */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        {product.seller.verified && (
                            <ShieldCheck size={14} className="text-blue-500" />
                        )}
                        <span className="text-xs text-gray-500 truncate max-w-[100px]">
                            {product.seller.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium text-gray-700">
                            {product.seller.rating}
                        </span>
                        <span className="text-xs text-gray-400">
                            ({product.sold} terjual)
                        </span>
                    </div>
                </div>
            </div>

            {/* Add To Cart Button (Floating) */}
            <button
                onClick={handleAddToCart}
                className="absolute bottom-20 right-4 z-20 bg-brand-500 text-white p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-600 active:scale-95"
                title="Tambah ke Keranjang"
            >
                <ShoppingCart size={20} />
            </button>
        </Link>
    );
}
