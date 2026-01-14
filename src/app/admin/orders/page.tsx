'use client';

import { useState, useEffect } from 'react';
import { Package, Search, Eye, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { getAllOrders, updateOrderStatus, SupabaseOrder } from '@/lib/userService';

export default function OrdersPage() {
    const [orders, setOrders] = useState<SupabaseOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setIsLoading(true);
        const data = await getAllOrders();
        setOrders(data);
        setIsLoading(false);
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
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleStatusChange = async (orderId: string, newStatus: SupabaseOrder['status']) => {
        const success = await updateOrderStatus(orderId, newStatus);
        if (success) {
            loadOrders();
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <CheckCircle size={12} />
                        Lunas
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        <Clock size={12} />
                        Pending
                    </span>
                );
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        <CheckCircle size={12} />
                        Selesai
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        <XCircle size={12} />
                        Dibatalkan
                    </span>
                );
            default:
                return null;
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user_id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Pesanan</h1>
                    <p className="text-gray-400">{orders.length} pesanan total</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nomor pesanan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option value="all">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Lunas</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-16">
                        <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">Belum ada pesanan</h3>
                        <p className="text-gray-400">Pesanan akan muncul di sini</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">No. Pesanan</th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Item</th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Total</th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Status</th>
                                    <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Tanggal</th>
                                    <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                                        <td className="py-4 px-4">
                                            <span className="font-mono text-sm text-white">{order.order_number}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-white">{order.items.length} item</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-white font-medium">{formatPrice(order.final_price)}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-gray-400 text-sm">{formatDate(order.paid_at || order.created_at || null)}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => order.id && handleStatusChange(order.id, e.target.value as SupabaseOrder['status'])}
                                                    className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="paid">Lunas</option>
                                                    <option value="completed">Selesai</option>
                                                    <option value="cancelled">Dibatalkan</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
