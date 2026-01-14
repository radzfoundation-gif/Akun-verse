import { NextRequest, NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/midtrans';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('order_id');

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        const status = await getPaymentStatus(orderId);

        return NextResponse.json(status);
    } catch (error) {
        console.error('Error getting payment status:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to get payment status' },
            { status: 500 }
        );
    }
}
