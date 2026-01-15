'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Eye, RefreshCw } from 'lucide-react';
import { getProducts, getOrders, AdminProduct, AdminOrder, supabase } from '@/lib/supabase';

interface StatCard {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
    change?: string;
}

export default function AdminDashboard() {
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();

        // Realtime subscription for orders
        const ordersSubscription = supabase
            .channel('realtime-orders')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
                console.log('Realtime update:', payload);
                // Refresh data on any order change
                loadOrders();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(ordersSubscription);
        };
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([loadProducts(), loadOrders()]);
        } catch (err: any) {
            console.error('Error loading dashboard data:', err);
            setError(err.message || 'Gagal memuat data');
        } finally {
            setIsLoading(false);
        }
    };

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data || []);
        } catch (err) {
            console.error('Error loading products:', err);
            setProducts([]); // Fallback
        }
    };

    const loadOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data || []);
        } catch (err) {
            console.error('Error loading orders:', err);
            setOrders([]); // Fallback
        }
    };

    // calculate stats
    const totalRevenue = orders
        .filter(o => o.status === 'paid') // Only count paid orders
        .reduce((sum, o) => sum + (o.final_price || 0), 0);

    const today = new Date().toISOString().split('T')[0];
    const ordersToday = orders.filter(o => o.created_at?.startsWith(today));
    const revenueToday = ordersToday
        .filter(o => o.status === 'paid')
        .reduce((sum, o) => sum + (o.final_price || 0), 0);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatAbbreviatedPrice = (price: number) => {
        if (price >= 1000000000) return `Rp ${(price / 1000000000).toFixed(1)}M`;
        if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(1)}jt`;
        return formatPrice(price);
    };

    const stats: StatCard[] = [
        {
            label: 'Total Pendapatan',
            value: formatAbbreviatedPrice(totalRevenue),
            icon: DollarSign,
            color: 'bg-green-500',
            change: totalRevenue > 0 ? '+Realtime' : '-',
        },
        {
            label: 'Pesanan Hari Ini',
            value: ordersToday.length.toString(),
            icon: ShoppingCart,
            color: 'bg-blue-500',
            change: revenueToday > 0 ? `+${formatAbbreviatedPrice(revenueToday)}` : '-',
        },
        {
            label: 'Total Produk',
            value: products.length.toString(),
            icon: Package,
            color: 'bg-purple-500',
            change: '+Active',
        },
        {
            label: 'Total Stock',
            value: products.reduce((sum, p) => sum + (p.stock || 0), 0).toString(),
            icon: TrendingUp,
            color: 'bg-orange-500',
        },
    ];



    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-gray-400">Real-time monitoring toko RLabs Store</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={loadData}
                        className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                        title="Refresh Data"
                    >
                        <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                    </button>
                    <Link
                        href="/admin/products/new"
                        className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-xl hover:bg-brand-600 transition-colors"
                    >
                        <Plus size={20} />
                        Tambah Produk
                    </Link>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-3 rounded-xl">
                    <p className="font-medium">Status Sistem</p>
                    <p className="text-sm">{error}. Menampilkan data cached/lokal.</p>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-brand-500/30 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg shadow-${stat.color.replace('bg-', '')}/20`}>
                                <stat.icon size={24} className="text-white" />
                            </div>
                            {stat.change && (
                                <span className={`text-xs font-medium px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                                    {stat.change}
                                </span>
                            )}
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <h2 className="text-lg font-semibold text-white">Pesanan Terbaru</h2>
                        <Link href="/admin/orders" className="text-brand-400 hover:text-brand-300 text-sm">
                            Lihat Semua
                        </Link>
                    </div>

                    {orders.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Belum ada pesanan</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-700/50">
                                    <tr>
                                        <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Order ID</th>
                                        <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Nilai</th>
                                        <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Status</th>
                                        <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Waktu</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {orders.slice(0, 5).map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-700/50">
                                            <td className="px-6 py-4">
                                                <span className="text-white font-mono text-xs">{order.order_number}</span>
                                            </td>
                                            <td className="px-6 py-4 text-white text-sm">{formatPrice(order.final_price)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.status === 'paid' ? 'bg-green-500/10 text-green-400' :
                                                    order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                                                        'bg-red-500/10 text-red-400'
                                                    }`}>
                                                    {order.status === 'paid' ? 'Success' : order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 text-xs">
                                                {new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Recent Products */}
                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <h2 className="text-lg font-semibold text-white">Produk Terbaru</h2>
                        <Link href="/admin/products" className="text-brand-400 hover:text-brand-300 text-sm">
                            Lihat Semua
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-500 mx-auto"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-400">Belum ada produk</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-700/50">
                                    <tr>
                                        <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Produk</th>
                                        <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Harga</th>
                                        <th className="text-left text-gray-400 font-medium px-6 py-3 text-sm">Stock</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {products.slice(0, 5).map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-700/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.image || 'https://via.placeholder.com/40'}
                                                        alt={product.name}
                                                        className="w-8 h-8 rounded-lg object-cover"
                                                    />
                                                    <span className="text-white text-sm font-medium truncate max-w-[150px]">
                                                        {product.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-white text-sm">{formatPrice(product.price)}</td>
                                            <td className="px-6 py-4">
                                                <span className={`${product.stock > 10 ? 'text-green-400' : 'text-red-400'} text-sm`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
