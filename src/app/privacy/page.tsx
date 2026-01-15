import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Kebijakan Privasi',
    description: 'Kebijakan privasi dan perlindungan data Akunverse',
};

export default function PrivacyPage() {
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
                        Kebijakan Privasi
                    </h1>

                    <div className="prose prose-invert prose-gray max-w-none">
                        <p className="text-gray-300 mb-6">
                            Terakhir diperbarui: 15 Januari 2026
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            1. Informasi yang Kami Kumpulkan
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Kami mengumpulkan informasi yang Anda berikan secara langsung saat:
                        </p>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Membuat akun (nama, email, nomor HP)</li>
                            <li>Melakukan transaksi (data pembayaran)</li>
                            <li>Menghubungi customer service</li>
                            <li>Menggunakan fitur website</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            2. Penggunaan Informasi
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Informasi yang kami kumpulkan digunakan untuk:
                        </p>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Memproses dan mengirim pesanan</li>
                            <li>Mengirim notifikasi transaksi</li>
                            <li>Menyediakan layanan customer support</li>
                            <li>Meningkatkan pengalaman pengguna</li>
                            <li>Mengirim promo dan penawaran (dengan persetujuan)</li>
                            <li>Mencegah penipuan dan aktivitas ilegal</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            3. Perlindungan Data
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Kami menerapkan langkah-langkah keamanan untuk melindungi data Anda:
                        </p>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Enkripsi SSL untuk semua transmisi data</li>
                            <li>Penyimpanan password dengan hashing aman</li>
                            <li>Akses terbatas ke data personal</li>
                            <li>Monitoring keamanan berkala</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            4. Berbagi Informasi
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Kami tidak menjual data pribadi Anda. Informasi hanya dibagikan kepada:
                        </p>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Payment gateway untuk memproses pembayaran</li>
                            <li>Penyedia layanan email untuk notifikasi</li>
                            <li>Pihak berwenang jika diwajibkan hukum</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            5. Cookies
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Website kami menggunakan cookies untuk:
                        </p>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Menjaga sesi login Anda</li>
                            <li>Menyimpan preferensi pengguna</li>
                            <li>Menganalisis penggunaan website</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            6. Hak Pengguna
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Anda memiliki hak untuk:
                        </p>
                        <ul className="text-gray-400 list-disc pl-6 mb-4 space-y-2">
                            <li>Mengakses data pribadi Anda</li>
                            <li>Meminta koreksi data yang tidak akurat</li>
                            <li>Menghapus akun dan data Anda</li>
                            <li>Menolak email marketing</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            7. Retensi Data
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Data transaksi disimpan selama 5 tahun untuk keperluan akuntansi dan legal. Data akun disimpan selama akun aktif dan akan dihapus 30 hari setelah permintaan penghapusan.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            8. Perubahan Kebijakan
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Kebijakan privasi ini dapat berubah sewaktu-waktu. Perubahan signifikan akan diberitahukan melalui email atau notifikasi website.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">
                            9. Hubungi Kami
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Untuk pertanyaan tentang privasi data, hubungi kami di <Link href="/contact" className="text-purple-400 hover:text-purple-300">halaman kontak</Link> atau email privacy@akunverse.com
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
