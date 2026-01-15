'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Send, MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        {
            icon: MessageCircle,
            title: 'WhatsApp',
            value: '+62 812-3456-7890',
            link: 'https://wa.me/6281234567890',
        },
        {
            icon: Mail,
            title: 'Email',
            value: 'support@akunverse.com',
            link: 'mailto:support@akunverse.com',
        },
        {
            icon: Clock,
            title: 'Jam Operasional',
            value: 'Setiap Hari, 09:00 - 22:00 WIB',
            link: null,
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Beranda
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Hubungi Kami
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white/5 rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">
                                Informasi Kontak
                            </h2>

                            <div className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">{item.title}</p>
                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-purple-400 transition-colors"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-white">{item.value}</p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Prompt */}
                        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/20">
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Cek FAQ Dulu!
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Mungkin pertanyaan Anda sudah terjawab di halaman FAQ kami.
                            </p>
                            <Link
                                href="/faq"
                                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium"
                            >
                                Lihat FAQ
                                <ArrowLeft size={16} className="rotate-180" />
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/5 rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-white mb-6">
                            Kirim Pesan
                        </h2>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Pesan Terkirim!
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Terima kasih! Tim kami akan menghubungi Anda dalam 1x24 jam.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-purple-400 hover:text-purple-300"
                                >
                                    Kirim pesan lain
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="Masukkan nama Anda"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Subjek
                                    </label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    >
                                        <option value="" className="bg-gray-800">Pilih subjek</option>
                                        <option value="order" className="bg-gray-800">Pertanyaan Pesanan</option>
                                        <option value="payment" className="bg-gray-800">Masalah Pembayaran</option>
                                        <option value="product" className="bg-gray-800">Informasi Produk</option>
                                        <option value="refund" className="bg-gray-800">Permintaan Refund</option>
                                        <option value="other" className="bg-gray-800">Lainnya</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Pesan
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                        placeholder="Tulis pesan Anda di sini..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Kirim Pesan
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
