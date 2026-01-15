import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product type for admin
export interface AdminProduct {
    id: string;
    name: string;
    slug: string;
    category: string;
    price: number;
    original_price?: number;
    discount?: number;
    image: string;
    description: string;
    stock: number;
    badge?: 'best_seller' | 'termurah' | 'promo' | 'new' | null;
    account_type?: 'sharing' | 'private' | null;
    delivery_type: 'instant' | 'manual';
    delivery_links?: string[];
    delivery_keys?: string[];
    created_at?: string;
    updated_at?: string;
}

// Helper functions for CRUD operations
export async function getProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as AdminProduct[];
}

export async function getProductById(id: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as AdminProduct;
}

export async function getProductBySlug(slug: string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return data as AdminProduct;
}

export async function createProduct(product: Omit<AdminProduct, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();

    if (error) throw error;
    return data as AdminProduct;
}

export async function updateProduct(id: string, product: Partial<AdminProduct>) {
    const { data, error } = await supabase
        .from('products')
        .update({ ...product, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as AdminProduct;
}

export async function deleteProduct(id: string) {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
}

// Generate slug from name
export function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Reduce product stock after purchase
export async function reduceProductStock(productId: string, quantity: number = 1) {
    // Skip if productId is not a valid UUID (static product)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(productId)) {
        console.log(`⏭️ Skipping stock reduction for static product: ${productId}`);
        return true;
    }

    // First get current stock
    const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('stock')
        .eq('id', productId)
        .single();

    if (fetchError || !product) {
        console.warn('Product not found in Supabase, skipping:', productId);
        return true; // Return true to not block checkout
    }

    const newStock = Math.max(0, (product.stock || 0) - quantity);

    // Update stock
    const { error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock, updated_at: new Date().toISOString() })
        .eq('id', productId);

    if (updateError) {
        console.error('Failed to update product stock:', updateError);
        return false;
    }

    console.log(`📦 Stock reduced for ${productId}: ${product.stock} → ${newStock}`);
    return true;
}

// Reduce stock for multiple products (for cart checkout)
export async function reduceMultipleProductsStock(items: { productId: string; quantity: number }[]) {
    const results = await Promise.all(
        items.map(item => reduceProductStock(item.productId, item.quantity))
    );
    return results.every(Boolean);
}

// ==================== USER COUPONS ====================

export interface UserCoupon {
    id: string;
    user_id: string;
    coupon_code: string;
    claimed_at: string;
    used_at: string | null; // null = belum dipakai
}

// Claim a coupon for a user (each coupon can only be claimed once per user)
export async function claimCoupon(userId: string, couponCode: string) {
    // First check if already claimed
    const alreadyClaimed = await isCouponClaimed(userId, couponCode);
    if (alreadyClaimed) {
        throw new Error('Kamu sudah klaim kupon ini sebelumnya');
    }

    const { data, error } = await supabase
        .from('user_coupons')
        .insert([{ user_id: userId, coupon_code: couponCode }])
        .select()
        .single();

    if (error) {
        console.error('Supabase claimCoupon error:', error);
        // Check if it's a duplicate error (unique constraint violation)
        if (error.code === '23505') {
            throw new Error('Kupon sudah diklaim sebelumnya');
        }
        // Check for RLS policy errors
        if (error.code === '42501' || error.message?.includes('policy')) {
            throw new Error('Tidak memiliki izin untuk klaim kupon. Hubungi admin.');
        }
        // Generic error
        throw new Error('Gagal menyimpan kupon. Pastikan tabel user_coupons ada di Supabase.');
    }
    return data as UserCoupon;
}

// Get all coupons claimed by a user (only unused ones)
export async function getUserCoupons(userId: string) {
    const { data, error } = await supabase
        .from('user_coupons')
        .select('*')
        .eq('user_id', userId)
        .is('used_at', null) // Only get unused coupons
        .order('claimed_at', { ascending: false });

    if (error) throw error;
    return data as UserCoupon[];
}

// Check if a user has claimed a specific coupon
export async function isCouponClaimed(userId: string, couponCode: string) {
    const { data, error } = await supabase
        .from('user_coupons')
        .select('id')
        .eq('user_id', userId)
        .eq('coupon_code', couponCode)
        .maybeSingle();

    if (error) throw error;
    return !!data;
}

// Mark a coupon as used after successful checkout
export async function markCouponAsUsed(userId: string, couponCode: string) {
    const { error } = await supabase
        .from('user_coupons')
        .update({ used_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('coupon_code', couponCode);

    if (error) {
        console.error('Error marking coupon as used:', error);
        throw new Error('Gagal menandai kupon sebagai digunakan');
    }
    return true;
}

// ==================== ORDERS ====================

export interface AdminOrder {
    id: string;
    order_number: string;
    user_id: string;
    items: any[];
    total_price: number;
    final_price: number;
    discount: number;
    promo_code?: string | null;
    payment_method: string;
    status: 'pending' | 'paid' | 'failed' | 'expired' | 'refunded';
    paid_at?: string | null;
    created_at: string;
}

export async function getOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as AdminOrder[];
}
