'use client';

import { ArrowRight, Shield, Zap, Monitor, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ToolkitHero() {
    return (
        <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-[#0B0F19]">
            {/* Background Decor - Cyan/Blue theme */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/40 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111827] border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 animate-fade-in-up">
                            <span className="flex h-2 w-2 rounded-full bg-cyan-500"></span>
                            100% Legal & Aman
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-6 leading-[1.1]">
                            Windows PC <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Optimizer Toolkit</span>
                        </h1>

                        <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Solusi lengkap untuk PC lemot, error Windows, dan setup software.
                            100% legal tanpa crack — cocok untuk pemula hingga profesional.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="#menu" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3.5 rounded-full text-sm font-medium shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300">
                                <span>Lihat Fitur</span>
                                <ArrowRight size={16} />
                            </Link>
                            <button className="inline-flex items-center justify-center gap-2 bg-[#1F2933] text-gray-200 border border-white/10 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#111827] hover:border-white/20 transition-all duration-300">
                                Download Sekarang
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-gray-500">
                            <div className="flex items-center gap-2">
                                <Shield size={18} className="text-cyan-500" />
                                <span className="text-xs font-medium">100% Legal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap size={18} className="text-cyan-500" />
                                <span className="text-xs font-medium">One-Click</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-cyan-500" />
                                <span className="text-xs font-medium">Beginner Friendly</span>
                            </div>
                        </div>
                    </div>

                    {/* 3D Visual Composition */}
                    <div className="relative h-[400px] sm:h-[500px] flex items-center justify-center">
                        {/* Main Container */}
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-[#1F2933] border border-white/5 rounded-3xl shadow-2xl transform rotate-y-12 rotate-x-6 hover:rotate-y-6 transition-transform duration-500 z-10 flex flex-col items-center justify-center">
                            {/* Monitor Icon */}
                            <div className="text-cyan-400 bg-[#111827] p-6 rounded-2xl mb-4 shadow-inner border border-white/5">
                                <Monitor size={64} strokeWidth={1.5} />
                            </div>
                            <div className="text-center px-6">
                                <p className="text-sm font-medium text-gray-400 mb-1">PC Health Score</p>
                                <p className="text-3xl font-bold text-cyan-400">98%</p>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-6 -right-6 bg-green-600 text-white px-3 py-1.5 rounded-lg shadow-lg transform rotate-6 animate-float">
                                <div className="flex items-center gap-1">
                                    <CheckCircle size={14} />
                                    <span className="text-xs font-bold">Optimized!</span>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-8 bg-[#111827] border border-white/10 shadow-lg rounded-xl px-4 py-2 transform -rotate-6 animate-float-delayed">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-cyan-900/30 rounded-lg flex items-center justify-center">
                                        <Zap size={16} className="text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">RAM Freed</p>
                                        <p className="text-sm font-bold text-gray-200">2.4 GB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-1/2 -right-14 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1.5 rounded-lg shadow-lg transform rotate-3 -translate-y-1/2 animate-bounce-slow">
                                <span className="text-xs font-bold">FREE</span>
                            </div>
                        </div>

                        {/* Floor Shadow */}
                        <div className="absolute bottom-10 w-64 h-4 bg-black/50 blur-xl rounded-[100%]"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
