import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Syarat & Ketentuan',
    description: 'Syarat dan ketentuan penggunaan layanan Akunverse',
};

export default function TermsPage() {
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

                {/* Content */}
                <div className="bg-white/5 rounded-2xl p-6 md:p-10">
                    <h1 className="text-3xl font-bold text-white mb-8">
                        Syarat & Ketentuan
                    </h1>

                    <div className="prose prose-invert prose-gray max-w-none">
                        <p className="text-gray-300 mb-6">
                            Terakhir diperbarui: 15 Januari 2026
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            1. Penerimaan Ketentuan
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Dengan mengakses dan menggunakan layanan Akunverse, Anda menyetujui untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            2. Definisi Layanan
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Akunverse adalah platform marketplace untuk produk digital termasuk namun tidak terbatas pada: akun game, voucher game, top up game, dan software. Kami bertindak sebagai perantara antara penjual dan pembeli.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            3. Akun Pengguna
                        </h2>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Anda harus berusia minimal 18 tahun atau memiliki izin dari orang tua/wali.</li>
                            <li>Anda bertanggung jawab untuk menjaga kerahasiaan akun Anda.</li>
                            <li>Satu orang hanya diperbolehkan memiliki satu akun.</li>
                            <li>Kami berhak menangguhkan akun yang melanggar ketentuan.</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            4. Transaksi & Pembayaran
                        </h2>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Semua harga dalam Rupiah (IDR) dan sudah final.</li>
                            <li>Pembayaran diproses melalui payment gateway resmi (Midtrans).</li>
                            <li>Produk digital akan dikirim setelah pembayaran terverifikasi.</li>
                            <li>Waktu pengiriman bervariasi tergantung jenis produk.</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            5. Kebijakan Refund
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Karena sifat produk digital, refund hanya diberikan dalam kondisi tertentu:
                        </p>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Produk tidak sesuai deskripsi</li>
                            <li>Produk tidak dapat digunakan (bukan karena kesalahan pembeli)</li>
                            <li>Pengajuan refund maksimal 24 jam setelah pembelian</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            6. Larangan
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Pengguna dilarang untuk:
                        </p>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Melakukan penipuan atau aktivitas ilegal</li>
                            <li>Menyalahgunakan sistem promo atau kupon</li>
                            <li>Membuat akun ganda untuk keuntungan tidak sah</li>
                            <li>Merusak atau mengganggu layanan</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            7. Batasan Tanggung Jawab
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Akunverse tidak bertanggung jawab atas kerugian yang timbul dari penggunaan layanan di luar kendali kami, termasuk namun tidak terbatas pada: banned akun oleh developer game, perubahan kebijakan platform pihak ketiga, atau force majeure.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            8. Perubahan Ketentuan
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan di website.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            9. Kontak
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Jika ada pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui halaman <Link href="/contact" className="text-purple-400 hover:text-purple-300">Kontak</Link>.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
