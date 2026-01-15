'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useReferral } from '@/contexts/ReferralContext';
import { Gift, Copy, Check, Users, Wallet, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReferralCard() {
    const { user } = useUser();
    const { referralData, generateReferralCode, initializeReferral } = useReferral();
    const [copied, setCopied] = useState(false);

    const referralCode = user ? generateReferralCode(user.id) : null;
    const referralLink = referralCode ? `https://akunverse.vercel.app/?ref=${referralCode}` : '';

    // Initialize referral data periodically or when user changes
    useEffect(() => {
        if (user) {
            initializeReferral(user.id);
        }
    }, [user, initializeReferral]);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Akunverse - Game Digital Termurah',
                    text: `Gunakan kode referral saya ${referralCode} dan dapatkan diskon 50%!`,
                    url: referralLink,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            handleCopy(referralLink);
        }
    };

    if (!user) {
        return (
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <Gift className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">Program Referral</h3>
                        <p className="text-gray-400 text-sm">Login untuk mendapatkan kode referral</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/20"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Program Referral</h3>
                    <p className="text-gray-400 text-sm">Ajak teman, dapat reward!</p>
                </div>
            </div>

            {/* Referral Code */}
            <div className="bg-black/30 rounded-xl p-4 mb-4">
                <p className="text-gray-400 text-xs mb-2">Kode Referral Kamu</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white tracking-wider">
                        {referralCode}
                    </span>
                    <button
                        onClick={() => handleCopy(referralCode || '')}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        {copied ? (
                            <Check className="w-5 h-5 text-green-400" />
                        ) : (
                            <Copy className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-black/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400 text-xs">Total Referral</span>
                    </div>
                    <p className="text-white font-bold text-xl">
                        {referralData?.totalReferrals || 0}
                    </p>
                </div>
                <div className="bg-black/20 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Wallet className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400 text-xs">Total Reward</span>
                    </div>
                    <p className="text-white font-bold text-xl">
                        {(referralData?.totalReferrals || 0)} Voucher
                    </p>
                </div>
            </div>

            {/* Benefits */}
            <div className="bg-black/20 rounded-xl p-4 mb-4">
                <p className="text-white font-medium mb-2">🎁 Keuntungan:</p>
                <ul className="text-gray-400 text-sm space-y-1">
                    <li>• Teman dapat <span className="text-green-400 font-medium">diskon 50%</span> pembelian pertama</li>
                    <li>• Kamu dapat <span className="text-purple-400 font-medium">Voucher 100%</span> setiap teman beli</li>
                </ul>
            </div>

            {/* Share Button */}
            <button
                onClick={handleShare}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
            >
                <Share2 size={18} />
                Bagikan ke Teman
            </button>
        </motion.div>
    );
}
