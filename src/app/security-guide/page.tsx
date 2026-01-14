'use client';

import { ArrowLeft, Shield, AlertTriangle, Lock, Eye, Phone, Mail, Ban, CheckCircle, ExternalLink, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const securityTips = [
    {
        icon: Lock,
        title: 'Jangan Bagikan OTP',
        description: 'Kode OTP adalah rahasia. RLabs tidak pernah meminta kode OTP melalui telepon, email, atau chat.',
        color: 'text-red-400 bg-red-500/10',
    },
    {
        icon: Eye,
        title: 'Periksa URL Website',
        description: 'Pastikan kamu bertransaksi di website resmi rlabs.store. Waspadai website palsu dengan URL mirip.',
        color: 'text-blue-400 bg-blue-500/10',
    },
    {
        icon: Shield,
        title: 'Gunakan Pembayaran Resmi',
        description: 'Selalu bayar melalui metode pembayaran yang tersedia di platform. Jangan transfer ke rekening pribadi.',
        color: 'text-green-400 bg-green-500/10',
    },
    {
        icon: Mail,
        title: 'Waspada Email Phishing',
        description: 'Email resmi RLabs hanya dari domain @rlabs.store. Jangan klik link dari email mencurigakan.',
        color: 'text-purple-400 bg-purple-500/10',
    },
    {
        icon: Phone,
        title: 'Verifikasi Telepon',
        description: 'RLabs tidak pernah menghubungi untuk meminta data pribadi atau pembayaran ulang.',
        color: 'text-amber-400 bg-amber-500/10',
    },
    {
        icon: Ban,
        title: 'Tolak Penawaran Mencurigakan',
        description: 'Jika ada penawaran yang terlalu bagus untuk jadi kenyataan, kemungkinan besar itu scam.',
        color: 'text-orange-400 bg-orange-500/10',
    },
];

const scamSigns = [
    'Meminta kode OTP atau PIN',
    'Meminta transfer ke rekening pribadi',
    'Menawarkan harga jauh di bawah normal',
    'Memaksa untuk segera melakukan pembayaran',
    'Menghubungi melalui nomor tidak resmi',
    'Meminta informasi kartu kredit lengkap',
    'Email dari domain mencurigakan',
    'Website dengan URL tidak resmi',
];

const safeActions = [
    'Selalu cek status pesanan di akun RLabs kamu',
    'Simpan bukti pembayaran dan nomor pesanan',
    'Verifikasi order di halaman /orders/verify',
    'Hubungi customer service resmi jika ragu',
    'Laporkan aktivitas mencurigakan segera',
    'Gunakan password yang kuat dan unik',
];

export default function SecurityGuidePage() {
    return (
        <div className="min-h-screen bg-[#0B0F19]">
            {/* Header */}
            <header className="bg-[#111827] border-b border-white/5 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-400" />
                    </Link>
                    <h1 className="text-lg font-semibold text-white">Panduan Keamanan</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Hero */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Shield size={28} className="text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Lindungi Diri dari Penipuan</h2>
                            <p className="text-gray-400">
                                Pelajari cara mengenali dan menghindari scam saat bertransaksi di RLabs Store.
                                Keamanan transaksi kamu adalah prioritas kami.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Tips */}
                <section className="mb-10">
                    <h3 className="text-xl font-semibold text-white mb-6">Tips Keamanan Transaksi</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {securityTips.map((tip, index) => (
                            <div
                                key={index}
                                className="bg-[#1F2933] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-lg ${tip.color} flex items-center justify-center mb-3`}>
                                    <tip.icon size={20} />
                                </div>
                                <h4 className="text-white font-medium mb-1">{tip.title}</h4>
                                <p className="text-sm text-gray-400">{tip.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Scam Signs & Safe Actions */}
                <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    {/* Scam Signs */}
                    <section className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle size={24} className="text-red-400" />
                            <h3 className="text-lg font-semibold text-red-300">Tanda-tanda Penipuan</h3>
                        </div>
                        <ul className="space-y-3">
                            {scamSigns.map((sign, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center text-xs text-red-400 flex-shrink-0 mt-0.5">
                                        ✕
                                    </span>
                                    <span className="text-red-200/80">{sign}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Safe Actions */}
                    <section className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle size={24} className="text-green-400" />
                            <h3 className="text-lg font-semibold text-green-300">Yang Harus Dilakukan</h3>
                        </div>
                        <ul className="space-y-3">
                            {safeActions.map((action, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center text-xs text-green-400 flex-shrink-0 mt-0.5">
                                        ✓
                                    </span>
                                    <span className="text-green-200/80">{action}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Verification CTA */}
                <section className="bg-[#1F2933] rounded-2xl p-6 border border-white/5 mb-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-1">Verifikasi Pesanan Kamu</h3>
                            <p className="text-sm text-gray-400">
                                Gunakan fitur verifikasi untuk memastikan pesanan kamu valid dan tercatat di sistem kami.
                            </p>
                        </div>
                        <Link
                            href="/orders/verify"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FACC15] text-[#111827] rounded-xl font-medium hover:bg-[#EAB308] transition-colors"
                        >
                            Verifikasi Sekarang
                            <ExternalLink size={16} />
                        </Link>
                    </div>
                </section>

                {/* Help Section */}
                <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <HelpCircle size={24} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Butuh Bantuan?</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Jika kamu menemukan aktivitas mencurigakan atau memiliki pertanyaan tentang keamanan transaksi,
                                jangan ragu untuk menghubungi tim customer service kami.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/cara-beli"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                                >
                                    <Mail size={16} />
                                    Hubungi Kami
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
                                >
                                    Kembali ke Beranda
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        © 2026 RLabs Store. Transaksi kamu dilindungi oleh sistem keamanan berlapis.
                    </p>
                </div>
            </main>
        </div>
    );
}
