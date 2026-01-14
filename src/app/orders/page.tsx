'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Package, Loader2, ShoppingBag, ArrowRight, Download, ExternalLink, RefreshCw, Clock } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getUserOrders, SupabaseOrder } from '@/lib/userService';
import { supabase } from '@/lib/supabase';

export default function OrdersPage() {
    const { user, isLoaded } = useUser();
    const [orders, setOrders] = useState<SupabaseOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshingOrderId, setRefreshingOrderId] = useState<string | null>(null);

    useEffect(() => {
        if (isLoaded && user) {
            loadOrders();
        } else if (isLoaded && !user) {
            setIsLoading(false);
        }
    }, [isLoaded, user]);

    const loadOrders = async () => {
        if (!user) return;
        setIsLoading(true);
        const data = await getUserOrders(user.id);
        setOrders(data);
        setIsLoading(false);
    };

    const checkPaymentStatus = async (orderNumber: string) => {
        setRefreshingOrderId(orderNumber);
        try {
            const response = await fetch(`/api/midtrans/status?order_id=${orderNumber}`);
            if (response.ok) {
                const data = await response.json();

                // Map Midtrans status to our status
                let newStatus = 'pending';
                if (data.transaction_status === 'settlement' || data.transaction_status === 'capture') {
                    newStatus = 'paid';
                } else if (data.transaction_status === 'expire') {
                    newStatus = 'expired';
                } else if (data.transaction_status === 'cancel' || data.transaction_status === 'deny') {
                    newStatus = 'failed';
                }

                // Update in database
                await supabase
                    .from('orders')
                    .update({
                        status: newStatus,
                        paid_at: newStatus === 'paid' ? new Date().toISOString() : null
                    })
                    .eq('order_number', orderNumber);

                // Reload orders
                await loadOrders();
            }
        } catch (error) {
            console.error('Error checking payment status:', error);
        }
        setRefreshingOrderId(null);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
            case 'settlement':
                return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Lunas</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">Menunggu Pembayaran</span>;
            case 'completed':
                return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Selesai</span>;
            case 'cancelled':
            case 'cancel':
            case 'deny':
            case 'failed':
                return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Gagal/Dibatalkan</span>;
            case 'expired':
            case 'expire':
                return <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Kedaluwarsa</span>;
            case 'refunded':
            case 'refund':
                return <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Dikembalikan</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{status}</span>;
        }
    };

    // Not logged in
    if (isLoaded && !user) {
        return (
            <main className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                        <ShoppingBag size={64} className="text-gray-200 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Masuk untuk melihat pesanan</h1>
                        <p className="text-gray-500 mb-6">Login ke akun kamu untuk melihat riwayat pesanan</p>
                        <Link
                            href="/sign-in"
                            className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-600 transition-colors"
                        >
                            Masuk Sekarang
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Pesanan</h1>

                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                        <Package size={64} className="text-gray-200 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Belum ada pesanan</h2>
                        <p className="text-gray-500 mb-6">Mulai belanja dan pesanan kamu akan muncul di sini</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-600 transition-colors"
                        >
                            Mulai Belanja
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Nomor Pesanan</p>
                                        <p className="font-mono font-bold text-gray-900">{order.order_number}</p>
                                    </div>
                                    <div className="text-right">
                                        {getStatusBadge(order.status)}
                                        <p className="text-sm text-gray-500 mt-1">{formatDate(order.paid_at)}</p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 space-y-3">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{item.title}</h3>
                                                <p className="text-sm text-gray-500">{item.quantity}x @ {formatPrice(item.price)}</p>

                                                {/* Download Links */}
                                                {item.delivery_links && item.delivery_links.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {item.delivery_links.map((link, i) => (
                                                            <a
                                                                key={i}
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200"
                                                            >
                                                                <Download size={12} />
                                                                Download {i + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 mt-4 pt-4 flex flex-wrap justify-between items-center gap-3">
                                    <div>
                                        <span className="text-gray-500">Total Pembayaran</span>
                                        <span className="text-lg font-bold text-brand-600 ml-2">{formatPrice(order.final_price)}</span>
                                    </div>

                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => checkPaymentStatus(order.order_number)}
                                            disabled={refreshingOrderId === order.order_number}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors disabled:opacity-50"
                                        >
                                            <RefreshCw size={14} className={refreshingOrderId === order.order_number ? 'animate-spin' : ''} />
                                            {refreshingOrderId === order.order_number ? 'Memeriksa...' : 'Cek Status'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
