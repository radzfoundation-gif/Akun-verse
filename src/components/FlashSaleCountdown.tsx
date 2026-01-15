'use client';

import { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

interface FlashSaleCountdownProps {
    endTime: Date;
    onEnd?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function FlashSaleCountdown({
    endTime,
    onEnd,
    className = '',
    size = 'md',
}: FlashSaleCountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = endTime.getTime() - new Date().getTime();

            if (difference <= 0) {
                setIsEnded(true);
                onEnd?.();
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime, onEnd]);

    const sizeClasses = {
        sm: {
            container: 'gap-1',
            box: 'w-8 h-8 text-sm',
            label: 'text-[10px]',
            icon: 14,
        },
        md: {
            container: 'gap-2',
            box: 'w-12 h-12 text-lg',
            label: 'text-xs',
            icon: 16,
        },
        lg: {
            container: 'gap-3',
            box: 'w-16 h-16 text-2xl',
            label: 'text-sm',
            icon: 20,
        },
    };

    const styles = sizeClasses[size];

    if (isEnded) {
        return (
            <div className={`flex items-center gap-2 text-gray-400 ${className}`}>
                <Clock size={styles.icon} />
                <span className={styles.label}>Promo Telah Berakhir</span>
            </div>
        );
    }

    const TimeBox = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className={`${styles.box} bg-gradient-to-b from-red-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-red-500/30`}>
                {String(value).padStart(2, '0')}
            </div>
            <span className={`${styles.label} text-gray-400 mt-1`}>{label}</span>
        </div>
    );

    const Separator = () => (
        <span className="text-red-400 font-bold text-xl self-start mt-2">:</span>
    );

    return (
        <div className={`${className}`}>
            <div className={`flex items-center ${styles.container} mb-2`}>
                <Zap className="text-yellow-400" size={styles.icon} fill="currentColor" />
                <span className="text-white font-semibold text-sm">Flash Sale Berakhir Dalam:</span>
            </div>
            <div className={`flex items-start ${styles.container}`}>
                {timeLeft.days > 0 && (
                    <>
                        <TimeBox value={timeLeft.days} label="Hari" />
                        <Separator />
                    </>
                )}
                <TimeBox value={timeLeft.hours} label="Jam" />
                <Separator />
                <TimeBox value={timeLeft.minutes} label="Menit" />
                <Separator />
                <TimeBox value={timeLeft.seconds} label="Detik" />
            </div>
        </div>
    );
}

// Helper component for inline countdown (e.g., in product cards)
export function FlashSaleTag({ endTime }: { endTime: Date }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculate = () => {
            const diff = endTime.getTime() - new Date().getTime();
            if (diff <= 0) {
                setTimeLeft('Berakhir');
                return;
            }
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            setTimeLeft(`${hours}j ${minutes}m`);
        };

        calculate();
        const timer = setInterval(calculate, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            <Zap size={12} fill="currentColor" />
            {timeLeft}
        </div>
    );
}
