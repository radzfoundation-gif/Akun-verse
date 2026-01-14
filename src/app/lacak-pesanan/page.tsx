'use client';

import { useState } from 'react';
import { Search, Package, Loader2, CheckCircle, Clock, XCircle, Download, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getOrderByNumber, SupabaseOrder } from '@/lib/userService';

export default function TrackOrderPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [order, setOrder] = useState<SupabaseOrder | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) return;

        setIsLoading(true);
        setError(null);
        setSearched(true);

        const result = await getOrderByNumber(orderNumber.trim());

        if (result) {
            setOrder(result);
        } else {
            setOrder(null);
            setError('Pesanan tidak ditemukan. Pastikan nomor pesanan sudah benar.');
        }

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
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'paid':
                return {
                    label: 'Lunas',
                    icon: CheckCircle,
                    color: 'text-green-500',
                    bgColor: 'bg-green-100',
                    description: 'Pembayaran telah diterima'
                };
            case 'pending':
                return {
                    label: 'Menunggu Pembayaran',
                    icon: Clock,
                    color: 'text-yellow-500',
                    bgColor: 'bg-yellow-100',
                    description: 'Menunggu konfirmasi pembayaran'
                };
            case 'completed':
                return {
                    label: 'Selesai',
                    icon: CheckCircle,
                    color: 'text-blue-500',
                    bgColor: 'bg-blue-100',
                    description: 'Pesanan telah selesai'
                };
            case 'cancelled':
                return {
                    label: 'Dibatalkan',
                    icon: XCircle,
                    color: 'text-red-500',
                    bgColor: 'bg-red-100',
                    description: 'Pesanan dibatalkan'
                };
            default:
                return {
                    label: status,
                    icon: Package,
                    color: 'text-gray-500',
                    bgColor: 'bg-gray-100',
                    description: ''
                };
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-brand-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Lacak Pesanan</h1>
                    <p className="text-gray-500">Masukkan nomor pesanan untuk melihat status</p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                placeholder="Contoh: RLS-1768285135555QPNB-50"
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-gray-900"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !orderNumber.trim()}
                            className="px-6 py-4 bg-brand-500 text-white font-medium rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Lacak'}
                        </button>
                    </div>
                </form>

                {/* Results */}
                {isLoading && (
                    <div className="text-center py-12">
                        <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto mb-4" />
                        <p className="text-gray-500">Mencari pesanan...</p>
                    </div>
                )}

                {error && searched && !isLoading && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
                        <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="font-semibold text-red-800 mb-2">Pesanan Tidak Ditemukan</h3>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {order && !isLoading && (
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            {(() => {
                                const statusInfo = getStatusInfo(order.status);
                                const StatusIcon = statusInfo.icon;
                                return (
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 ${statusInfo.bgColor} rounded-full flex items-center justify-center`}>
                                            <StatusIcon className={`w-7 h-7 ${statusInfo.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status Pesanan</p>
                                            <h3 className={`text-xl font-bold ${statusInfo.color}`}>{statusInfo.label}</h3>
                                            <p className="text-sm text-gray-500">{statusInfo.description}</p>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Order Details */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Detail Pesanan</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Nomor Pesanan</span>
                                    <span className="font-mono font-medium text-gray-900">{order.order_number}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Tanggal Pemesanan</span>
                                    <span className="text-gray-900">{formatDate(order.created_at || null)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Metode Pembayaran</span>
                                    <span className="text-gray-900">{order.payment_method}</span>
                                </div>
                                <hr className="border-gray-100" />
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Total Pembayaran</span>
                                    <span className="text-lg font-bold text-brand-600">{formatPrice(order.final_price)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-4">Produk</h3>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{item.title}</h4>
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
                                                            className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-200 transition-colors"
                                                        >
                                                            <Download size={12} />
                                                            Download {i + 1}
                                                            <ExternalLink size={10} />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-500 transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                )}

                {/* Initial State */}
                {!searched && !isLoading && (
                    <div className="text-center text-gray-400 py-8">
                        <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p>Masukkan nomor pesanan di atas untuk melacak status pesanan kamu</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
