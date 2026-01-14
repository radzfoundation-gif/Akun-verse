'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Game, CartItem } from '@/types';

const CART_STORAGE_KEY = 'rlabs-cart';

interface CartContextType {
    items: CartItem[];
    addItem: (game: Game) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch (e) {
            console.error('Failed to load cart from localStorage:', e);
        }
        setIsHydrated(true);
    }, []);

    // Save cart to localStorage whenever items change (after hydration)
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            } catch (e) {
                console.error('Failed to save cart to localStorage:', e);
            }
        }
    }, [items, isHydrated]);

    const addItem = useCallback((game: Game) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === game.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...game, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    }, [removeItem]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isCartOpen,
                setIsCartOpen,
                isHydrated,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
