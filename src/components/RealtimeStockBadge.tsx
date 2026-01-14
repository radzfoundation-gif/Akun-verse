'use client';

import { useRealtimeStock } from '@/hooks/useRealtimeStock';
import { Package, AlertTriangle, CheckCircle } from 'lucide-react';

interface RealtimeStockBadgeProps {
    productId: string;
    initialStock: number;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export default function RealtimeStockBadge({
    productId,
    initialStock,
    showLabel = true,
    size = 'md'
}: RealtimeStockBadgeProps) {
    const { stock, isLowStock } = useRealtimeStock(productId, initialStock);

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-2',
    };

    if (stock <= 0) {
        return (
            <div className={`inline-flex items-center gap-1.5 bg-red-500/20 text-red-400 rounded-full ${sizeClasses[size]}`}>
                <AlertTriangle size={size === 'sm' ? 12 : 16} />
                {showLabel && <span className="font-medium">Habis</span>}
            </div>
        );
    }

    if (isLowStock) {
        return (
            <div className={`inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 rounded-full ${sizeClasses[size]}`}>
                <AlertTriangle size={size === 'sm' ? 12 : 16} />
                {showLabel && <span className="font-medium">Sisa {stock}</span>}
            </div>
        );
    }

    return (
        <div className={`inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 rounded-full ${sizeClasses[size]}`}>
            <CheckCircle size={size === 'sm' ? 12 : 16} />
            {showLabel && <span className="font-medium">Stok: {stock}</span>}
        </div>
    );
}

// Simpler inline version for product cards
export function StockIndicator({
    productId,
    initialStock
}: {
    productId: string;
    initialStock: number;
}) {
    const { stock, isLowStock } = useRealtimeStock(productId, initialStock);

    if (stock <= 0) {
        return (
            <span className="text-xs text-red-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                Habis
            </span>
        );
    }

    if (isLowStock) {
        return (
            <span className="text-xs text-orange-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                Sisa {stock}
            </span>
        );
    }

    return (
        <span className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Tersedia
        </span>
    );
}
