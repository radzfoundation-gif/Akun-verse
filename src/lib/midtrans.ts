import crypto from 'crypto';
import type {
    MidtransCreateTransactionRequest,
    MidtransNotification,
} from '@/types/midtrans.d';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';

const BASE_URL = IS_PRODUCTION
    ? 'https://app.midtrans.com'
    : 'https://app.sandbox.midtrans.com';

const API_URL = IS_PRODUCTION
    ? 'https://api.midtrans.com/v2'
    : 'https://api.sandbox.midtrans.com/v2';

/**
 * Generate authorization header for Midtrans API
 */
const getAuthHeader = (): string => {
    const auth = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString('base64');
    return `Basic ${auth}`;
};

/**
 * Generate unique order ID
 */
export const generateOrderId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `RLABS-${timestamp}-${random}`;
};

/**
 * Create Snap transaction and get token
 */
export const createSnapTransaction = async (
    params: MidtransCreateTransactionRequest
): Promise<{ token: string; redirect_url: string }> => {
    const response = await fetch(`${BASE_URL}/snap/v1/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': getAuthHeader(),
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('Midtrans API Error:', error);
        throw new Error(error.error_messages?.[0] || 'Failed to create transaction');
    }

    return response.json();
};

/**
 * Verify notification signature from Midtrans webhook
 */
export const verifyNotificationSignature = (notification: MidtransNotification): boolean => {
    const { order_id, status_code, gross_amount, signature_key } = notification;

    const signatureInput = `${order_id}${status_code}${gross_amount}${MIDTRANS_SERVER_KEY}`;
    const expectedSignature = crypto
        .createHash('sha512')
        .update(signatureInput)
        .digest('hex');

    return signature_key === expectedSignature;
};

/**
 * Get payment status from Midtrans
 */
export const getPaymentStatus = async (
    orderId: string
): Promise<MidtransNotification> => {
    const response = await fetch(`${API_URL}/${orderId}/status`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': getAuthHeader(),
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.status_message || 'Failed to get payment status');
    }

    return response.json();
};

/**
 * Cancel a pending transaction
 */
export const cancelTransaction = async (orderId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${orderId}/cancel`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': getAuthHeader(),
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.status_message || 'Failed to cancel transaction');
    }
};

/**
 * Map Midtrans transaction status to internal status
 */
export const mapTransactionStatus = (
    transactionStatus: string,
    fraudStatus?: string
): 'pending' | 'paid' | 'failed' | 'expired' | 'refunded' => {
    switch (transactionStatus) {
        case 'capture':
            // For credit card, need to check fraud status
            if (fraudStatus === 'accept') {
                return 'paid';
            } else if (fraudStatus === 'challenge') {
                return 'pending';
            }
            return 'pending';

        case 'settlement':
            return 'paid';

        case 'pending':
            return 'pending';

        case 'deny':
        case 'cancel':
            return 'failed';

        case 'expire':
            return 'expired';

        case 'refund':
        case 'partial_refund':
            return 'refunded';

        default:
            return 'pending';
    }
};

/**
 * Get payment method display name
 */
export const getPaymentMethodName = (paymentType: string): string => {
    const names: Record<string, string> = {
        credit_card: 'Kartu Kredit/Debit',
        bank_transfer: 'Transfer Bank',
        echannel: 'Mandiri Bill Payment',
        bca_klikpay: 'BCA KlikPay',
        bca_klikbca: 'KlikBCA',
        bri_epay: 'BRI e-Pay',
        cimb_clicks: 'CIMB Clicks',
        danamon_online: 'Danamon Online',
        qris: 'QRIS',
        gopay: 'GoPay',
        shopeepay: 'ShopeePay',
        cstore: 'Convenience Store',
        akulaku: 'Akulaku',
        kredivo: 'Kredivo',
    };

    return names[paymentType] || paymentType;
};
