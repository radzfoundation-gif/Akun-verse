'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem, setIsCartOpen } = useCart();

    const handleAddToCart = () => {
        // Convert Product to Game format expected by cart
        const gameItem = {
            id: Number(product.id) || parseInt(product.id) || Date.now(),
            title: product.name,
            genre: product.category,
            priceOriginal: product.originalPrice
                ? `Rp ${product.originalPrice.toLocaleString('id-ID')}`
                : '',
            priceDiscount: `Rp ${product.price.toLocaleString('id-ID')}`,
            priceValue: product.price,
            discount: product.discount ? `-${product.discount}%` : null,
            image: product.image,
            tag: product.badge || null,
            tagColor: 'bg-brand-500',
        };

        addItem(gameItem);
        setIsCartOpen(true);
    };

    return (
        <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
        >
            <ShoppingCart size={20} />
            Beli Sekarang
        </button>
    );
}
