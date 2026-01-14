import { User } from './user.entity';
export declare enum OrderStatus {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
    REFUNDED = "refunded"
}
export declare enum PaymentMethod {
    DANA = "dana",
    GOPAY = "gopay",
    OVO = "ovo",
    BCA = "bca",
    MANDIRI = "mandiri",
    CARD = "card"
}
export declare class Order {
    id: string;
    orderNumber: string;
    user: User;
    userId: string;
    items: OrderItem[];
    subtotal: number;
    discountAmount: number;
    promoCode: string | null;
    totalPrice: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentId: string;
    deliveredKeys: DeliveredKey[];
    createdAt: Date;
    updatedAt: Date;
}
export interface OrderItem {
    gameId: string;
    gameTitle: string;
    quantity: number;
    price: number;
    isFreeGame: boolean;
}
export interface DeliveredKey {
    gameId: string;
    gameTitle: string;
    key: string;
}
