'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

const WISHLIST_STORAGE_KEY = 'rlabs-wishlist';

export interface WishlistItem {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    addedAt: string;
}

interface WishlistContextType {
    items: WishlistItem[];
    addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
    removeItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    toggleWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
    clearWishlist: () => void;
    totalItems: number;
    isHydrated: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch (e) {
            console.error('Failed to load wishlist from localStorage:', e);
        }
        setIsHydrated(true);
    }, []);

    // Save wishlist to localStorage whenever items change
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
            } catch (e) {
                console.error('Failed to save wishlist to localStorage:', e);
            }
        }
    }, [items, isHydrated]);

    const addItem = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) return prev;
            return [...prev, { ...item, addedAt: new Date().toISOString() }];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const isInWishlist = useCallback((id: string) => {
        return items.some((item) => item.id === id);
    }, [items]);

    const toggleWishlist = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
        if (isInWishlist(item.id)) {
            removeItem(item.id);
        } else {
            addItem(item);
        }
    }, [isInWishlist, removeItem, addItem]);

    const clearWishlist = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = items.length;

    return (
        <WishlistContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                isInWishlist,
                toggleWishlist,
                clearWishlist,
                totalItems,
                isHydrated,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
