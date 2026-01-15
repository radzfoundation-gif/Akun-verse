import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, UserCheck, Eye, ShieldAlert, Database } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Kebijakan Privasi | Akunverse',
    description: 'Kebijakan privasi dan perlindungan data pengguna di Akunverse.',
};

export default function PrivacyPage() {
    const sections = [
        {
            title: '1. Pengumpulan Informasi',
            icon: <Database className="text-blue-500" size={20} />,
            content: 'Kami mengumpulkan informasi yang Anda berikan saat mendaftar (via Clerk), melakukan pembelian, atau menghubungi tim dukungan kami. Informasi ini mencakup nama, alamat email, dan data riwayat transaksi.'
        },
        {
            title: '2. Pengunaan Informasi',
            icon: <UserCheck className="text-green-500" size={20} />,
            content: 'Informasi yang kami kumpulkan digunakan untuk: \n- Memproses transaksi dan pengiriman produk digital secara otomatis. \n- Memberikan akses ke riwayat pesanan Anda. \n- Mengirimkan notifikasi terkait status pesanan atau pembaruan layanan.'
        },
        {
            title: '3. Perlindungan & Keamanan Data',
            icon: <ShieldAlert className="text-purple-500" size={20} />,
            content: 'Kami mengimplementasikan berbagai langkah keamanan untuk menjaga keamanan data pribadi Anda. Transaksi pembayaran diproses secara aman melalui protokol enkripsi SSL oleh partner payment gateway resmi kami (Midtrans).'
        },
        {
            title: '4. Pengungkapan Pihak Ketiga',
            icon: <Eye className="text-yellow-500" size={20} />,
            content: 'Kami tidak menjual, menyewakan, atau memberikan informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran. Kami hanya membagikan data dengan pihak ketiga yang diperlukan untuk menjalankan layanan kami, seperti penyedia pembayaran dan infrastruktur server.'
        },
        {
            title: '5. Hak Pengguna',
            icon: <UserCheck className="text-pink-500" size={20} />,
            content: 'Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda melalui pengaturan akun. Jika Anda ingin menutup akun sepenuhnya, silakan hubungi tim dukungan kami.'
        }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Kebijakan Privasi
                    </h1>
                    <p className="text-gray-400">
                        Terakhir diperbarui: 15 Januari 2026
                    </p>
                </div>

                <div className="space-y-8">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                {section.icon}
                                <h2 className="text-xl font-semibold text-white">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-2xl">
                    <h3 className="text-white font-semibold mb-2">Hubungi Kami</h3>
                    <p className="text-gray-400 text-sm">
                        Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, Anda dapat menghubungi kami melalui halaman kontak atau email resmi Akunverse.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
