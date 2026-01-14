'use client';

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function CartDrawer() {
    const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1F2933] z-[70] shadow-2xl flex flex-col animate-slide-in-right border-l border-white/5">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="text-[#FACC15]" size={20} />
                        <h2 className="text-lg font-semibold text-white">Keranjang Belanja</h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingBag size={64} className="text-[#111827] mb-4" />
                            <p className="text-white mb-2">Keranjang masih kosong</p>
                            <p className="text-sm text-gray-400">Yuk mulai belanja game favoritmu!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3 bg-[#111827] rounded-xl p-3 border border-white/5">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-24 object-cover rounded-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-white text-sm truncate">{item.title}</h3>
                                        <p className="text-xs text-gray-400 mb-2">{item.genre}</p>
                                        <p className="text-sm font-bold text-[#FACC15]">{item.priceDiscount}</p>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-[#1F2933] border border-white/10 hover:border-[#FACC15] text-white transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="text-sm font-medium w-6 text-center text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-[#1F2933] border border-white/10 hover:border-[#FACC15] text-white transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-400 hover:text-red-500 p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-white/5 p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Total</span>
                            <span className="text-xl font-bold text-[#FACC15]">{formatPrice(totalPrice)}</span>
                        </div>
                        <a
                            href="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="w-full bg-[#FACC15] text-[#111827] py-3 rounded-xl font-medium hover:bg-[#EAB308] transition-colors block text-center"
                        >
                            Checkout Sekarang
                        </a>
                        <button
                            onClick={clearCart}
                            className="w-full text-gray-500 text-sm hover:text-red-400 transition-colors"
                        >
                            Kosongkan Keranjang
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
