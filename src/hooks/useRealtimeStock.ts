'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface StockData {
    productId: string;
    stock: number;
}

// Hook to subscribe to real-time stock updates for a single product
export function useRealtimeStock(productId: string, initialStock: number = 0) {
    const [stock, setStock] = useState(initialStock);
    const [isLowStock, setIsLowStock] = useState(initialStock <= 5);

    useEffect(() => {
        setStock(initialStock);
        setIsLowStock(initialStock <= 5);

        console.log('🔄 Subscribing to realtime for product:', productId);

        // Subscribe to changes on this specific product
        const channel = supabase
            .channel(`product-stock-${productId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'products',
                    filter: `id=eq.${productId}`,
                },
                (payload) => {
                    console.log('📦 Realtime update received:', payload);
                    const newStock = payload.new.stock as number;
                    setStock(newStock);
                    setIsLowStock(newStock <= 5);
                }
            )
            .subscribe((status) => {
                console.log('📡 Subscription status:', status);
            });

        return () => {
            console.log('🔴 Unsubscribing from product:', productId);
            supabase.removeChannel(channel);
        };
    }, [productId, initialStock]);

    return { stock, isLowStock };
}

// Hook to subscribe to real-time stock updates for multiple products
export function useRealtimeStocks(productIds: string[], initialStocks: Record<string, number> = {}) {
    const [stocks, setStocks] = useState<Record<string, number>>(initialStocks);

    useEffect(() => {
        setStocks(initialStocks);

        if (productIds.length === 0) return;

        // Subscribe to changes on all products
        const channel = supabase
            .channel('products-stock-updates')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'products',
                },
                (payload) => {
                    const updatedProductId = payload.new.id as string;
                    const newStock = payload.new.stock as number;

                    if (productIds.includes(updatedProductId)) {
                        setStocks((prev) => ({
                            ...prev,
                            [updatedProductId]: newStock,
                        }));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [productIds.join(','), JSON.stringify(initialStocks)]);

    return stocks;
}
