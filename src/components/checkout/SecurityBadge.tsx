'use client';

import { Shield, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

interface SecurityBadgeProps {
    status: 'secure' | 'warning' | 'verified';
    message?: string;
    className?: string;
}

const statusConfig = {
    secure: {
        icon: Shield,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-500',
        textColor: 'text-green-700',
        defaultMessage: 'Transaksi Aman & Terenkripsi',
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-700',
        defaultMessage: 'Perhatian: Sesi akan segera berakhir',
    },
    verified: {
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-700',
        defaultMessage: 'Pembayaran Terverifikasi',
    },
};

export default function SecurityBadge({ status, message, className = '' }: SecurityBadgeProps) {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${config.bgColor} ${config.borderColor} ${className}`}>
            <Icon size={16} className={config.iconColor} />
            <span className={`text-xs font-medium ${config.textColor}`}>
                {message || config.defaultMessage}
            </span>
        </div>
    );
}

export function SecurityIndicator() {
    return (
        <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
                <Lock size={12} className="text-green-500" />
                <span>SSL Secured</span>
            </div>
            <div className="flex items-center gap-1">
                <Shield size={12} className="text-green-500" />
                <span>Protected</span>
            </div>
        </div>
    );
}
