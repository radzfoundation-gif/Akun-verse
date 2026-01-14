import { NextRequest, NextResponse } from 'next/server';
import {
    verifyNotificationSignature,
    mapTransactionStatus,
    getPaymentMethodName,
} from '@/lib/midtrans';
import { supabase } from '@/lib/supabase';
import type { MidtransNotification } from '@/types/midtrans.d';

export async function POST(request: NextRequest) {
    try {
        const notification: MidtransNotification = await request.json();

        console.log('Received Midtrans notification:', {
            order_id: notification.order_id,
            transaction_status: notification.transaction_status,
            payment_type: notification.payment_type,
        });

        // Verify signature
        if (!verifyNotificationSignature(notification)) {
            console.error('Invalid notification signature');
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 403 }
            );
        }

        const {
            order_id,
            transaction_status,
            payment_type,
            gross_amount,
            transaction_id,
            fraud_status,
        } = notification;

        // Map to internal status
        const internalStatus = mapTransactionStatus(transaction_status, fraud_status);
        const paymentMethodName = getPaymentMethodName(payment_type);

        // Update order in database
        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    status: internalStatus,
                    payment_method: paymentMethodName,
                    transaction_id: transaction_id,
                    paid_at: internalStatus === 'paid' ? new Date().toISOString() : null,
                    updated_at: new Date().toISOString(),
                    midtrans_status: transaction_status,
                    midtrans_response: notification,
                })
                .eq('order_number', order_id);

            if (error) {
                console.error('Error updating order:', error);
            }
        } catch (dbError) {
            console.error('Database error:', dbError);
            // Continue - we still want to acknowledge the notification
        }

        // Send confirmation email if paid
        if (internalStatus === 'paid') {
            try {
                // Fetch order details for email
                const { data: order } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('order_number', order_id)
                    .single();

                if (order) {
                    // Send email notification
                    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-email`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: order.customer_email,
                            orderNumber: order_id,
                            items: order.items,
                            totalPrice: parseFloat(gross_amount),
                            customerName: order.customer_name,
                            paymentMethod: paymentMethodName,
                        }),
                    });
                }
            } catch (emailError) {
                console.error('Error sending confirmation email:', emailError);
                // Don't fail the webhook for email errors
            }
        }

        // Acknowledge the notification
        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        console.error('Error processing Midtrans notification:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle GET requests (for testing webhook URL)
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'Midtrans webhook endpoint is active',
    });
}
