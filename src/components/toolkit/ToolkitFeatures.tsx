'use client';

import {
    MousePointerClick,
    ShieldCheck,
    Heart,
    GraduationCap,
    RefreshCw,
    Lock
} from 'lucide-react';

const features = [
    {
        icon: MousePointerClick,
        title: 'One-Click Optimizer',
        description: 'Optimasi lengkap hanya dengan satu klik. Tidak perlu pengaturan rumit.',
        highlight: true
    },
    {
        icon: ShieldCheck,
        title: '100% Legal & Safe',
        description: 'Tanpa crack, tanpa license ilegal. Semua tools dari sumber resmi.'
    },
    {
        icon: Heart,
        title: 'Beginner-Friendly',
        description: 'Antarmuka sederhana dengan panduan di setiap langkah.'
    },
    {
        icon: GraduationCap,
        title: 'Built-in Tutorial',
        description: 'Video dan panduan terintegrasi untuk belajar sambil menggunakan.'
    },
    {
        icon: RefreshCw,
        title: 'Auto-Backup',
        description: 'Backup otomatis sebelum perubahan. Aman dari kesalahan.'
    },
    {
        icon: Lock,
        title: 'Privacy First',
        description: 'Tidak mengumpulkan data pribadi. Semua proses offline.'
    }
];

export default function ToolkitFeatures() {
    return (
        <section className="py-20 bg-[#0B0F19]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F2933] border border-white/5 text-cyan-400 text-xs font-semibold mb-4">
                        Fitur Unggulan
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                        Mengapa Memilih Toolkit Ini?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Dirancang khusus untuk pemula dengan fitur lengkap dan keamanan terjamin.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${feature.highlight
                                    ? 'bg-gradient-to-br from-cyan-600 to-blue-700 border-transparent text-white shadow-lg shadow-cyan-500/20'
                                    : 'bg-[#1F2933] border-white/5 hover:border-white/10 hover:shadow-lg'
                                    }`}
                            >
                                {feature.highlight && (
                                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                                        ⭐ Popular
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.highlight
                                    ? 'bg-white/20'
                                    : 'bg-[#111827] text-cyan-400 border border-white/5'
                                    }`}>
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>

                                <h3 className={`text-lg font-semibold mb-2 ${feature.highlight ? 'text-white' : 'text-white'
                                    }`}>
                                    {feature.title}
                                </h3>

                                <p className={`text-sm ${feature.highlight ? 'text-white/80' : 'text-gray-400'
                                    }`}>
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
