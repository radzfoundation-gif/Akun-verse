import { supabase, AdminProduct } from './supabase';
import { products as staticProducts, Product } from '@/data/products';

// Convert AdminProduct (from Supabase) to Product (for store display)
function adminToProduct(admin: AdminProduct): Product {
    return {
        id: admin.id,
        name: admin.name,
        slug: admin.slug,
        category: admin.category,
        price: admin.price,
        originalPrice: admin.original_price,
        discount: admin.discount,
        image: admin.image || 'https://via.placeholder.com/400x300',
        seller: {
            name: 'RLabs Store',
            rating: 5.0,
            totalSales: 100,
            verified: true,
        },
        badge: admin.badge as Product['badge'],
        stock: admin.stock,
        sold: 100 + (admin.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 500),
        description: admin.description || '',
        accountType: admin.account_type || undefined,
    };
}

// Fetch all products (Supabase primary)
export async function getAllProducts(): Promise<Product[]> {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('Supabase error, using static data fallback:', error.message);
            return staticProducts;
        }

        if (data && data.length > 0) {
            // Return ONLY Supabase products if they exist
            return data.map(adminToProduct);
        }

        // If Supabase is empty, fallback to static (for initial setup)
        return staticProducts;
    } catch (err) {
        console.warn('Failed to fetch from Supabase, using static data');
        return staticProducts;
    }
}

// Fetch products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.category === category);
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
    // First try Supabase
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('slug', slug)
            .single();

        if (!error && data) {
            return adminToProduct(data);
        }
    } catch (err) {
        // Continue to static data
    }

    // Fallback to static products
    return staticProducts.find(p => p.slug === slug) || null;
}

// Fetch featured products (best sellers)
export async function getFeaturedProducts(): Promise<Product[]> {
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.badge === 'best_seller').slice(0, 4);
}

// Fetch promo products (high discount)
export async function getPromoProducts(): Promise<Product[]> {
    const allProducts = await getAllProducts();
    return allProducts.filter(p => p.discount && p.discount >= 20).slice(0, 6);
}

// Get product delivery info (for success page)
export async function getProductDelivery(productId: string) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('delivery_type, delivery_links, delivery_keys')
            .eq('id', productId)
            .single();

        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

// Fetch new arrivals (latest 4 products)
export async function getNewArrivals(): Promise<Product[]> {
    const allProducts = await getAllProducts();
    // getAllProducts is already sorted by created_at desc
    return allProducts.slice(0, 4);
}

