'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

const LOYALTY_STORAGE_KEY = 'rlabs-loyalty-points';

export interface LoyaltyTransaction {
    id: string;
    type: 'earn' | 'redeem';
    points: number;
    description: string;
    date: string;
    orderId?: string;
}

export interface LoyaltyData {
    currentPoints: number;
    lifetimePoints: number;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    transactions: LoyaltyTransaction[];
}

interface LoyaltyContextType {
    data: LoyaltyData;
    earnPoints: (points: number, description: string, orderId?: string) => void;
    redeemPoints: (points: number, description: string) => boolean;
    getPointsValue: (points: number) => number; // Points to IDR
    calculateEarnedPoints: (purchaseAmount: number) => number;
    getTierBenefits: (tier: string) => { multiplier: number; discount: number };
    isHydrated: boolean;
}

const defaultData: LoyaltyData = {
    currentPoints: 0,
    lifetimePoints: 0,
    tier: 'bronze',
    transactions: [],
};

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

const getTierFromPoints = (lifetime: number): 'bronze' | 'silver' | 'gold' | 'platinum' => {
    if (lifetime >= 50000) return 'platinum';
    if (lifetime >= 20000) return 'gold';
    if (lifetime >= 5000) return 'silver';
    return 'bronze';
};

export function LoyaltyProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<LoyaltyData>(defaultData);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(LOYALTY_STORAGE_KEY);
            if (stored) {
                setData(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load loyalty data:', e);
        }
        setIsHydrated(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(LOYALTY_STORAGE_KEY, JSON.stringify(data));
        }
    }, [data, isHydrated]);

    const earnPoints = useCallback((points: number, description: string, orderId?: string) => {
        const transaction: LoyaltyTransaction = {
            id: `TRX-${Date.now()}`,
            type: 'earn',
            points,
            description,
            date: new Date().toISOString(),
            orderId,
        };

        setData((prev) => {
            const newLifetime = prev.lifetimePoints + points;
            return {
                currentPoints: prev.currentPoints + points,
                lifetimePoints: newLifetime,
                tier: getTierFromPoints(newLifetime),
                transactions: [transaction, ...prev.transactions].slice(0, 50),
            };
        });
    }, []);

    const redeemPoints = useCallback((points: number, description: string): boolean => {
        if (data.currentPoints < points) return false;

        const transaction: LoyaltyTransaction = {
            id: `TRX-${Date.now()}`,
            type: 'redeem',
            points,
            description,
            date: new Date().toISOString(),
        };

        setData((prev) => ({
            ...prev,
            currentPoints: prev.currentPoints - points,
            transactions: [transaction, ...prev.transactions].slice(0, 50),
        }));

        return true;
    }, [data.currentPoints]);

    // 1 point = Rp 10
    const getPointsValue = useCallback((points: number): number => {
        return points * 10;
    }, []);

    // Earn 1% of purchase as points (100 = 1 point per Rp 100)
    const calculateEarnedPoints = useCallback((purchaseAmount: number): number => {
        const multiplier = getTierBenefits(data.tier).multiplier;
        return Math.floor((purchaseAmount / 100) * multiplier);
    }, [data.tier]);

    const getTierBenefits = useCallback((tier: string): { multiplier: number; discount: number } => {
        switch (tier) {
            case 'platinum': return { multiplier: 2.0, discount: 10 };
            case 'gold': return { multiplier: 1.5, discount: 5 };
            case 'silver': return { multiplier: 1.2, discount: 2 };
            default: return { multiplier: 1.0, discount: 0 };
        }
    }, []);

    return (
        <LoyaltyContext.Provider
            value={{
                data,
                earnPoints,
                redeemPoints,
                getPointsValue,
                calculateEarnedPoints,
                getTierBenefits,
                isHydrated,
            }}
        >
            {children}
        </LoyaltyContext.Provider>
    );
}

export function useLoyalty() {
    const context = useContext(LoyaltyContext);
    if (context === undefined) {
        throw new Error('useLoyalty must be used within a LoyaltyProvider');
    }
    return context;
}
