'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Clock, XCircle, Loader2, ArrowLeft, Package, Receipt, RefreshCw, Home, ShoppingBag } from 'lucide-react';
import { secureRetrieve, secureRemove, SecureOrderData } from '@/lib/security';
import { useCart } from '@/contexts/CartContext';

function PaymentStatusContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { clearCart } = useCart();

    const orderId = searchParams.get('order_id');
    const statusParam = searchParams.get('status');

    const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error' | 'expired'>('loading');
    const [orderData, setOrderData] = useState<SecureOrderData | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        // Get stored checkout data
        const data = secureRetrieve<SecureOrderData>('checkout');
        if (data) {
            setOrderData(data);
        }

        // Set status based on URL parameter
        if (statusParam === 'success') {
            setStatus('success');
            clearCart();
            secureRemove('checkout');
        } else if (statusParam === 'pending') {
            setStatus('pending');
        } else if (statusParam === 'error') {
            setStatus('error');
        } else {
            // Default to pending if no status provided
            setStatus('pending');
        }
    }, [statusParam, clearCart]);

    const handleRefreshStatus = async () => {
        if (!orderId) return;

        setIsRefreshing(true);
        try {
            const response = await fetch(`/api/midtrans/status?order_id=${orderId}`);
            const data = await response.json();

            if (data.transaction_status === 'settlement' || data.transaction_status === 'capture') {
                setStatus('success');
                clearCart();
                secureRemove('checkout');
            } else if (data.transaction_status === 'pending') {
                setStatus('pending');
            } else if (data.transaction_status === 'expire') {
                setStatus('expired');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error refreshing status:', error);
        }
        setIsRefreshing(false);
    };

    const handleDownloadInvoice = async () => {
        if (!orderData || !orderId) return;

        try {
            const response = await fetch('/api/invoice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    orderDate: new Date().toISOString(), // Use actual date if available
                    customerName: orderData.customerInfo.name,
                    customerEmail: orderData.customerInfo.email,
                    items: orderData.items.map(item => ({
                        name: item.title,
                        quantity: item.quantity,
                        price: item.priceValue
                    })),
                    subtotal: orderData.totalPrice,
                    discount: orderData.discount,
                    total: orderData.finalPrice,
                    paymentMethod: orderData.paymentMethod.toUpperCase(),
                    paymentStatus: 'paid'
                }),
            });

            if (!response.ok) throw new Error('Failed to generate invoice');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${orderId}.html`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading invoice:', error);
            alert('Gagal mengunduh invoice');
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const statusConfig = {
        loading: {
            icon: Loader2,
            iconClass: 'text-gray-400 animate-spin',
            bgClass: 'bg-gray-500/10',
            title: 'Memuat Status...',
            message: 'Mohon tunggu sebentar',
        },
        success: {
            icon: CheckCircle,
            iconClass: 'text-green-400',
            bgClass: 'bg-green-500/10',
            title: 'Pembayaran Berhasil! 🎉',
            message: 'Terima kasih! Pesanan kamu sedang diproses.',
        },
        pending: {
            icon: Clock,
            iconClass: 'text-amber-400',
            bgClass: 'bg-amber-500/10',
            title: 'Menunggu Pembayaran',
            message: 'Silakan selesaikan pembayaran kamu.',
        },
        error: {
            icon: XCircle,
            iconClass: 'text-red-400',
            bgClass: 'bg-red-500/10',
            title: 'Pembayaran Gagal',
            message: 'Terjadi kesalahan saat memproses pembayaran.',
        },
        expired: {
            icon: Clock,
            iconClass: 'text-gray-400',
            bgClass: 'bg-gray-500/10',
            title: 'Pembayaran Kedaluwarsa',
            message: 'Waktu pembayaran telah habis.',
        },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className="min-h-screen bg-[#0B0F19]">
            {/* Header */}
            <header className="bg-[#111827] border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-400" />
                    </Link>
                    <h1 className="text-lg font-semibold text-white">Status Pembayaran</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-12">
                {/* Status Card */}
                <div className={`${config.bgClass} border border-white/5 rounded-2xl p-8 text-center mb-8`}>
                    <div className={`w-20 h-20 rounded-full ${config.bgClass} flex items-center justify-center mx-auto mb-6`}>
                        <Icon size={40} className={config.iconClass} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{config.title}</h2>
                    <p className="text-gray-400 mb-4">{config.message}</p>

                    {orderId && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111827] rounded-xl">
                            <Receipt size={16} className="text-gray-500" />
                            <span className="text-sm text-gray-400">Order ID:</span>
                            <span className="text-sm font-mono text-white">{orderId}</span>
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                {orderData && (
                    <div className="bg-[#1F2933] border border-white/5 rounded-2xl p-6 mb-8">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Package size={20} className="text-gray-400" />
                            Ringkasan Pesanan
                        </h3>

                        <div className="space-y-3 mb-4">
                            {orderData.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="text-gray-400">
                                        {item.title} <span className="text-gray-500">x{item.quantity}</span>
                                    </span>
                                    <span className="text-white">{formatPrice(item.priceValue * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/5 pt-4 space-y-2">
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Subtotal</span>
                                <span>{formatPrice(orderData.totalPrice)}</span>
                            </div>
                            {orderData.discount > 0 && (
                                <div className="flex justify-between text-sm text-green-400">
                                    <span>Diskon</span>
                                    <span>-{formatPrice(orderData.discount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-2 border-t border-white/10">
                                <span className="font-semibold text-white">Total</span>
                                <span className="text-xl font-bold text-[#FACC15]">{formatPrice(orderData.finalPrice)}</span>
                            </div>
                        </div>

                        {orderData.customerInfo && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <p className="text-xs text-gray-500 mb-1">Dikirim ke:</p>
                                <p className="text-sm text-white">{orderData.customerInfo.name}</p>
                                <p className="text-sm text-gray-400">{orderData.customerInfo.email}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {status === 'pending' && (
                        <button
                            onClick={handleRefreshStatus}
                            disabled={isRefreshing}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#FACC15] text-[#111827] rounded-xl font-medium hover:bg-[#EAB308] transition-colors disabled:opacity-50"
                        >
                            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                            {isRefreshing ? 'Memeriksa...' : 'Cek Status Pembayaran'}
                        </button>
                    )}

                    {status === 'success' && (
                        <>
                            <button
                                onClick={handleDownloadInvoice}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#111827] text-white border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-colors"
                            >
                                <Receipt size={18} />
                                Download Invoice
                            </button>
                            <Link
                                href="/orders"
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#FACC15] text-[#111827] rounded-xl font-medium hover:bg-[#EAB308] transition-colors"
                            >
                                <Package size={18} />
                                Pesanan Saya
                            </Link>
                        </>
                    )}

                    {(status === 'error' || status === 'expired') && (
                        <Link
                            href="/checkout"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#FACC15] text-[#111827] rounded-xl font-medium hover:bg-[#EAB308] transition-colors"
                        >
                            <ShoppingBag size={18} />
                            Coba Lagi
                        </Link>
                    )}

                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#111827] text-white border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-colors"
                    >
                        <Home size={18} />
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* Help Text */}
                {status === 'pending' && (
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Jika kamu sudah melakukan pembayaran, status akan terupdate otomatis dalam beberapa menit.
                        Atau klik tombol di atas untuk memeriksa secara manual.
                    </p>
                )}
            </main>
        </div>
    );
}

export default function PaymentStatusPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
                <Loader2 size={32} className="text-[#FACC15] animate-spin" />
            </div>
        }>
            <PaymentStatusContent />
        </Suspense>
    );
}
