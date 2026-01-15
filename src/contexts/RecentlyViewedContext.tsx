'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'rlabs-recently-viewed';
const MAX_ITEMS = 10;

export interface RecentlyViewedItem {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    category: string;
    viewedAt: string;
}

interface RecentlyViewedContextType {
    items: RecentlyViewedItem[];
    addItem: (item: Omit<RecentlyViewedItem, 'viewedAt'>) => void;
    clearAll: () => void;
    isHydrated: boolean;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<RecentlyViewedItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch (e) {
            console.error('Failed to load recently viewed:', e);
        }
        setIsHydrated(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
        }
    }, [items, isHydrated]);

    const addItem = useCallback((item: Omit<RecentlyViewedItem, 'viewedAt'>) => {
        setItems((prev) => {
            // Remove if already exists
            const filtered = prev.filter((i) => i.id !== item.id);

            // Add to front with timestamp
            const newItem: RecentlyViewedItem = {
                ...item,
                viewedAt: new Date().toISOString(),
            };

            // Keep only MAX_ITEMS
            return [newItem, ...filtered].slice(0, MAX_ITEMS);
        });
    }, []);

    const clearAll = useCallback(() => {
        setItems([]);
        localStorage.removeItem(RECENTLY_VIEWED_KEY);
    }, []);

    return (
        <RecentlyViewedContext.Provider
            value={{
                items,
                addItem,
                clearAll,
                isHydrated,
            }}
        >
            {children}
        </RecentlyViewedContext.Provider>
    );
}

export function useRecentlyViewed() {
    const context = useContext(RecentlyViewedContext);
    if (context === undefined) {
        throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
    }
    return context;
}
