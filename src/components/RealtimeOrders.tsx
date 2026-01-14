'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

interface RecentOrder {
    id: string;
    order_number: string;
    items: Array<{ title: string; quantity: number }>;
    final_price: number;
    created_at: string;
}

export default function RealtimeOrders() {
    const { user, isLoaded } = useUser();
    const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [latestOrder, setLatestOrder] = useState<RecentOrder | null>(null);

    useEffect(() => {
        if (isLoaded && user) {
            // Fetch initial recent orders for current user
            fetchRecentOrders();

            // Subscribe to realtime orders for current user
            const channel = supabase
                .channel(`orders-${user.id}`)
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'orders',
                        filter: `user_id=eq.${user.id}`
                    },
                    (payload) => {
                        const newOrder = payload.new as RecentOrder;
                        setLatestOrder(newOrder);
                        setShowNotification(true);
                        setRecentOrders(prev => [newOrder, ...prev].slice(0, 5));

                        // Hide notification after 5 seconds
                        setTimeout(() => setShowNotification(false), 5000);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [isLoaded, user]);

    const fetchRecentOrders = async () => {
        if (!user) return;
        try {
            const { data } = await supabase
                .from('orders')
                .select('id, order_number, items, final_price, created_at')
                .eq('user_id', user.id) // Filter by user
                .eq('status', 'paid')
                .order('created_at', { ascending: false })
                .limit(5);

            if (data) {
                setRecentOrders(data);
            }
        } catch (err) {
            console.log('Could not fetch recent orders');
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} menit lalu`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} jam lalu`;
        return `${Math.floor(diffHours / 24)} hari lalu`;
    };

    // Don't show if no orders
    if (recentOrders.length === 0) return null;

    return (
        <>
            {/* Realtime Notification Toast */}
            {showNotification && latestOrder && (
                <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 max-w-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Pesanan Baru! 🎉</p>
                                <p className="text-sm text-gray-500">
                                    Seseorang baru saja membeli {latestOrder.items?.[0]?.title || 'produk'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Baru saja</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Orders Section */}
            <section className="py-8 bg-gradient-to-r from-[#111827] to-[#1F2933] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-[#FACC15] rounded-full animate-pulse"></div>
                        <h3 className="text-sm font-medium text-gray-400">Transaksi Terakhir Kamu</h3>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {recentOrders.map((order) => (
                            <div
                                key={order.id}
                                className="flex-shrink-0 bg-[#1F2933] rounded-xl p-3 shadow-sm border border-white/5 min-w-[200px]"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <ShoppingBag className="w-4 h-4 text-[#FACC15]" />
                                    <span className="text-xs text-gray-500">{getTimeAgo(order.created_at)}</span>
                                </div>
                                <p className="text-sm font-medium text-white truncate">
                                    {order.items?.[0]?.title || 'Produk'}
                                </p>
                                <p className="text-xs text-[#FACC15] font-medium mt-1">
                                    {formatPrice(order.final_price)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
