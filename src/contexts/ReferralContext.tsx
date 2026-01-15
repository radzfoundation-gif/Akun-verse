'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

const REFERRAL_STORAGE_KEY = 'rlabs-referral';

export interface ReferralData {
    referralCode: string;
    referredBy?: string;
    totalReferrals: number;
    totalEarnings: number;
    referralHistory: {
        date: string;
        userName: string;
        reward: number;
    }[];
}

interface ReferralContextType {
    referralData: ReferralData | null;
    generateReferralCode: (userId: string) => string;
    initializeReferral: (userId: string) => void;
    applyReferralCode: (code: string) => boolean;
    getDiscountPercent: () => number;
    isReferralApplied: boolean;
    appliedReferralCode: string | null;
    clearAppliedReferral: () => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

// Generate a unique referral code from user ID
const generateCodeFromUserId = (userId: string): string => {
    const hash = userId.split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    const code = Math.abs(hash).toString(36).toUpperCase().slice(0, 6);
    return `AKV${code}`;
};

export function ReferralProvider({ children }: { children: ReactNode }) {
    const [referralData, setReferralData] = useState<ReferralData | null>(null);
    const [appliedReferralCode, setAppliedReferralCode] = useState<string | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(REFERRAL_STORAGE_KEY);
            if (stored) {
                setReferralData(JSON.parse(stored));
            }
            const appliedCode = localStorage.getItem('rlabs-applied-referral');
            if (appliedCode) {
                setAppliedReferralCode(appliedCode);
            }
        } catch (e) {
            console.error('Failed to load referral data:', e);
        }
        setIsHydrated(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isHydrated && referralData) {
            localStorage.setItem(REFERRAL_STORAGE_KEY, JSON.stringify(referralData));
        }
    }, [referralData, isHydrated]);

    const generateReferralCode = useCallback((userId: string): string => {
        return generateCodeFromUserId(userId);
    }, []);

    const initializeReferral = useCallback((userId: string) => {
        const code = generateCodeFromUserId(userId);
        if (!referralData || referralData.referralCode !== code) {
            setReferralData({
                referralCode: code,
                totalReferrals: 0,
                totalEarnings: 0,
                referralHistory: [],
            });
        }
    }, [referralData]);

    const applyReferralCode = useCallback((code: string): boolean => {
        // Validate code format (AKV + 6 alphanumeric)
        const isValid = /^AKV[A-Z0-9]{3,6}$/i.test(code);

        if (isValid) {
            setAppliedReferralCode(code.toUpperCase());
            localStorage.setItem('rlabs-applied-referral', code.toUpperCase());
            return true;
        }

        return false;
    }, []);

    const getDiscountPercent = useCallback((): number => {
        // 50% discount for using referral code
        return appliedReferralCode ? 50 : 0;
    }, [appliedReferralCode]);

    const clearAppliedReferral = useCallback(() => {
        setAppliedReferralCode(null);
        localStorage.removeItem('rlabs-applied-referral');
    }, []);

    return (
        <ReferralContext.Provider
            value={{
                referralData,
                generateReferralCode,
                initializeReferral,
                applyReferralCode,
                getDiscountPercent,
                isReferralApplied: !!appliedReferralCode,
                appliedReferralCode,
                clearAppliedReferral,
            }}
        >
            {children}
        </ReferralContext.Provider>
    );
}

export function useReferral() {
    const context = useContext(ReferralContext);
    if (context === undefined) {
        throw new Error('useReferral must be used within a ReferralProvider');
    }
    return context;
}
