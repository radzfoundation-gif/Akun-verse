import { supabase } from './supabase';

// Types
export interface UserBehavior {
    productId: string;
    action: 'view' | 'cart' | 'purchase';
    category: string;
    price: number;
    timestamp: number;
}

export interface UserProfile {
    interests: string[];
    preferredPriceRange: { min: number; max: number };
    viewedProducts: string[];
    purchasedProducts: string[];
    cartProducts: string[];
    favoriteCategories: string[];
}

const STORAGE_KEY = 'akunverse_user_behavior';
const MAX_HISTORY = 100;

// Get user ID (from Clerk or generate anonymous)
export function getUserId(): string {
    if (typeof window === 'undefined') return 'anonymous';

    // Check for Clerk user ID in localStorage (set by Clerk)
    const clerkUser = localStorage.getItem('clerk-user-id');
    if (clerkUser) return clerkUser;

    // Generate anonymous ID
    let anonymousId = localStorage.getItem('akunverse_anonymous_id');
    if (!anonymousId) {
        anonymousId = 'anon_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('akunverse_anonymous_id', anonymousId);
    }
    return anonymousId;
}

// Get behavior history from localStorage
export function getBehaviorHistory(): UserBehavior[] {
    if (typeof window === 'undefined') return [];

    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

// Save behavior history to localStorage
function saveBehaviorHistory(history: UserBehavior[]): void {
    if (typeof window === 'undefined') return;

    // Keep only last MAX_HISTORY entries
    const trimmed = history.slice(-MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

// Track a user action
export async function trackBehavior(
    productId: string,
    action: 'view' | 'cart' | 'purchase',
    category: string,
    price: number
): Promise<void> {
    const behavior: UserBehavior = {
        productId,
        action,
        category,
        price,
        timestamp: Date.now(),
    };

    // Save to localStorage
    const history = getBehaviorHistory();
    history.push(behavior);
    saveBehaviorHistory(history);

    // Also save to Supabase for persistence (non-blocking)
    const userId = getUserId();
    try {
        await supabase.from('user_behavior').insert({
            user_id: userId,
            product_id: productId,
            action: action,
        });
    } catch (error) {
        console.error('Failed to save behavior to Supabase:', error);
        // Silently fail - localStorage is the primary store
    }
}

// Analyze user profile from behavior history
export function analyzeUserProfile(): UserProfile {
    const history = getBehaviorHistory();

    const viewedProducts = new Set<string>();
    const purchasedProducts = new Set<string>();
    const cartProducts = new Set<string>();
    const categoryCount: Record<string, number> = {};
    const prices: number[] = [];

    history.forEach((b) => {
        // Track products by action
        if (b.action === 'view') viewedProducts.add(b.productId);
        if (b.action === 'purchase') purchasedProducts.add(b.productId);
        if (b.action === 'cart') cartProducts.add(b.productId);

        // Count categories
        categoryCount[b.category] = (categoryCount[b.category] || 0) + 1;

        // Track prices
        prices.push(b.price);
    });

    // Sort categories by frequency
    const favoriteCategories = Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([cat]) => cat);

    // Calculate preferred price range
    const avgPrice = prices.length > 0
        ? prices.reduce((a, b) => a + b, 0) / prices.length
        : 50000;
    const preferredPriceRange = {
        min: Math.max(0, avgPrice * 0.5),
        max: avgPrice * 1.5,
    };

    // Determine interests based on categories
    const interests = determineInterests(favoriteCategories);

    return {
        interests,
        preferredPriceRange,
        viewedProducts: Array.from(viewedProducts),
        purchasedProducts: Array.from(purchasedProducts),
        cartProducts: Array.from(cartProducts),
        favoriteCategories,
    };
}

// Determine user interests from categories
function determineInterests(categories: string[]): string[] {
    const interestMap: Record<string, string[]> = {
        'akun-game': ['gaming'],
        'akun-streaming': ['streaming', 'entertainment'],
        'software-pc': ['software', 'productivity'],
        'topup-game': ['gaming', 'topup'],
        'gift-card': ['premium'],
        'vpn-premium': ['software', 'security'],
    };

    const interests = new Set<string>();
    categories.forEach((cat) => {
        const mapped = interestMap[cat] || [];
        mapped.forEach((i) => interests.add(i));
    });

    return Array.from(interests);
}

// Check if user is new (no history)
export function isNewUser(): boolean {
    return getBehaviorHistory().length === 0;
}

// Clear behavior history (for testing)
export function clearBehaviorHistory(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}
