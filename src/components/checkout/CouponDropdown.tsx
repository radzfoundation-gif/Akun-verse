'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Ticket, Check, X, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getUserCoupons } from '@/lib/supabase';
import Link from 'next/link';

// Available coupon definitions (should match coupons page)
const COUPON_DETAILS: Record<string, { name: string; discount: number; type: 'percent' | 'fixed'; minSpend: number }> = {
    'VERSE50': { name: 'Diskon 50%', discount: 0.5, type: 'percent', minSpend: 0 },
    'ONGKIRFREE': { name: 'Gratis Ongkir', discount: 15000, type: 'fixed', minSpend: 50000 },
    'BARUGABUNG': { name: 'Voucher Pengguna Baru', discount: 20000, type: 'fixed', minSpend: 100000 },
    'DISKON10': { name: 'Diskon 10%', discount: 0.1, type: 'percent', minSpend: 0 },
};

interface CouponDropdownProps {
    totalPrice: number;
    onApply: (code: string, discount: number) => void;
    onRemove: () => void;
    appliedCode: string | null;
}

export default function CouponDropdown({ totalPrice, onApply, onRemove, appliedCode }: CouponDropdownProps) {
    const { user, isLoaded } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [userCoupons, setUserCoupons] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCoupons() {
            if (user?.id) {
                try {
                    const coupons = await getUserCoupons(user.id);
                    setUserCoupons(coupons.map(c => c.coupon_code));
                } catch (error) {
                    console.error('Error fetching user coupons:', error);
                }
            }
            setLoading(false);
        }
        if (isLoaded) {
            fetchCoupons();
        }
    }, [user, isLoaded]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleSelect = (code: string) => {
        const coupon = COUPON_DETAILS[code];
        if (!coupon) return;

        // Check min spend
        if (coupon.minSpend > totalPrice) {
            alert(`Minimum belanja ${formatPrice(coupon.minSpend)} untuk kupon ini.`);
            return;
        }

        let discountAmount = 0;
        if (coupon.type === 'percent') {
            discountAmount = Math.floor(totalPrice * coupon.discount);
        } else {
            discountAmount = coupon.discount;
        }
        discountAmount = Math.min(discountAmount, totalPrice);

        onApply(code, discountAmount);
        setIsOpen(false);
    };

    // If applied, show the applied state
    if (appliedCode) {
        const coupon = COUPON_DETAILS[appliedCode];
        return (
            <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={16} className="text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-green-400">Kupon diterapkan</p>
                        <p className="text-xs text-green-500">{appliedCode} - {coupon?.name || ''}</p>
                    </div>
                </div>
                <button
                    onClick={onRemove}
                    className="p-1 hover:bg-green-500/20 rounded-full transition-colors"
                >
                    <X size={18} className="text-green-400" />
                </button>
            </div>
        );
    }

    // Not logged in
    if (isLoaded && !user) {
        return (
            <div className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">Login untuk menggunakan kupon</p>
                <Link href="/sign-in" className="text-[#FACC15] text-sm font-medium hover:underline">
                    Login Sekarang
                </Link>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="bg-[#111827] border border-white/10 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-400">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Memuat kupon...</span>
            </div>
        );
    }

    // No coupons
    if (userCoupons.length === 0) {
        return (
            <div className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm mb-2">Belum ada kupon yang diklaim</p>
                <Link href="/coupons" className="text-[#FACC15] text-sm font-medium hover:underline">
                    Klaim Kupon Sekarang
                </Link>
            </div>
        );
    }

    return (
        <div className="relative">
            <p className="text-sm font-medium text-gray-300 mb-2">Pilih Kupon</p>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-left hover:border-[#FACC15]/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Ticket size={18} className="text-[#FACC15]" />
                    <span className="text-white text-sm">Pilih kupon ({userCoupons.length} tersedia)</span>
                </div>
                <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-20 w-full mt-2 bg-[#1F2933] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    {userCoupons.map((code) => {
                        const coupon = COUPON_DETAILS[code];
                        if (!coupon) return null;
                        const isEligible = totalPrice >= coupon.minSpend;

                        return (
                            <button
                                key={code}
                                onClick={() => isEligible && handleSelect(code)}
                                disabled={!isEligible}
                                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors border-b border-white/5 last:border-b-0 ${isEligible
                                        ? 'hover:bg-white/5 cursor-pointer'
                                        : 'opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                <div>
                                    <p className="text-white text-sm font-medium">{code}</p>
                                    <p className="text-gray-400 text-xs">{coupon.name}</p>
                                    {!isEligible && (
                                        <p className="text-red-400 text-xs mt-1">Min. belanja {formatPrice(coupon.minSpend)}</p>
                                    )}
                                </div>
                                <span className="text-[#FACC15] text-sm font-bold">
                                    {coupon.type === 'percent'
                                        ? `${coupon.discount * 100}%`
                                        : formatPrice(coupon.discount)
                                    }
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
