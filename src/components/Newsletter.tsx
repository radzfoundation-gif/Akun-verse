'use client';

import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setStatus('error');
            setMessage('Email tidak boleh kosong');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error');
            setMessage('Format email tidak valid');
            return;
        }

        setStatus('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus('success');
        setMessage('Terima kasih! Kupon 10% telah dikirim ke emailmu.');
        setEmail('');

        // Reset after 5 seconds
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 5000);
    };

    return (
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="bg-gradient-to-r from-[#111827] to-[#1F2933] rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-black/20 border border-white/5">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#grid)"></rect>
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">Jangan Lewatkan Promo Kilat!</h2>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Daftar newsletter kami dan dapatkan kupon tambahan 10% untuk pembelian pertamamu.</p>

                        {status === 'success' ? (
                            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl py-4 px-6 max-w-md mx-auto">
                                <CheckCircle size={24} className="text-[#FACC15]" />
                                <span className="font-medium">{message}</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <div className="flex-1">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (status === 'error') setStatus('idle');
                                        }}
                                        placeholder="Email kamu..."
                                        className={`w-full px-4 py-3 rounded-xl text-white border-2 focus:ring-2 focus:ring-[#FACC15]/50 bg-[#0B0F19] placeholder:text-gray-500 ${status === 'error' ? 'border-red-500' : 'border-white/10'
                                            }`}
                                    />
                                    {status === 'error' && (
                                        <p className="text-left text-sm text-red-400 mt-1">{message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-[#FACC15] text-[#111827] px-6 py-3 rounded-xl font-medium hover:bg-[#EAB308] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Memproses...</span>
                                        </>
                                    ) : (
                                        'Langganan'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
