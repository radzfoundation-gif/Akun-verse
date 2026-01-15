'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    // Umum
    {
        category: 'Umum',
        question: 'Apa itu Akunverse?',
        answer: 'Akunverse adalah platform marketplace untuk produk digital seperti akun game, voucher, top up game, dan software. Kami menyediakan produk dengan harga termurah dan proses yang cepat serta aman.',
    },
    {
        category: 'Umum',
        question: 'Apakah Akunverse aman dan terpercaya?',
        answer: 'Ya, 100% aman. Kami sudah melayani ribuan pelanggan sejak 2024. Semua transaksi dilindungi oleh payment gateway resmi (Midtrans) dan kami memberikan garansi untuk setiap produk.',
    },
    {
        category: 'Umum',
        question: 'Jam operasional customer service?',
        answer: 'Tim customer service kami aktif setiap hari dari jam 09:00 - 22:00 WIB. Untuk pertanyaan di luar jam operasional, Anda bisa mengirim pesan dan kami akan membalas keesokan harinya.',
    },
    // Pembelian
    {
        category: 'Pembelian',
        question: 'Bagaimana cara membeli produk?',
        answer: '1. Pilih produk yang diinginkan\n2. Klik "Beli Sekarang" atau tambahkan ke keranjang\n3. Login/daftar akun\n4. Pilih metode pembayaran\n5. Selesaikan pembayaran\n6. Produk akan dikirim otomatis atau via email',
    },
    {
        category: 'Pembelian',
        question: 'Metode pembayaran apa saja yang tersedia?',
        answer: 'Kami menerima berbagai metode pembayaran: QRIS (semua e-wallet), Transfer Bank (BCA, BNI, BRI, Mandiri, dll), E-Wallet (GoPay, OVO, Dana, ShopeePay), dan virtual account.',
    },
    {
        category: 'Pembelian',
        question: 'Berapa lama produk dikirim setelah pembayaran?',
        answer: 'Untuk produk instan, pengiriman langsung dalam hitungan detik setelah pembayaran terverifikasi. Untuk produk manual, maksimal 1-24 jam tergantung jenis produk.',
    },
    {
        category: 'Pembelian',
        question: 'Apakah ada minimal pembelian?',
        answer: 'Tidak ada minimal pembelian. Anda bisa membeli produk berapapun nilainya.',
    },
    // Akun
    {
        category: 'Akun',
        question: 'Apakah wajib membuat akun untuk membeli?',
        answer: 'Ya, Anda perlu membuat akun untuk melakukan pembelian. Ini untuk memudahkan tracking pesanan dan pengiriman produk digital.',
    },
    {
        category: 'Akun',
        question: 'Bagaimana cara melihat riwayat pesanan?',
        answer: 'Setelah login, klik menu profil di pojok kanan atas, lalu pilih "Pesanan Saya" untuk melihat semua riwayat transaksi.',
    },
    {
        category: 'Akun',
        question: 'Bagaimana jika lupa password?',
        answer: 'Klik "Lupa Password" di halaman login, masukkan email Anda, dan ikuti instruksi yang dikirim ke email untuk reset password.',
    },
    // Produk
    {
        category: 'Produk',
        question: 'Apa perbedaan akun sharing dan private?',
        answer: 'Akun Sharing: akun digunakan bersama user lain, lebih murah, cocok untuk penggunaan kasual.\nAkun Private: akun 100% milik Anda sendiri, bisa ganti email/password, cocok untuk jangka panjang.',
    },
    {
        category: 'Produk',
        question: 'Apakah produk bergaransi?',
        answer: 'Ya, semua produk memiliki garansi. Durasi garansi bervariasi tergantung jenis produk (biasanya 1-30 hari). Detail garansi tertera di halaman produk.',
    },
    {
        category: 'Produk',
        question: 'Bagaimana jika produk bermasalah?',
        answer: 'Segera hubungi customer service kami dengan menyertakan bukti pembelian dan screenshot masalah. Kami akan memproses penggantian atau refund sesuai kebijakan garansi.',
    },
    // Refund
    {
        category: 'Refund',
        question: 'Apakah bisa refund?',
        answer: 'Refund bisa dilakukan dalam kondisi tertentu: produk tidak sesuai deskripsi, produk tidak bisa digunakan (bukan kesalahan pembeli), atau stok habis setelah pembayaran. Pengajuan maksimal 24 jam setelah pembelian.',
    },
    {
        category: 'Refund',
        question: 'Berapa lama proses refund?',
        answer: 'Setelah pengajuan disetujui, dana akan dikembalikan dalam 1-3 hari kerja tergantung metode pembayaran awal.',
    },
];

const categories = ['Semua', 'Umum', 'Pembelian', 'Akun', 'Produk', 'Refund'];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filteredFAQ = faqData.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Beranda
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-400">
                        Temukan jawaban untuk pertanyaan umum seputar layanan kami
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Cari pertanyaan..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="space-y-3">
                    {filteredFAQ.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400">Tidak ada pertanyaan yang cocok dengan pencarian Anda.</p>
                        </div>
                    ) : (
                        filteredFAQ.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white/5 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-white font-medium pr-4">{item.question}</span>
                                    <ChevronDown
                                        className={`text-gray-400 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                            }`}
                                        size={20}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-4">
                                                <p className="text-gray-400 whitespace-pre-line">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/20">
                    <h3 className="text-xl font-semibold text-white mb-2">
                        Tidak menemukan jawaban?
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Tim kami siap membantu menjawab pertanyaan Anda
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                        Hubungi Kami
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}
