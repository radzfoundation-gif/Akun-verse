'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { OrderVerification } from '@/components/orders/OrderVerification';
import { ScamWarningAlert } from '@/components/checkout/ScamWarningAlert';

export default function VerifyOrderPage() {
    return (
        <div className="min-h-screen bg-[#0B0F19]">
            {/* Header */}
            <header className="bg-[#111827] border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-400" />
                    </Link>
                    <h1 className="text-lg font-semibold text-white">Verifikasi Pesanan</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Scam Warning */}
                <div className="mb-6">
                    <ScamWarningAlert variant="card" dismissible={true} />
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Verification Form */}
                    <OrderVerification />

                    {/* Info Card */}
                    <div className="space-y-6">
                        <div className="bg-[#1F2933] rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4">Mengapa Verifikasi Penting?</h3>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center text-xs text-green-400 flex-shrink-0 mt-0.5">1</span>
                                    <span><strong className="text-white">Mencegah Penipuan:</strong> Pastikan transaksi kamu terdaftar di sistem kami sebelum melakukan pembayaran.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center text-xs text-green-400 flex-shrink-0 mt-0.5">2</span>
                                    <span><strong className="text-white">Konfirmasi Status:</strong> Cek status terkini dari pesanan kamu kapan saja.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center text-xs text-green-400 flex-shrink-0 mt-0.5">3</span>
                                    <span><strong className="text-white">Bukti Transaksi:</strong> Nomor pesanan terverifikasi dapat digunakan sebagai bukti transaksi.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#1F2933] rounded-2xl p-6 border border-white/5">
                            <h3 className="text-base font-semibold text-white mb-3">Format Nomor Pesanan</h3>
                            <div className="bg-[#111827] rounded-xl p-4 font-mono text-sm text-center">
                                <span className="text-[#FACC15]">RLS</span>
                                <span className="text-gray-500">-</span>
                                <span className="text-blue-400">1705234567890</span>
                                <span className="text-gray-500">-</span>
                                <span className="text-green-400">AB</span>
                            </div>
                            <div className="mt-3 text-xs text-gray-500 space-y-1">
                                <p><span className="text-[#FACC15]">RLS</span> = Prefix RLabs Store</p>
                                <p><span className="text-blue-400">Angka</span> = Timestamp transaksi</p>
                                <p><span className="text-green-400">AB</span> = Kode verifikasi</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
                            <h3 className="text-base font-semibold text-white mb-2">Butuh Bantuan?</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Jika kamu mengalami masalah dengan pesanan, hubungi customer service kami.
                            </p>
                            <Link
                                href="/cara-beli"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
