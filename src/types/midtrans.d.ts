// Type definitions for Midtrans Snap.js

export interface SnapResult {
    order_id: string;
    transaction_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
    fraud_status?: string;
    status_code: string;
    status_message: string;
}

export interface SnapCallbacks {
    onSuccess?: (result: SnapResult) => void;
    onPending?: (result: SnapResult) => void;
    onError?: (result: SnapResult) => void;
    onClose?: () => void;
}

export interface SnapEmbedOptions {
    embedId: string;
    onSuccess?: (result: SnapResult) => void;
    onPending?: (result: SnapResult) => void;
    onError?: (result: SnapResult) => void;
    onClose?: () => void;
}

declare global {
    interface Window {
        snap: {
            pay: (token: string, callbacks?: SnapCallbacks) => void;
            embed: (token: string, options: SnapEmbedOptions) => void;
            hide: () => void;
        };
    }
}

export interface MidtransTransactionDetails {
    order_id: string;
    gross_amount: number;
}

export interface MidtransItemDetails {
    id: string;
    price: number;
    quantity: number;
    name: string;
    category?: string;
    merchant_name?: string;
}

export interface MidtransCustomerDetails {
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    billing_address?: {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
        address?: string;
        city?: string;
        postal_code?: string;
        country_code?: string;
    };
}

export interface MidtransCreateTransactionRequest {
    transaction_details: MidtransTransactionDetails;
    item_details?: MidtransItemDetails[];
    customer_details?: MidtransCustomerDetails;
    enabled_payments?: string[];
    callbacks?: {
        finish?: string;
        error?: string;
        pending?: string;
    };
}

export interface MidtransNotification {
    transaction_time: string;
    transaction_status: string;
    transaction_id: string;
    status_message: string;
    status_code: string;
    signature_key: string;
    payment_type: string;
    order_id: string;
    merchant_id: string;
    gross_amount: string;
    fraud_status?: string;
    currency: string;
}

export { };
