'use client';

import { useState } from 'react';
import { AlertTriangle, X, ChevronDown, ChevronUp, Shield, ExternalLink, Info } from 'lucide-react';

interface ScamWarningAlertProps {
    variant?: 'banner' | 'card' | 'minimal';
    dismissible?: boolean;
    className?: string;
}

export function ScamWarningAlert({ variant = 'card', dismissible = true, className = '' }: ScamWarningAlertProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    if (!isVisible) return null;

    const tips = [
        'Jangan pernah memberikan kode OTP kepada siapapun',
        'Pastikan selalu bertransaksi melalui platform resmi',
        'Waspada terhadap penawaran harga yang terlalu murah',
        'Simpan bukti pembayaran sampai barang diterima',
        'Laporkan segera jika menemukan aktivitas mencurigakan',
    ];

    if (variant === 'minimal') {
        return (
            <div className={`flex items-center gap-2 text-xs text-amber-400 ${className}`}>
                <Info size={14} />
                <span>Waspada penipuan! Jangan bagikan kode OTP.</span>
            </div>
        );
    }

    if (variant === 'banner') {
        return (
            <div className={`bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-y border-amber-500/20 px-4 py-2 ${className}`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
                        <span className="text-amber-200">
                            <strong>Waspada Penipuan:</strong> Jangan pernah memberikan kode OTP atau PIN kepada siapapun.
                        </span>
                    </div>
                    {dismissible && (
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1 hover:bg-amber-500/20 rounded transition-colors"
                        >
                            <X size={16} className="text-amber-400" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl overflow-hidden ${className}`}>
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield size={20} className="text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold text-amber-300">Tips Keamanan Transaksi</h4>
                            {dismissible && (
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="p-1 hover:bg-amber-500/20 rounded transition-colors"
                                >
                                    <X size={14} className="text-amber-400" />
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-amber-200/70 mt-1">
                            Lindungi dirimu dari penipuan online dengan mengikuti tips berikut
                        </p>
                    </div>
                </div>

                {/* Expandable Tips */}
                <div className="mt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                    >
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        <span>{isExpanded ? 'Sembunyikan tips' : 'Lihat tips keamanan'}</span>
                    </button>

                    {isExpanded && (
                        <div className="mt-3 space-y-2">
                            {tips.map((tip, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2 text-xs text-amber-100/80 pl-2"
                                >
                                    <span className="w-4 h-4 bg-amber-500/20 rounded-full flex items-center justify-center text-[10px] text-amber-400 flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span>{tip}</span>
                                </div>
                            ))}
                            <a
                                href="/security-guide"
                                className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 mt-2 pl-2"
                            >
                                Baca panduan lengkap <ExternalLink size={12} />
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Warning Strip */}
            <div className="bg-amber-500/10 px-4 py-2 border-t border-amber-500/20">
                <div className="flex items-center gap-2 text-xs">
                    <AlertTriangle size={12} className="text-amber-500" />
                    <span className="text-amber-200/80">
                        RLabs <strong>tidak pernah</strong> meminta password, PIN, atau kode OTP
                    </span>
                </div>
            </div>
        </div>
    );
}

export function FraudAlertBanner({ riskLevel }: { riskLevel: 'low' | 'medium' | 'high' }) {
    const config = {
        low: {
            bg: 'bg-green-500/10 border-green-500/20',
            icon: 'text-green-400',
            text: 'text-green-300',
            title: 'Transaksi Aman',
            message: 'Tidak ada aktivitas mencurigakan terdeteksi',
        },
        medium: {
            bg: 'bg-amber-500/10 border-amber-500/20',
            icon: 'text-amber-400',
            text: 'text-amber-300',
            title: 'Perhatian',
            message: 'Pastikan semua informasi sudah benar sebelum melanjutkan',
        },
        high: {
            bg: 'bg-red-500/10 border-red-500/20',
            icon: 'text-red-400',
            text: 'text-red-300',
            title: 'Peringatan Keamanan',
            message: 'Terdeteksi pola transaksi yang tidak biasa',
        },
    };

    const { bg, icon, text, title, message } = config[riskLevel];

    return (
        <div className={`${bg} border rounded-xl p-4`}>
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${icon} bg-current/20`}>
                    {riskLevel === 'low' ? (
                        <Shield size={16} className={icon} />
                    ) : (
                        <AlertTriangle size={16} className={icon} />
                    )}
                </div>
                <div>
                    <h4 className={`text-sm font-medium ${text}`}>{title}</h4>
                    <p className={`text-xs ${text}/70`}>{message}</p>
                </div>
            </div>
        </div>
    );
}

export default ScamWarningAlert;
