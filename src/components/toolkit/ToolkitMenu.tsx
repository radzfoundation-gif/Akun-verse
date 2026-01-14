'use client';

import {
    LayoutDashboard,
    Zap,
    Wrench,
    Package,
    Settings,
    BookOpen,
    PlusCircle,
    HelpCircle,
    ArrowRight
} from 'lucide-react';

const menuItems = [
    {
        id: 1,
        icon: LayoutDashboard,
        title: 'Dashboard Utama',
        description: 'Ringkasan kondisi PC, quick actions, dan statistik sistem real-time.',
        features: ['Health Score', 'Quick Actions', 'System Stats'],
        color: 'from-blue-500 to-blue-600',
        bgLight: 'bg-blue-50',
        textColor: 'text-blue-500'
    },
    {
        id: 2,
        icon: Zap,
        title: 'Optimasi Windows',
        description: 'Tools untuk mempercepat PC lemot dan meningkatkan performa.',
        features: ['Junk Cleaner', 'Startup Manager', 'RAM Booster'],
        color: 'from-cyan-500 to-cyan-600',
        bgLight: 'bg-cyan-50',
        textColor: 'text-cyan-500'
    },
    {
        id: 3,
        icon: Wrench,
        title: 'Fix Error Windows',
        description: 'Perbaiki berbagai error dan masalah Windows secara otomatis.',
        features: ['SFC Scanner', 'BSOD Analyzer', 'Network Fixer'],
        color: 'from-red-500 to-red-600',
        bgLight: 'bg-red-50',
        textColor: 'text-red-500'
    },
    {
        id: 4,
        icon: Package,
        title: 'Software Toolkit',
        description: 'Koleksi software gratis dan legal untuk kebutuhan sehari-hari.',
        features: ['Office Suite', 'Media Player', 'Design Tools'],
        color: 'from-purple-500 to-purple-600',
        bgLight: 'bg-purple-50',
        textColor: 'text-purple-500'
    },
    {
        id: 5,
        icon: Settings,
        title: 'Preset & Config',
        description: 'Konfigurasi siap pakai untuk berbagai kebutuhan user.',
        features: ['Gaming Preset', 'Office Mode', 'Low-End PC'],
        color: 'from-orange-500 to-orange-600',
        bgLight: 'bg-orange-50',
        textColor: 'text-orange-500'
    },
    {
        id: 6,
        icon: BookOpen,
        title: 'Panduan & Tutorial',
        description: 'Edukasi dan panduan lengkap untuk pemula.',
        features: ['Video Tutorial', 'FAQ', 'Glosarium'],
        color: 'from-green-500 to-green-600',
        bgLight: 'bg-green-50',
        textColor: 'text-green-500'
    },
    {
        id: 7,
        icon: PlusCircle,
        title: 'Tools Tambahan',
        description: 'Utilitas tambahan untuk kebutuhan spesifik.',
        features: ['System Info', 'Backup Tool', 'Benchmark'],
        color: 'from-indigo-500 to-indigo-600',
        bgLight: 'bg-indigo-50',
        textColor: 'text-indigo-500'
    },
    {
        id: 8,
        icon: HelpCircle,
        title: 'Bantuan & Disclaimer',
        description: 'Informasi penting, support, dan aspek legal.',
        features: ['Panduan Penggunaan', 'Legal Info', 'Support'],
        color: 'from-gray-500 to-gray-600',
        bgLight: 'bg-gray-100',
        textColor: 'text-gray-500'
    }
];

export default function ToolkitMenu() {
    return (
        <section id="menu" className="py-20 bg-[#111827]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
                        Menu & Fitur Lengkap
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Semua tools yang Anda butuhkan untuk optimasi dan perbaikan Windows PC dalam satu paket.
                    </p>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="group bg-[#1F2933] rounded-2xl p-6 border border-white/5 shadow-sm hover:shadow-xl hover:border-[#FACC15]/20 hover:shadow-[#FACC15]/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                {/* Icon */}
                                <div className={`bg-[#0B0F19] ${item.textColor} border border-white/5 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FACC15] transition-colors">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                    {item.description}
                                </p>

                                {/* Features Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className={`bg-[#111827] text-gray-400 border border-white/5 text-xs font-medium px-2.5 py-1 rounded-full`}
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Action */}
                                <div className={`flex items-center gap-1 ${item.textColor} text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                                    <span>Lihat Detail</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
