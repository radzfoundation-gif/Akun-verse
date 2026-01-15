'use client';

import { Heart } from 'lucide-react';
import { useWishlist, WishlistItem } from '@/contexts/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

interface WishlistButtonProps {
    item: Omit<WishlistItem, 'addedAt'>;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

export default function WishlistButton({
    item,
    size = 'md',
    showLabel = false,
    className = ''
}: WishlistButtonProps) {
    const { isInWishlist, toggleWishlist, isHydrated } = useWishlist();
    const isWishlisted = isHydrated && isInWishlist(item.id);

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    const iconSizes = {
        sm: 16,
        md: 20,
        lg: 24,
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(item);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                ${showLabel ? 'flex items-center gap-2 px-4 py-2' : sizeClasses[size]}
                rounded-xl transition-all duration-200
                ${isWishlisted
                    ? 'bg-pink-500/20 text-pink-500 hover:bg-pink-500/30'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'}
                ${className}
            `}
            aria-label={isWishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isWishlisted ? 'filled' : 'empty'}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                    className={!showLabel ? 'flex items-center justify-center w-full h-full' : ''}
                >
                    <Heart
                        size={iconSizes[size]}
                        fill={isWishlisted ? 'currentColor' : 'none'}
                    />
                </motion.div>
            </AnimatePresence>
            {showLabel && (
                <span className="text-sm font-medium">
                    {isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
                </span>
            )}
        </button>
    );
}
