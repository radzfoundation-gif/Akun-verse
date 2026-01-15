import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import FAQList from '@/components/faq/FAQList';
import { faqData, faqCategories } from '@/data/faq';

export const metadata: Metadata = {
    title: 'FAQ - Pertanyaan Umum | Akunverse',
    description: 'Temukan jawaban untuk pertanyaan umum seputar layanan Akunverse. Informasi tentang cara pembelian, metode pembayaran, akun, dan kebijakan refund.',
};

export default function FAQPage() {
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

                {/* FAQ List Component (Client Side) */}
                <FAQList data={faqData} categories={faqCategories} />

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
