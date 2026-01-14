'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Download, Shield, Clock, CheckCircle, Printer, Share2 } from 'lucide-react';
import { generateSecureToken } from '@/lib/security';

interface TransactionReceiptProps {
    orderNumber: string;
    items: Array<{
        title: string;
        quantity: number;
        price: number;
    }>;
    totalPrice: number;
    finalPrice: number;
    discount?: number;
    promoCode?: string | null;
    paymentMethod: string;
    customerInfo: {
        name: string;
        email: string;
        phone?: string;
    };
    paidAt?: string;
    status?: 'pending' | 'paid' | 'processing' | 'completed' | 'failed';
}

export function TransactionReceipt({
    orderNumber,
    items,
    totalPrice,
    finalPrice,
    discount = 0,
    promoCode,
    paymentMethod,
    customerInfo,
    paidAt,
    status = 'paid',
}: TransactionReceiptProps) {
    const [copied, setCopied] = useState(false);
    const [verificationCode] = useState(() => generateSecureToken().slice(0, 8));

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date(dateString));
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const qrData = JSON.stringify({
        order: orderNumber,
        verification: verificationCode,
        amount: finalPrice,
        timestamp: paidAt || new Date().toISOString(),
    });

    const statusConfig = {
        pending: { color: 'text-amber-400 bg-amber-500/10', label: 'Menunggu Pembayaran' },
        paid: { color: 'text-green-400 bg-green-500/10', label: 'Pembayaran Diterima' },
        processing: { color: 'text-blue-400 bg-blue-500/10', label: 'Sedang Diproses' },
        completed: { color: 'text-green-400 bg-green-500/10', label: 'Selesai' },
        failed: { color: 'text-red-400 bg-red-500/10', label: 'Gagal' },
    };

    return (
        <div className="bg-[#1F2933] rounded-2xl overflow-hidden border border-white/5 shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FACC15]/10 to-[#F59E0B]/10 border-b border-white/5 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-white">Bukti Transaksi</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Transaction Receipt</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig[status].color}`}>
                        {statusConfig[status].label}
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* QR Code & Order Info */}
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* QR Code */}
                    <div className="flex-shrink-0">
                        <div className="bg-white p-4 rounded-xl inline-block">
                            <QRCodeSVG
                                value={qrData}
                                size={120}
                                level="H"
                                includeMargin={false}
                            />
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">Scan untuk verifikasi</p>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 space-y-3">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">No. Pesanan</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm font-mono font-bold text-white">{orderNumber}</p>
                                <button
                                    onClick={() => handleCopy(orderNumber)}
                                    className="p-1 hover:bg-white/5 rounded transition-colors"
                                >
                                    {copied ? (
                                        <Check size={14} className="text-green-400" />
                                    ) : (
                                        <Copy size={14} className="text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Kode Verifikasi</p>
                            <p className="text-sm font-mono text-[#FACC15] mt-1">{verificationCode}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Tanggal Transaksi</p>
                            <p className="text-sm text-gray-300 mt-1">{formatDate(paidAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-white/10" />

                {/* Items */}
                <div>
                    <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-3">Detail Pesanan</h3>
                    <div className="space-y-2">
                        {items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-300">
                                    {item.title} <span className="text-gray-500">x{item.quantity}</span>
                                </span>
                                <span className="text-white font-medium">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-white/10" />

                {/* Totals */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-400">
                            <span>Diskon {promoCode && `(${promoCode})`}</span>
                            <span>-{formatPrice(discount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Biaya Admin</span>
                        <span className="text-green-400">Gratis</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10">
                        <span className="text-white font-semibold">Total Pembayaran</span>
                        <span className="text-xl font-bold text-[#FACC15]">{formatPrice(finalPrice)}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-white/10" />

                {/* Customer Info */}
                <div>
                    <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-3">Informasi Pembeli</h3>
                    <div className="space-y-1 text-sm">
                        <p className="text-white">{customerInfo.name}</p>
                        <p className="text-gray-400">{customerInfo.email}</p>
                        {customerInfo.phone && <p className="text-gray-400">{customerInfo.phone}</p>}
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Metode Pembayaran</h3>
                    <p className="text-sm text-white capitalize">{paymentMethod.replace('_', ' ')}</p>
                </div>

                {/* Security Badge */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                        <Shield size={16} className="text-green-400" />
                        <div>
                            <p className="text-xs font-medium text-green-400">Transaksi Terverifikasi</p>
                            <p className="text-xs text-green-300/70">
                                Dilindungi oleh sistem keamanan RLabs
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="border-t border-white/5 px-6 py-4 flex gap-3">
                <button
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111827] text-gray-300 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
                >
                    <Printer size={16} />
                    Cetak
                </button>
                <button
                    onClick={() => handleCopy(`Pesanan ${orderNumber} - ${formatPrice(finalPrice)}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FACC15] text-[#111827] rounded-xl text-sm font-medium hover:bg-[#EAB308] transition-colors"
                >
                    <Share2 size={16} />
                    Bagikan
                </button>
            </div>
        </div>
    );
}

export function MiniTransactionReceipt({ orderNumber, totalPrice, status }: {
    orderNumber: string;
    totalPrice: number;
    status: 'pending' | 'paid' | 'completed';
}) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="bg-[#111827] rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500">Order</p>
                    <p className="text-sm font-mono font-medium text-white">{orderNumber}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-sm font-bold text-[#FACC15]">{formatPrice(totalPrice)}</p>
                </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
                {status === 'paid' || status === 'completed' ? (
                    <>
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-xs text-green-400">Pembayaran Berhasil</span>
                    </>
                ) : (
                    <>
                        <Clock size={14} className="text-amber-400" />
                        <span className="text-xs text-amber-400">Menunggu Pembayaran</span>
                    </>
                )}
            </div>
        </div>
    );
}

export default TransactionReceipt;
