'use client';

import { Download, CheckCircle, ShieldCheck, MessageCircle } from 'lucide-react';

export default function ToolkitCTA() {
    return (
        <section className="py-20 bg-[#111827] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-cyan-400 text-sm font-medium mb-8">
                        <ShieldCheck size={16} />
                        <span>100% Aman & Legal</span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
                        Siap Optimalkan PC Anda?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                        Download Windows PC Optimizer Toolkit sekarang dan rasakan perbedaannya.
                        Gratis untuk penggunaan personal.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-full text-base font-medium shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300">
                            <Download size={20} />
                            <span>Download Gratis</span>
                        </button>
                        <button className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm text-white border border-white/10 px-8 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-all duration-300">
                            <MessageCircle size={20} />
                            <span>Hubungi Kami</span>
                        </button>
                    </div>

                    {/* Included Features */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-400" />
                            <span>Gratis Selamanya</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-400" />
                            <span>Tanpa Iklan</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-400" />
                            <span>Update Berkala</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-400" />
                            <span>Support 24/7</span>
                        </div>
                    </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="mt-16 p-6 rounded-2xl bg-[#1F2933] border border-white/5">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <ShieldCheck size={18} className="text-cyan-400" />
                        Disclaimer Legal
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Toolkit ini 100% legal dan tidak mengandung crack, keygen, atau license ilegal.
                        Semua software pihak ketiga yang direkomendasikan adalah freeware atau open source
                        dari sumber resmi. Pengguna bertanggung jawab untuk backup data sebelum penggunaan.
                        Aplikasi tidak mengumpulkan data pribadi dan semua proses berjalan secara offline.
                    </p>
                </div>
            </div>
        </section>
    );
}
