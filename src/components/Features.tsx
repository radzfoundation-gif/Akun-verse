import { ShieldCheck, Zap, CreditCard, Headphones } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: 'Transaksi Aman',
        description: 'Garansi uang kembali 100% jika ada masalah dengan pesanan Anda.'
    },
    {
        icon: Zap,
        title: 'Proses Instan',
        description: 'Pengiriman otomatis dalam hitungan menit setelah pembayaran.'
    },
    {
        icon: CreditCard,
        title: 'Pembayaran Lengkap',
        description: 'QRIS, Transfer Bank, E-Wallet, dan metode pembayaran lainnya.'
    },
    {
        icon: Headphones,
        title: 'Support 24/7',
        description: 'Tim customer service siap membantu kapan saja Anda butuhkan.'
    }
];

export default function Features() {
    return (
        <section className="py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                        Kenapa Belanja di RLabs Store?
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Platform marketplace terpercaya untuk semua kebutuhan digital Anda
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="text-center p-6 bg-[#1F2933] rounded-2xl border border-white/5">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#111827] text-[#FACC15] rounded-2xl mb-4">
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
