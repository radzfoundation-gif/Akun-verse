import { ArrowLeft, Search, ShoppingCart, CreditCard, Mail, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const steps = [
    {
        number: 1,
        title: 'Pilih Game',
        description: 'Cari dan pilih game yang kamu inginkan dari katalog kami. Klik tombol "+" untuk menambahkan ke keranjang.',
        icon: Search,
        color: 'bg-blue-500'
    },
    {
        number: 2,
        title: 'Cek Keranjang',
        description: 'Klik ikon keranjang di pojok kanan atas untuk melihat game yang sudah kamu pilih. Kamu bisa menambah atau mengurangi jumlahnya.',
        icon: ShoppingCart,
        color: 'bg-green-500'
    },
    {
        number: 3,
        title: 'Pilih Pembayaran',
        description: 'Klik "Checkout Sekarang" dan pilih metode pembayaran yang kamu inginkan. Kami mendukung DANA, GoPay, OVO, dan transfer bank.',
        icon: CreditCard,
        color: 'bg-purple-500'
    },
    {
        number: 4,
        title: 'Terima Game Key',
        description: 'Setelah pembayaran berhasil, game key akan langsung dikirim ke email kamu dalam waktu 5 menit!',
        icon: Mail,
        color: 'bg-brand-500'
    }
];

const faqs = [
    {
        question: 'Apakah game key yang dijual legal?',
        answer: 'Ya, semua game key yang kami jual 100% legal dan resmi dari publisher.'
    },
    {
        question: 'Berapa lama proses pengiriman game key?',
        answer: 'Game key akan dikirim otomatis ke email kamu dalam 5 menit setelah pembayaran berhasil.'
    },
    {
        question: 'Bagaimana jika game key tidak berfungsi?',
        answer: 'Hubungi customer service kami via WhatsApp dan kami akan memberikan penggantian atau refund.'
    },
    {
        question: 'Apakah bisa membeli untuk hadiah?',
        answer: 'Tentu! Saat checkout, kamu bisa memasukkan email penerima untuk mengirim game key sebagai hadiah.'
    }
];

export default function CaraBeliPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-lg font-semibold text-gray-900">Cara Beli</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Gamepad2 size={32} className="text-brand-500" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Beli Game Semudah <span className="text-brand-500">1-2-3-4</span>
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto">
                        Proses pembelian super cepat! Dari pilih game sampai dapat key, cuma butuh waktu kurang dari 10 menit.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid sm:grid-cols-2 gap-6 mb-20">
                    {steps.map((step) => (
                        <div key={step.number} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                                    <step.icon size={24} />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-brand-500 mb-1">Langkah {step.number}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Pertanyaan Umum</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-500 text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-orange-500/30 hover:bg-brand-600 transition-colors"
                    >
                        <ShoppingCart size={20} />
                        Mulai Belanja Sekarang
                    </Link>
                </div>
            </main>
        </div>
    );
}
