'use client';

import { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StockAlertButtonProps {
    productId: string;
    productName: string;
    isOutOfStock?: boolean;
    className?: string;
}

const STOCK_ALERT_KEY = 'rlabs-stock-alerts';

export default function StockAlertButton({
    productId,
    productName,
    isOutOfStock = true,
    className = '',
}: StockAlertButtonProps) {
    const [isSubscribed, setIsSubscribed] = useState(() => {
        if (typeof window === 'undefined') return false;
        try {
            const alerts = JSON.parse(localStorage.getItem(STOCK_ALERT_KEY) || '[]');
            return alerts.includes(productId);
        } catch {
            return false;
        }
    });
    const [showToast, setShowToast] = useState(false);

    const handleToggle = () => {
        try {
            const alerts = JSON.parse(localStorage.getItem(STOCK_ALERT_KEY) || '[]');

            if (isSubscribed) {
                // Unsubscribe
                const newAlerts = alerts.filter((id: string) => id !== productId);
                localStorage.setItem(STOCK_ALERT_KEY, JSON.stringify(newAlerts));
                setIsSubscribed(false);
            } else {
                // Subscribe
                alerts.push(productId);
                localStorage.setItem(STOCK_ALERT_KEY, JSON.stringify(alerts));
                setIsSubscribed(true);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        } catch (e) {
            console.error('Error managing stock alert:', e);
        }
    };

    if (!isOutOfStock) return null;

    return (
        <>
            <button
                onClick={handleToggle}
                className={`
                    flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all
                    ${isSubscribed
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-purple-600 text-white hover:bg-purple-700'}
                    ${className}
                `}
            >
                {isSubscribed ? (
                    <>
                        <Check size={18} />
                        Notifikasi Aktif
                    </>
                ) : (
                    <>
                        <Bell size={18} />
                        Beri Tahu Saya
                    </>
                )}
            </button>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
                            <Bell size={18} />
                            <span className="text-sm">
                                Kamu akan diberitahu saat <strong>{productName}</strong> tersedia
                            </span>
                            <button onClick={() => setShowToast(false)} className="ml-2">
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Badge component to show subscription count
export function StockAlertBadge() {
    const count = (() => {
        if (typeof window === 'undefined') return 0;
        try {
            return JSON.parse(localStorage.getItem(STOCK_ALERT_KEY) || '[]').length;
        } catch {
            return 0;
        }
    })();

    if (count === 0) return null;

    return (
        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-purple-500 text-white rounded-full">
            {count}
        </span>
    );
}
