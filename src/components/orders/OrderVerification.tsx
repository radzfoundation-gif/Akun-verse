'use client';

import { useState } from 'react';
import { Search, CheckCircle, XCircle, Loader2, Shield, Copy, Check, Clock, Package, CreditCard, AlertTriangle } from 'lucide-react';
import { verifyOrderNumber } from '@/lib/security';

interface OrderVerificationProps {
    className?: string;
}

interface VerificationResult {
    isValid: boolean;
    orderNumber: string;
    status?: 'pending' | 'paid' | 'processing' | 'completed' | 'failed';
    customerName?: string;
    totalPrice?: number;
    paidAt?: string;
    message: string;
}

export function OrderVerification({ className = '' }: OrderVerificationProps) {
    const [orderNumber, setOrderNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [result, setResult] = useState<VerificationResult | null>(null);

    const handleVerify = async () => {
        if (!orderNumber.trim()) return;

        setIsVerifying(true);
        setResult(null);

        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Verify order number format using security utility
        const isValidFormat = verifyOrderNumber(orderNumber.trim());

        if (isValidFormat) {
            // In real app, this would fetch from API
            setResult({
                isValid: true,
                orderNumber: orderNumber.trim(),
                status: 'paid',
                customerName: 'Customer',
                totalPrice: 150000,
                paidAt: new Date().toISOString(),
                message: 'Order terverifikasi! Transaksi ini valid dan tercatat di sistem kami.',
            });
        } else {
            setResult({
                isValid: false,
                orderNumber: orderNumber.trim(),
                message: 'Nomor pesanan tidak ditemukan atau formatnya tidak valid.',
            });
        }

        setIsVerifying(false);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(dateString));
    };

    return (
        <div className={`bg-[#1F2933] rounded-2xl p-6 border border-white/5 ${className}`}>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Shield size={20} className="text-blue-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Verifikasi Pesanan</h2>
                    <p className="text-xs text-gray-400">Pastikan transaksi kamu valid dan aman</p>
                </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nomor Pesanan
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                            placeholder="RLS-1234567890ABCD-12"
                            className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kode Verifikasi (Opsional)
                    </label>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                        placeholder="XXXXXXXX"
                        className="w-full px-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                </div>

                <button
                    onClick={handleVerify}
                    disabled={isVerifying || !orderNumber.trim()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isVerifying ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Memverifikasi...
                        </>
                    ) : (
                        <>
                            <Search size={18} />
                            Verifikasi Sekarang
                        </>
                    )}
                </button>
            </div>

            {/* Result */}
            {result && (
                <div className={`mt-6 p-4 rounded-xl border ${result.isValid
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                    }`}>
                    <div className="flex items-start gap-3">
                        {result.isValid ? (
                            <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                            <XCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                            <h3 className={`font-medium ${result.isValid ? 'text-green-400' : 'text-red-400'}`}>
                                {result.isValid ? 'Transaksi Terverifikasi' : 'Verifikasi Gagal'}
                            </h3>
                            <p className={`text-sm mt-1 ${result.isValid ? 'text-green-300/70' : 'text-red-300/70'}`}>
                                {result.message}
                            </p>

                            {result.isValid && result.status && (
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <Package size={14} />
                                        <span>Status: <span className="text-white capitalize">{result.status}</span></span>
                                    </div>
                                    {result.totalPrice && (
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <CreditCard size={14} />
                                            <span>Total: <span className="text-[#FACC15]">{formatPrice(result.totalPrice)}</span></span>
                                        </div>
                                    )}
                                    {result.paidAt && (
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Clock size={14} />
                                            <span>Dibayar: <span className="text-white">{formatDate(result.paidAt)}</span></span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Tips */}
            <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-xs font-medium text-amber-300">Tips Keamanan</h4>
                        <ul className="mt-1 text-xs text-amber-200/70 space-y-1">
                            <li>• Selalu verifikasi order sebelum melakukan pembayaran</li>
                            <li>• Nomor pesanan valid dimulai dengan "RLS-"</li>
                            <li>• Simpan bukti pembayaran sampai barang diterima</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function OrderStatusTimeline({ status }: {
    status: 'pending' | 'paid' | 'processing' | 'completed' | 'failed';
}) {
    const steps = [
        { key: 'pending', label: 'Menunggu Pembayaran', icon: Clock },
        { key: 'paid', label: 'Pembayaran Diterima', icon: CreditCard },
        { key: 'processing', label: 'Diproses', icon: Package },
        { key: 'completed', label: 'Selesai', icon: CheckCircle },
    ];

    const statusOrder = ['pending', 'paid', 'processing', 'completed'];
    const currentIndex = statusOrder.indexOf(status);

    if (status === 'failed') {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <XCircle size={20} className="text-red-400" />
                    <div>
                        <p className="text-sm font-medium text-red-400">Transaksi Gagal</p>
                        <p className="text-xs text-red-300/70">Silakan hubungi customer service untuk bantuan.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {steps.map((step, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;
                const Icon = step.icon;

                return (
                    <div key={step.key} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted
                            ? 'bg-green-500/20'
                            : 'bg-gray-500/10'
                            }`}>
                            <Icon size={16} className={isCompleted ? 'text-green-400' : 'text-gray-500'} />
                        </div>
                        <div className="flex-1 pb-4 border-l border-white/10 -ml-4 pl-6">
                            <p className={`text-sm font-medium ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                                {step.label}
                            </p>
                            {isCurrent && (
                                <p className="text-xs text-green-400 mt-0.5">Saat ini</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default OrderVerification;
