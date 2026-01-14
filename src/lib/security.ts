/**
 * Security utilities for payment system
 * Note: This is client-side security. For production, use server-side validation.
 */

// Simple hash function for order signature (not cryptographically secure, but good for demo)
const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to hex and add salt
    const salt = 'RLABS_SECURE_2026';
    return Math.abs(hash).toString(16).toUpperCase() + '-' +
        simpleHash2(str + salt).toString(16).toUpperCase();
};

// Secondary hash for additional security
const simpleHash2 = (str: string): number => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return Math.abs(hash);
};

export interface SecureOrderData {
    items: Array<{
        id: number;
        title: string;
        quantity: number;
        priceValue: number;
        image: string;
    }>;
    totalPrice: number;
    finalPrice: number;
    discount: number;
    promoCode: string | null;
    paymentMethod: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
    // Security fields
    signature?: string;
    createdAt?: number;
    expiresAt?: number;
    securityToken?: string;
}

/**
 * Generate a signature for order data to prevent tampering
 */
export const generateOrderSignature = (order: SecureOrderData): string => {
    // Create a deterministic string from critical order fields
    const criticalData = JSON.stringify({
        items: order.items.map(i => ({ id: i.id, priceValue: i.priceValue, quantity: i.quantity })),
        totalPrice: order.totalPrice,
        finalPrice: order.finalPrice,
        discount: order.discount,
        paymentMethod: order.paymentMethod,
    });

    return simpleHash(criticalData);
};

/**
 * Verify order signature to detect tampering
 */
export const verifyOrderSignature = (order: SecureOrderData): boolean => {
    if (!order.signature) return false;

    const expectedSignature = generateOrderSignature(order);
    return order.signature === expectedSignature;
};

/**
 * Generate a secure one-time token
 */
