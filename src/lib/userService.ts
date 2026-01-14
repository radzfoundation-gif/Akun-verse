import { supabase } from './supabase';

// User type for Supabase
export interface SupabaseUser {
    id: string; // Clerk user ID
    email: string;
    name: string | null;
    image_url: string | null;
    created_at?: string;
    updated_at?: string;
}

// Order type for Supabase
export interface SupabaseOrder {
    id?: string;
    user_id: string; // Clerk user ID
    order_number: string;
    items: OrderItem[];
    total_price: number;
    final_price: number;
    discount: number;
    promo_code: string | null;
    payment_method: string;
    status: 'pending' | 'paid' | 'completed' | 'cancelled';
    paid_at: string | null;
    created_at?: string;
}

export interface OrderItem {
    id: string | number;
    title: string;
    name?: string;
    quantity: number;
    price: number;
    image: string;
    delivery_links?: string[];
    delivery_keys?: string[];
}

// Sync user to Supabase (called after Clerk login)
export async function syncUserToSupabase(user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
}): Promise<SupabaseUser | null> {
    try {
        const name = [user.firstName, user.lastName].filter(Boolean).join(' ') || null;

        const { data, error } = await supabase
            .from('users')
            .upsert({
                id: user.id,
                email: user.email,
                name: name,
                image_url: user.imageUrl || null,
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'id'
            })
            .select()
            .single();

        if (error) {
            console.error('Error syncing user to Supabase:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Failed to sync user:', err);
        return null;
    }
}

// Get user from Supabase
export async function getUser(userId: string): Promise<SupabaseUser | null> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

// Create order in Supabase
export async function createOrder(order: Omit<SupabaseOrder, 'id' | 'created_at'>): Promise<SupabaseOrder | null> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .insert(order)
            .select()
            .single();

        if (error) {
            console.error('Error creating order:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Failed to create order:', err);
        return null;
    }
}

// Get user orders
export async function getUserOrders(userId: string): Promise<SupabaseOrder[]> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
            return [];
        }

        return data || [];
    } catch {
        return [];
    }
}

// Get single order
export async function getOrder(orderId: string): Promise<SupabaseOrder | null> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

// Get order by order number
export async function getOrderByNumber(orderNumber: string): Promise<SupabaseOrder | null> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('order_number', orderNumber)
            .single();

        if (error) return null;
        return data;
    } catch {
        return null;
    }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: SupabaseOrder['status']): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ status, paid_at: status === 'paid' ? new Date().toISOString() : null })
            .eq('id', orderId);

        return !error;
    } catch {
        return false;
    }
}

// Get all orders (for admin)
export async function getAllOrders(): Promise<SupabaseOrder[]> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching all orders:', error);
            return [];
        }

        return data || [];
    } catch {
        return [];
    }
}
