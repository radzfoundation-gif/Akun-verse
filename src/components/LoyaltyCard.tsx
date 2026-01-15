'use client';

import { useLoyalty } from '@/contexts/LoyaltyContext';
import { Star, Gift, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const tierColors = {
    bronze: { bg: 'from-amber-700 to-amber-900', text: 'text-amber-400', icon: '🥉' },
    silver: { bg: 'from-gray-400 to-gray-600', text: 'text-gray-300', icon: '🥈' },
    gold: { bg: 'from-yellow-500 to-yellow-700', text: 'text-yellow-400', icon: '🥇' },
    platinum: { bg: 'from-purple-500 to-indigo-600', text: 'text-purple-300', icon: '💎' },
};

const tierThresholds = {
    bronze: 0,
    silver: 5000,
    gold: 20000,
    platinum: 50000,
};

export default function LoyaltyCard() {
    const { data, getTierBenefits, getPointsValue, isHydrated } = useLoyalty();

    if (!isHydrated) {
        return (
            <div className="bg-gray-800/50 rounded-2xl p-6 animate-pulse h-48" />
        );
    }

    const tierStyle = tierColors[data.tier];
    const benefits = getTierBenefits(data.tier);
    const pointsValue = getPointsValue(data.currentPoints);

    // Calculate progress to next tier
    const currentTierIndex = ['bronze', 'silver', 'gold', 'platinum'].indexOf(data.tier);
    const nextTier = ['silver', 'gold', 'platinum', null][currentTierIndex];
    const nextThreshold = nextTier ? tierThresholds[nextTier as keyof typeof tierThresholds] : null;
    const currentThreshold = tierThresholds[data.tier];
    const progress = nextThreshold
        ? ((data.lifetimePoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100
        : 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl"
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${tierStyle.bg}`} />

            {/* Content */}
            <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{tierStyle.icon}</span>
                            <span className={`text-lg font-bold capitalize ${tierStyle.text}`}>
                                {data.tier} Member
                            </span>
                        </div>
                        <p className="text-white/70 text-sm">Loyalty Points</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold text-white">
                            {data.currentPoints.toLocaleString('id-ID')}
                        </p>
                        <p className="text-white/70 text-sm">
                            ≈ Rp {pointsValue.toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>

                {/* Progress to Next Tier */}
                {nextTier && (
                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-white/70 mb-1">
                            <span>Progress ke {nextTier}</span>
                            <span>{Math.min(progress, 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.5 }}
                                className="h-full bg-white/80 rounded-full"
                            />
                        </div>
                        <p className="text-white/50 text-xs mt-1">
                            {(nextThreshold! - data.lifetimePoints).toLocaleString('id-ID')} points lagi
                        </p>
                    </div>
                )}

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/10 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
                            <TrendingUp size={12} />
                            Point Multiplier
                        </div>
                        <p className="text-white font-bold">{benefits.multiplier}x</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                        <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
                            <Gift size={12} />
                            Extra Discount
                        </div>
                        <p className="text-white font-bold">{benefits.discount}%</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
