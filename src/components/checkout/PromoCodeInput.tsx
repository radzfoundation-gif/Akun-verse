'use client';

import { useState } from 'react';
import { Tag, Loader2, X, Check } from 'lucide-react';

interface PromoCodeInputProps {
    onApply: (code: string) => Promise<{ valid: boolean; discount: number; message: string }>;
    appliedCode: string | null;
    onRemove: () => void;
}

export default function PromoCodeInput({ onApply, appliedCode, onRemove }: PromoCodeInputProps) {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleApply = async () => {
        if (!code.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const result = await onApply(code.trim().toUpperCase());
            if (!result.valid) {
                setError(result.message);
            } else {
                setCode('');
            }
        } catch {
            setError('Gagal memverifikasi kode promo');
        } finally {
            setLoading(false);
        }
    };

    if (appliedCode) {
        return (
            <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={16} className="text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-green-400">Kode promo diterapkan</p>
                        <p className="text-xs text-green-500">{appliedCode}</p>
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

    return (
        <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300">Punya kode promo?</p>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.toUpperCase());
                            setError(null);
                        }}
                        placeholder="Masukkan kode promo"
                        className="w-full pl-10 pr-4 py-3 bg-[#111827] border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FACC15]/20 focus:border-[#FACC15]"
                    />
                </div>
                <button
                    onClick={handleApply}
                    disabled={!code.trim() || loading}
                    className="px-6 py-3 bg-[#FACC15] text-[#111827] text-sm font-bold rounded-xl hover:bg-[#EAB308] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : 'Terapkan'}
                </button>
            </div>
            {error && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                    <X size={14} />
                    {error}
                </p>
            )}
        </div>
    );
}
