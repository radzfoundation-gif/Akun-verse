'use client';

import { Shield, Lock, CheckCircle, Clock, BadgeCheck, Verified, ShieldCheck, CreditCard } from 'lucide-react';

interface TrustBadgeProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    color?: string;
}

const TrustBadge = ({ icon, title, description, color = 'text-green-500' }: TrustBadgeProps) => (
    <div className="flex items-start gap-3 p-3 bg-[#111827]/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
        <div className={`${color} flex-shrink-0 mt-0.5`}>
            {icon}
        </div>
        <div className="min-w-0">
            <h4 className="text-sm font-medium text-white">{title}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

export function TrustBadgesGrid() {
    const badges = [
        {
            icon: <ShieldCheck size={20} />,
            title: 'Perlindungan Pembeli',
            description: 'Transaksimu dilindungi. Uang aman sampai barang diterima.',
            color: 'text-green-500',
        },
        {
            icon: <Lock size={20} />,
            title: 'Pembayaran Aman',
            description: 'Enkripsi end-to-end untuk semua transaksi.',
            color: 'text-blue-500',
        },
        {
            icon: <BadgeCheck size={20} />,
            title: 'Seller Terverifikasi',
            description: 'Semua produk berasal dari seller yang sudah diverifikasi.',
            color: 'text-purple-500',
        },
        {
            icon: <Clock size={20} />,
            title: 'Garansi Pengiriman',
            description: 'Game key dikirim otomatis setelah pembayaran.',
            color: 'text-amber-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((badge, index) => (
                <TrustBadge key={index} {...badge} />
            ))}
        </div>
    );
}

export function TrustBadgesInline() {
    const badges = [
        { icon: <Shield size={14} />, text: 'Perlindungan Pembeli', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
        { icon: <Lock size={14} />, text: 'Pembayaran Aman', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        { icon: <Verified size={14} />, text: 'Seller Verified', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
                <div
                    key={index}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.color}`}
                >
                    {badge.icon}
                    <span>{badge.text}</span>
                </div>
            ))}
        </div>
    );
}

export function EscrowIndicator({ timeLeft }: { timeLeft?: number }) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Shield size={20} className="text-green-400" />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-green-400">Escrow Protection Active</h4>
                    <p className="text-xs text-green-300/70">
                        Dana kamu ditahan dengan aman sampai transaksi selesai
                    </p>
                </div>
                {timeLeft && (
                    <div className="text-right">
                        <p className="text-xs text-green-300/70">Sisa waktu</p>
                        <p className="text-lg font-mono font-bold text-green-400">{formatTime(timeLeft)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export function SecurePaymentBanner() {
    return (
        <div className="bg-[#1F2933] border border-white/5 rounded-xl p-4">
            <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-[#1F2933]">
                        <CreditCard size={14} className="text-blue-400" />
                    </div>
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-[#1F2933]">
                        <Shield size={14} className="text-green-400" />
                    </div>
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border-2 border-[#1F2933]">
                        <Lock size={14} className="text-purple-400" />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white">Pembayaran 100% Aman</h4>
                    <p className="text-xs text-gray-400">Dilindungi enkripsi SSL dan sistem anti-fraud</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle size={14} />
                    <span>Terverifikasi</span>
                </div>
            </div>
        </div>
    );
}

export default TrustBadgesGrid;