export const generateSecureToken = (): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}-${random2}`.toUpperCase();
};

/**
 * Create secure checkout data with signature and expiry
 */
export const createSecureCheckoutData = (order: Omit<SecureOrderData, 'signature' | 'createdAt' | 'expiresAt'>): SecureOrderData => {
    const now = Date.now();
    const secureOrder: SecureOrderData = {
        ...order,
        createdAt: now,
        expiresAt: now + (15 * 60 * 1000), // 15 minutes
    };

    secureOrder.signature = generateOrderSignature(secureOrder);

    return secureOrder;
};

/**
 * Check if order has expired
 */
export const isOrderExpired = (order: SecureOrderData): boolean => {
    if (!order.expiresAt) return true;
    return Date.now() > order.expiresAt;
};

/**
 * Calculate remaining time in seconds
 */
export const getRemainingTime = (order: SecureOrderData): number => {
    if (!order.expiresAt) return 0;
    const remaining = Math.floor((order.expiresAt - Date.now()) / 1000);
    return Math.max(0, remaining);
};

/**
 * Secure storage key with prefix
 */
const STORAGE_PREFIX = 'rlabs_secure_';

/**
 * Store data securely with obfuscation
 */
export const secureStore = (key: string, data: unknown): void => {
    try {
        const jsonData = JSON.stringify(data);
        // Simple obfuscation (not encryption, but prevents casual inspection)
        const obfuscated = btoa(jsonData);
        sessionStorage.setItem(STORAGE_PREFIX + key, obfuscated);
    } catch (e) {
        console.error('Failed to store secure data:', e);
    }
};

/**
 * Retrieve securely stored data
 */
export const secureRetrieve = <T>(key: string): T | null => {
    try {
        const obfuscated = sessionStorage.getItem(STORAGE_PREFIX + key);
        if (!obfuscated) return null;

        const jsonData = atob(obfuscated);
        return JSON.parse(jsonData) as T;
    } catch (e) {
        console.error('Failed to retrieve secure data:', e);
        return null;
    }
};

/**
 * Remove securely stored data
 */
export const secureRemove = (key: string): void => {
    sessionStorage.removeItem(STORAGE_PREFIX + key);
};

/**
 * Validate payment token
 */
export const validatePaymentToken = (token: string | null, storedToken: string | null): boolean => {
    if (!token || !storedToken) return false;
    return token === storedToken;
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
    return input
        .replace(/[<>]/g, '') // Remove potential HTML
        .replace(/javascript:/gi, '') // Remove JS injection
        .trim();
};

/**
 * Rate limiter for button clicks
 */
const clickTimestamps: Record<string, number[]> = {};

export const isRateLimited = (actionId: string, maxClicks: number = 3, windowMs: number = 10000): boolean => {
    const now = Date.now();

    if (!clickTimestamps[actionId]) {
        clickTimestamps[actionId] = [];
    }

    // Remove old timestamps
    clickTimestamps[actionId] = clickTimestamps[actionId].filter(
        ts => now - ts < windowMs
    );

    if (clickTimestamps[actionId].length >= maxClicks) {
        return true;
    }

    clickTimestamps[actionId].push(now);
    return false;
};

/**
 * Format order number with checksum
 */
export const generateSecureOrderNumber = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const checksum = (timestamp % 97).toString().padStart(2, '0');
    return `RLS-${timestamp}${random}-${checksum}`;
};

/**
 * Verify order number checksum
 */
export const verifyOrderNumber = (orderNumber: string): boolean => {
    const match = orderNumber.match(/^RLS-(\d+)[A-Z0-9]+-(\d{2})$/);
    if (!match) return false;

    const timestamp = parseInt(match[1]);
    const checksum = parseInt(match[2]);

    return (timestamp % 97) === checksum;
};

// ==========================================
// FRAUD DETECTION UTILITIES
// ==========================================

export interface TransactionRiskFactors {
    isNewDevice: boolean;
    multipleFailedAttempts: boolean;
    unusualAmount: boolean;
    rapidTransactions: boolean;
    suspiciousEmail: boolean;
    vpnDetected: boolean;
}

export interface FraudRiskResult {
    score: number; // 0-100, higher = more risky
    level: 'low' | 'medium' | 'high';
    factors: string[];
    recommendation: string;
}

/**
 * Simple device fingerprinting for fraud detection
 * Note: For production, use more sophisticated solutions
 */
export const generateDeviceFingerprint = (): string => {
    const components = [
        navigator.userAgent,
        navigator.language,
        screen.width,
        screen.height,
        screen.colorDepth,
        new Date().getTimezoneOffset(),
        navigator.hardwareConcurrency || 0,
    ];

    return simpleHash(components.join('|'));
};

/**
 * Store device fingerprint for verification
 */
export const storeDeviceFingerprint = (): void => {
    try {
        const fingerprint = generateDeviceFingerprint();
        const storedFingerprints = JSON.parse(localStorage.getItem('rlabs_devices') || '[]');

        if (!storedFingerprints.includes(fingerprint)) {
            storedFingerprints.push(fingerprint);
            // Keep only last 5 devices
            if (storedFingerprints.length > 5) {
                storedFingerprints.shift();
            }
            localStorage.setItem('rlabs_devices', JSON.stringify(storedFingerprints));
        }
    } catch (e) {
        console.error('Failed to store device fingerprint:', e);
    }
};

/**
 * Check if current device is known
 */
export const isKnownDevice = (): boolean => {
    try {
        const fingerprint = generateDeviceFingerprint();
        const storedFingerprints = JSON.parse(localStorage.getItem('rlabs_devices') || '[]');
        return storedFingerprints.includes(fingerprint);
    } catch (e) {
        return false;
    }
};

/**
 * Track transaction timestamp for rate limiting
 */
const TRANSACTION_TIMESTAMPS_KEY = 'rlabs_tx_timestamps';

export const recordTransaction = (): void => {
    try {
        const timestamps = JSON.parse(localStorage.getItem(TRANSACTION_TIMESTAMPS_KEY) || '[]');
        timestamps.push(Date.now());
        // Keep only last 10 transactions
        if (timestamps.length > 10) {
            timestamps.shift();
        }
        localStorage.setItem(TRANSACTION_TIMESTAMPS_KEY, JSON.stringify(timestamps));
    } catch (e) {
        console.error('Failed to record transaction:', e);
    }
};

/**
 * Check for rapid transactions (potential fraud)
 */
export const hasRapidTransactions = (windowMinutes: number = 5, maxTransactions: number = 3): boolean => {
    try {
        const timestamps = JSON.parse(localStorage.getItem(TRANSACTION_TIMESTAMPS_KEY) || '[]');
        const cutoff = Date.now() - (windowMinutes * 60 * 1000);
        const recentTransactions = timestamps.filter((ts: number) => ts > cutoff);
        return recentTransactions.length >= maxTransactions;
    } catch (e) {
        return false;
    }
};

/**
 * Validate email against common suspicious patterns
 */
export const isSuspiciousEmail = (email: string): boolean => {
    const suspiciousPatterns = [
        /^test@/i,
        /^fake@/i,
        /^temp@/i,
        /\+.*@/,  // Plus addressing can be legitimate but also used for fraud
        /@mailinator\./i,
        /@tempmail\./i,
        /@throwaway\./i,
        /@guerrillamail\./i,
        /@10minutemail\./i,
    ];

    return suspiciousPatterns.some(pattern => pattern.test(email));
};

/**
 * Check if amount is unusual (compared to average)
 */
export const isUnusualAmount = (amount: number): boolean => {
    // Very low amounts might be testing
    if (amount < 10000) return true;
    // Very high amounts need extra verification
    if (amount > 10000000) return true;
    return false;
};

/**
 * Calculate fraud risk score
 */
export const calculateFraudRiskScore = (
    email: string,
    amount: number,
    failedAttempts: number = 0
): FraudRiskResult => {
    const factors: string[] = [];
    let score = 0;

    // Check device
    if (!isKnownDevice()) {
        score += 15;
        factors.push('Perangkat baru terdeteksi');
    }

    // Check failed attempts
    if (failedAttempts > 2) {
        score += 25;
        factors.push('Beberapa percobaan gagal');
    }

    // Check amount
    if (isUnusualAmount(amount)) {
        score += 20;
        factors.push('Jumlah transaksi tidak biasa');
    }

    // Check rapid transactions
    if (hasRapidTransactions()) {
        score += 30;
        factors.push('Transaksi terlalu cepat');
    }

    // Check email
    if (isSuspiciousEmail(email)) {
        score += 25;
        factors.push('Email mencurigakan');
    }

    // Normalize score to 0-100
    score = Math.min(100, score);

    // Determine risk level
    let level: 'low' | 'medium' | 'high' = 'low';
    let recommendation = 'Transaksi aman untuk dilanjutkan';

    if (score >= 60) {
        level = 'high';
        recommendation = 'Transaksi memerlukan verifikasi tambahan';
    } else if (score >= 30) {
        level = 'medium';
        recommendation = 'Lanjutkan dengan perhatian ekstra';
    }

    return {
        score,
        level,
        factors,
        recommendation,
    };
};

/**
 * Generate transaction fingerprint for uniqueness verification
 */
export const generateTransactionFingerprint = (
    items: Array<{ id: number; quantity: number }>,
    amount: number,
    email: string
): string => {
    const data = {
        items,
        amount,
        email: email.toLowerCase(),
        device: generateDeviceFingerprint(),
        timestamp: Math.floor(Date.now() / (5 * 60 * 1000)), // 5-minute bucket
    };

    return simpleHash(JSON.stringify(data));
};

/**
 * Check for duplicate transactions
 */
export const isDuplicateTransaction = (fingerprint: string): boolean => {
    try {
        const recentFingerprints = JSON.parse(sessionStorage.getItem('rlabs_recent_tx') || '[]');
        if (recentFingerprints.includes(fingerprint)) {
            return true;
        }

        recentFingerprints.push(fingerprint);
        // Keep only last 5 fingerprints
        if (recentFingerprints.length > 5) {
            recentFingerprints.shift();
        }
        sessionStorage.setItem('rlabs_recent_tx', JSON.stringify(recentFingerprints));

        return false;
    } catch (e) {
        return false;
    }
};

/**
 * Initialize security on page load
 */
export const initializeSecurity = (): void => {
    storeDeviceFingerprint();
};
