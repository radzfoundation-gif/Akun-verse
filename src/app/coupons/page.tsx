'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Ticket, Copy, Check, Sparkles, ArrowRight, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { claimCoupon, getUserCoupons } from '@/lib/supabase';
import Link from 'next/link';

// Available Coupons Data
const COUPONS = [
    {
        id: 'VERSE50',
        code: 'VERSE50',
        name: 'Diskon Spesial 50%',
        description: 'Potongan harga 50% untuk pembelian game apa saja tanpa minimum belanja.',
        discount: 0.5,
        type: 'percentage',
        minSpend: 0,
        bgColor: 'from-purple-600 to-blue-600',
        expiry: 'Berakhir dalam 2 hari'
    },
    {
        id: 'ONGKIRFREE',
        code: 'ONGKIRFREE',
        name: 'Gratis Ongkir',
        description: 'Gratis biaya layanan admin dan ongkir digital ke seluruh galaxy.',
        discount: 15000,
        type: 'fixed',
        minSpend: 50000,
        bgColor: 'from-[#FACC15] to-orange-500',
        textColor: 'text-[#111827]',
        expiry: 'Berlaku selamanya'
    },
    {
        id: 'BARUGABUNG',
        code: 'BARUGABUNG',
        name: 'Voucher Pengguna Baru',
        description: 'Diskon Rp 20.000 untuk transaksi pertamamu di Akunverse.',
        discount: 20000,
        type: 'fixed',
        minSpend: 100000,
        bgColor: 'from-emerald-500 to-teal-500',
        expiry: 'Sekali pakai'
    }
];

export default function CouponsPage() {
    const { user, isLoaded } = useUser();
    const [claimedCoupons, setClaimedCoupons] = useState<string[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [claimingId, setClaimingId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserCoupons() {
            if (user?.id) {
                try {
                    const coupons = await getUserCoupons(user.id);
                    setClaimedCoupons(coupons.map(c => c.coupon_code));
                } catch (error) {
                    console.error('Error fetching coupons:', error);
                }
            }
            setLoading(false);
        }
        if (isLoaded) {
            fetchUserCoupons();
        }
    }, [user, isLoaded]);

    const handleClaim = async (code: string) => {
        if (!user?.id) return;

        setClaimingId(code);
        try {
            await claimCoupon(user.id, code);
            setClaimedCoupons(prev => [...prev, code]);
        } catch (error) {
            console.error('Error claiming coupon:', error);
            alert(error instanceof Error ? error.message : 'Gagal klaim kupon');
        } finally {
            setClaimingId(null);
        }
    };

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedId(code);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <main className="min-h-screen bg-[#0B0F19] pb-20">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#FACC15]/10 rounded-full blur-3xl -z-10" />
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FACC15]/10 border border-[#FACC15]/20 rounded-full text-[#FACC15] text-sm font-semibold mb-6">
                        <Sparkles size={16} />
                        Verse Coupons Center
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                        Klaim Voucher <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-orange-500">Eksklusif</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                        Nikmati berbagai potongan harga dan penawaran menarik spesial untukmu. Klaim sekarang dan gunakan saat checkout!
                    </p>
                </div>
            </div>

            {/* Auth Check */}
            {!isLoaded || loading ? (
                <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#FACC15]"></div>
                </div>
            ) : !user ? (
                <div className="max-w-md mx-auto px-4 text-center py-16">
                    <div className="bg-[#1F2933] border border-white/5 rounded-2xl p-8">
                        <LogIn size={48} className="mx-auto text-[#FACC15] mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Login Dulu, Yuk!</h2>
                        <p className="text-gray-400 mb-6">Kamu perlu login untuk bisa klaim dan menggunakan kupon.</p>
                        <Link href="/sign-in" className="inline-block bg-[#FACC15] text-[#111827] px-8 py-3 rounded-xl font-bold hover:bg-[#EAB308] transition-colors">
                            Login Sekarang
                        </Link>
                    </div>
                </div>
            ) : (
                /* Coupons Grid */
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6">
                        {COUPONS.map((coupon) => {
                            const isClaimed = claimedCoupons.includes(coupon.code);
                            const isCopied = copiedId === coupon.code;
                            const isClaiming = claimingId === coupon.code;

                            return (
                                <motion.div
                                    key={coupon.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative bg-[#1F2933] border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-[#FACC15]/30 transition-colors group"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left Side: Visual */}
                                        <div className={`w-full md:w-1/3 bg-gradient-to-br ${coupon.bgColor} p-6 flex flex-col justify-center items-center text-center relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-black/10" />
                                            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0B0F19] rounded-full" />
                                            <div className="absolute -right-4 md:right-auto md:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0B0F19] rounded-full z-10" />

                                            <Ticket size={48} className={`relative z-10 mb-3 ${coupon.textColor || 'text-white'}`} />
                                            <h3 className={`text-2xl font-bold relative z-10 ${coupon.textColor || 'text-white'}`}>
                                                {coupon.code}
                                            </h3>
                                            <p className={`text-sm opacity-90 relative z-10 mt-1 ${coupon.textColor || 'text-white'}`}>
                                                {coupon.expiry}
                                            </p>
                                        </div>

                                        {/* Right Side: Info & Actions */}
                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold text-white">{coupon.name}</h3>
                                                    {isClaimed && (
                                                        <span className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-400/10 px-2 py-1 rounded-full">
                                                            <Check size={12} />
                                                            Terklaim
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                                                    {coupon.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                                <div className="flex-1 bg-[#111827] rounded-lg border border-white/10 px-3 py-2 flex justify-between items-center group-hover:border-white/20 transition-colors">
                                                    <code className="text-[#FACC15] font-mono font-bold tracking-wider">
                                                        {coupon.code}
                                                    </code>
                                                    <button
                                                        onClick={() => handleCopy(coupon.code)}
                                                        className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
                                                        title="Salin Kode"
                                                    >
                                                        {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => !isClaimed && handleClaim(coupon.code)}
                                                    disabled={isClaimed || isClaiming}
                                                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${isClaimed
                                                            ? 'bg-[#111827] text-gray-500 cursor-default'
                                                            : 'bg-[#FACC15] text-[#111827] hover:bg-[#EAB308] hover:shadow-lg hover:shadow-[#FACC15]/20'
                                                        }`}
                                                >
                                                    {isClaiming ? (
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#111827]"></div>
                                                    ) : isClaimed ? 'Sudah Diklaim' : 'Klaim'}
                                                    {!isClaimed && !isClaiming && <ArrowRight size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
