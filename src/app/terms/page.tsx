import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ScrollText, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Syarat & Ketentuan | Akunverse',
    description: 'Syarat dan ketentuan layanan penggunaan platform Akunverse.',
};

export default function TermsPage() {
    const sections = [
        {
            title: '1. Ketentuan Penggunaan',
            icon: <ScrollText className="text-purple-500" size={20} />,
            content: 'Dengan mengakses dan menggunakan platform Akunverse, Anda dianggap telah membaca, memahami, dan menyetujui untuk terikat dengan Syarat dan Ketentuan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, mohon untuk tidak menggunakan layanan kami.'
        },
        {
            title: '2. Kelayakan Pengguna',
            icon: <ShieldCheck className="text-green-500" size={20} />,
            content: 'Layanan Akunverse tersedia untuk individu yang sudah berusia minimal 13 tahun atau yang memiliki izin dari orang tua/wali. Pengguna bertanggung jawab penuh atas kerahasiaan akun dan data login mereka sendiri.'
        },
        {
            title: '3. Deskripsi Layanan & Lisensi',
            icon: <Scale className="text-blue-500" size={20} />,
            content: 'Akunverse menyediakan platform marketplace untuk produk digital (aset game, voucher, lisensi software). Pembelian produk digital di Akunverse memberikan lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk penggunaan pribadi, sesuai dengan kebijakan developer masing-masing produk.'
        },
        {
            title: '4. Pengiriman Digital',
            icon: <AlertCircle className="text-yellow-500" size={20} />,
            content: 'Seluruh produk yang dijual adalah bersifat digital. Informasi akun, kode voucher, atau lisensi akan dikirimkan secara elektronik melalui dashboard akun pengguna atau email setelah pembayaran terverifikasi oleh sistem payment gateway (Midtrans).'
        },
        {
            title: '5. Kebijakan Pengembalian (Refund)',
            icon: <AlertCircle className="text-red-500" size={20} />,
            content: 'Mengingat sifat produk adalah digital (sekali pakai/instan), refund hanya dapat diajukan dalam kondisi tertentu: \na) Produk tidak sesuai dengan deskripsi yang tertera. \nb) Produk tidak dapat digunakan/valid saat pertama kali diterima (bukan karena kesalahan pengguna). \nc) Pengajuan maksimal dilakukan 24 jam setelah pesanan diterima.'
        },
        {
            title: '6. Batasan Tanggung Jawab',
            icon: <ShieldCheck className="text-purple-500" size={20} />,
            content: 'Akunverse tidak bertanggung jawab atas kerugian yang disebabkan oleh kebijakan pihak ketiga (seperti banned oleh developer game) setelah produk berhasil dikirim dan digunakan sesuai prosedur yang sah.'
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
                        Syarat & Ketentuan
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

                <div className="mt-12 p-6 bg-purple-600/10 border border-purple-500/20 rounded-2xl text-center">
                    <p className="text-sm text-gray-400 italic">
                        Syarat dan Ketentuan ini dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Pengguna disarankan untuk mengecek halaman ini secara berkala.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
