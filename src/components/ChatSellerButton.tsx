'use client';

import { MessageCircle } from 'lucide-react';

interface ChatSellerButtonProps {
    productName: string;
    phoneNumber?: string;
}

export default function ChatSellerButton({ productName, phoneNumber = '6281234567890' }: ChatSellerButtonProps) {
    const handleChat = () => {
        // Get current URL
        const currentUrl = window.location.href;

        const message = `Halo, saya tertarik dengan produk *${productName}*.\n\nLink: ${currentUrl}\n\nApakah stok masih tersedia?`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={handleChat}
            className="px-4 py-2 border border-brand-200 text-brand-600 bg-brand-50 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors flex items-center shadow-sm"
        >
            <MessageCircle size={16} className="mr-2" />
            Chat Penjual
        </button>
    );
}
