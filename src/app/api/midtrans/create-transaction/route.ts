import { NextRequest, NextResponse } from 'next/server';
import { createSnapTransaction, generateOrderId } from '@/lib/midtrans';
import { supabase } from '@/lib/supabase';
import type { MidtransItemDetails, MidtransCustomerDetails } from '@/types/midtrans.d';

export interface CreateTransactionRequest {
    items: Array<{
        id: string | number;
        title: string;
        quantity: number;
        price: number;
        image?: string;
    }>;
    customerInfo: {
        name: string;
        email: string;
        phone?: string;
    };
    userId?: string;
    totalPrice: number;
    discount?: number;
    promoCode?: string | null;
}

export async function POST(request: NextRequest) {
    try {
        const body: CreateTransactionRequest = await request.json();
        const { items, customerInfo, userId, totalPrice, discount = 0, promoCode } = body;

        // Validate request
        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'Items are required' },
                { status: 400 }
            );
        }

        if (!customerInfo?.email) {
            return NextResponse.json(
                { error: 'Customer email is required' },
                { status: 400 }
            );
        }

        // Generate unique order ID
        const orderId = generateOrderId();

        // Calculate final amount
        const finalAmount = Math.max(0, totalPrice - discount);

        // Save order to Supabase database
        try {
            const orderData = {
                order_number: orderId,
                user_id: userId || 'guest',
                items: items.map(item => ({
                    id: String(item.id),
                    title: item.title,
                    name: item.title,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image || '',
                })),
                total_price: totalPrice,
                final_price: finalAmount,
                discount: discount,
                promo_code: promoCode || null,
                payment_method: 'midtrans',
                status: 'pending',
                paid_at: null,
            };

            const { error: dbError } = await supabase
                .from('orders')
                .insert(orderData);

            if (dbError) {
                console.error('Error saving order to database:', dbError);
                // Continue anyway - we don't want to fail checkout if DB has issues
            }
        } catch (dbErr) {
            console.error('Database error:', dbErr);
            // Continue with checkout
        }

        // Prepare item details for Midtrans
        const itemDetails: MidtransItemDetails[] = items.map((item) => ({
            id: String(item.id),
            name: item.title.substring(0, 50), // Midtrans limits name to 50 chars
            price: Math.round(item.price),
            quantity: item.quantity,
            category: 'Digital Product',
        }));

        // Add discount as negative item if applicable
        if (discount > 0) {
            itemDetails.push({
                id: 'DISCOUNT',
                name: promoCode ? `Discount (${promoCode})` : 'Discount',
                price: -Math.round(discount),
                quantity: 1,
            });
        }

        // Prepare customer details
        const nameParts = customerInfo.name.split(' ');
        const customerDetails: MidtransCustomerDetails = {
            first_name: nameParts[0] || 'Customer',
            last_name: nameParts.slice(1).join(' ') || undefined,
            email: customerInfo.email,
            phone: customerInfo.phone,
        };

        // Get the base URL for callbacks
        const baseUrl = request.headers.get('origin') || 'http://localhost:3000';

        // Create Snap transaction
        const transaction = await createSnapTransaction({
            transaction_details: {
                order_id: orderId,
                gross_amount: Math.round(finalAmount),
            },
            item_details: itemDetails,
            customer_details: customerDetails,
            callbacks: {
                finish: `${baseUrl}/checkout/status?order_id=${orderId}`,
                error: `${baseUrl}/checkout/status?order_id=${orderId}&status=error`,
                pending: `${baseUrl}/checkout/status?order_id=${orderId}&status=pending`,
            },
        });

        return NextResponse.json({
            success: true,
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            order_id: orderId,
        });
    } catch (error) {
        console.error('Error creating Midtrans transaction:', error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to create transaction',
            },
            { status: 500 }
        );
    }
}

