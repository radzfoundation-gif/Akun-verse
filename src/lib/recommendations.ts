import { analyzeUserProfile, isNewUser, UserProfile } from './userBehavior';
import { supabase } from './supabase';

export interface ProductRecommendation {
    id: string;
    name: string;
    slug: string;
    category: string;
    price: number;
    image: string;
    reason: string;
    score: number;
}

export interface RecommendationResult {
    userInterests: string[];
    recommendationReason: string;
    products: ProductRecommendation[];
}

// Category display names
const CATEGORY_NAMES: Record<string, string> = {
    'akun-game': 'Akun Game',
    'akun-streaming': 'Akun Streaming',
    'software-pc': 'Software PC',
    'topup-game': 'Top Up Game',
    'gift-card': 'Gift Card',
    'vpn-premium': 'VPN Premium',
};

// Get best selling products for new users
async function getBestSellingProducts(limit: number = 10): Promise<ProductRecommendation[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error || !data) return [];

    return data.map((p, index) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        image: p.image,
        reason: index < 3 ? 'Produk terlaris' : 'Produk populer',
        score: 100 - index * 5,
    }));
}

// Get products with discounts
async function getPromoProducts(limit: number = 5): Promise<ProductRecommendation[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('discount', 0)
        .order('discount', { ascending: false })
        .limit(limit);

    if (error || !data) return [];

    return data.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        image: p.image,
        reason: `Diskon ${p.discount}%`,
        score: 80 + (p.discount || 0),
    }));
}

// Get products by category
async function getProductsByCategory(category: string, limit: number = 5): Promise<ProductRecommendation[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .limit(limit);

    if (error || !data) return [];

    const categoryName = CATEGORY_NAMES[category] || category;
    return data.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        image: p.image,
        reason: `Dari kategori ${categoryName} yang kamu suka`,
        score: 70,
    }));
}

// Get products in price range
async function getProductsInPriceRange(
    min: number,
    max: number,
    limit: number = 5
): Promise<ProductRecommendation[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .gte('price', min)
        .lte('price', max)
        .limit(limit);

    if (error || !data) return [];

    return data.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        image: p.image,
        reason: 'Sesuai budget belanjamu',
        score: 60,
    }));
}

// Main recommendation function
export async function getRecommendations(maxResults: number = 5): Promise<RecommendationResult> {
    // Check if new user
    if (isNewUser()) {
        return await getNewUserRecommendations(maxResults);
    }

    // Get user profile
    const profile = analyzeUserProfile();
    return await getPersonalizedRecommendations(profile, maxResults);
}

// Recommendations for new users
async function getNewUserRecommendations(maxResults: number): Promise<RecommendationResult> {
    const [bestsellers, promos] = await Promise.all([
        getBestSellingProducts(maxResults),
        getPromoProducts(maxResults),
    ]);

    // Combine and dedupe
    const allProducts = [...promos, ...bestsellers];
    const unique = dedupeProducts(allProducts);

    return {
        userInterests: ['new_user'],
        recommendationReason: 'Produk terlaris dan promo spesial untuk kamu',
        products: unique.slice(0, maxResults),
    };
}

// Personalized recommendations for returning users
async function getPersonalizedRecommendations(
    profile: UserProfile,
    maxResults: number
): Promise<RecommendationResult> {
    const allProducts: ProductRecommendation[] = [];

    // 1. Get products from favorite categories
    for (const category of profile.favoriteCategories.slice(0, 2)) {
        const products = await getProductsByCategory(category, 3);
        allProducts.push(...products);
    }

    // 2. Get products in preferred price range (round to integers)
    const priceRangeProducts = await getProductsInPriceRange(
        Math.floor(profile.preferredPriceRange.min),
        Math.ceil(profile.preferredPriceRange.max),
        3
    );
    allProducts.push(...priceRangeProducts);

    // 3. Add some bestsellers for variety
    const bestsellers = await getBestSellingProducts(3);
    allProducts.push(...bestsellers);

    // 4. Add promos
    const promos = await getPromoProducts(2);
    allProducts.push(...promos);

    // Filter out already purchased products
    const filtered = allProducts.filter(
        (p) => !profile.purchasedProducts.includes(p.id)
    );

    // Dedupe and sort by score
    const unique = dedupeProducts(filtered);
    unique.sort((a, b) => b.score - a.score);

    return {
        userInterests: profile.interests,
        recommendationReason: generateReasonText(profile),
        products: unique.slice(0, maxResults),
    };
}

// Remove duplicate products
function dedupeProducts(products: ProductRecommendation[]): ProductRecommendation[] {
    const seen = new Set<string>();
    return products.filter((p) => {
        if (seen.has(p.id)) return false;
        seen.add(p.id);
        return true;
    });
}

// Generate recommendation reason text
function generateReasonText(profile: UserProfile): string {
    if (profile.interests.includes('gaming')) {
        return 'Berdasarkan minatmu di gaming & game digital';
    }
    if (profile.interests.includes('streaming')) {
        return 'Berdasarkan minatmu di layanan streaming';
    }
    if (profile.interests.includes('software')) {
        return 'Berdasarkan minatmu di software & tools';
    }
    if (profile.favoriteCategories.length > 0) {
        const cat = CATEGORY_NAMES[profile.favoriteCategories[0]] || profile.favoriteCategories[0];
        return `Berdasarkan minatmu di ${cat}`;
    }
    return 'Dipilih khusus untukmu';
}
