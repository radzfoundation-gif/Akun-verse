'use client';

import { useState } from 'react';
import { useReferral } from '@/contexts/ReferralContext';
import { Tag, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReferralInputProps {
    onApply?: (discount: number) => void;
    className?: string;
}

export default function ReferralInput({ onApply, className = '' }: ReferralInputProps) {
    const { applyReferralCode, isReferralApplied, appliedReferralCode, clearAppliedReferral, getDiscountPercent } = useReferral();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleApply = () => {
        setError('');
        setSuccess(false);

        if (!code.trim()) {
            setError('Masukkan kode referral');
            return;
        }

        const isValid = applyReferralCode(code.trim());

        if (isValid) {
            setSuccess(true);
            setCode('');
            onApply?.(getDiscountPercent());
        } else {
            setError('Kode referral tidak valid');
        }
    };

    const handleClear = () => {
        clearAppliedReferral();
        setSuccess(false);
        onApply?.(0);
    };

    if (isReferralApplied) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center justify-between bg-green-500/20 border border-green-500/30 rounded-xl p-4 ${className}`}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                        <p className="text-green-400 text-sm font-medium">Kode Referral Diterapkan!</p>
                        <p className="text-gray-400 text-xs">
                            {appliedReferralCode} • Diskon 5%
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleClear}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                    <X size={18} />
                </button>
            </motion.div>
        );
    }

    return (
        <div className={className}>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.toUpperCase());
                            setError('');
                        }}
                        placeholder="Kode Referral (opsional)"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors uppercase"
                        maxLength={10}
                    />
                </div>
                <button
                    onClick={handleApply}
                    disabled={!code.trim()}
                    className="px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
                >
                    Pakai
                </button>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-sm mt-2"
                    >
                        {error}
                    </motion.p>
                )}
                {success && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-green-400 text-sm mt-2"
                    >
                        ✓ Diskon 5% berhasil diterapkan!
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
