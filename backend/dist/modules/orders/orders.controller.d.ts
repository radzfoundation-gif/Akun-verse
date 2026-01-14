import { OrdersService } from './orders.service';
import { PaymentMethod } from '../../database/entities';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    checkout(userId: string, body: {
        paymentMethod: PaymentMethod;
        promoCode?: string;
    }): Promise<{
        orderId: string;
        orderNumber: string;
        totalPrice: number;
        status: import("../../database/entities").OrderStatus;
        paymentMethod: PaymentMethod;
    }>;
    getUserOrders(userId: string): Promise<import("../../database/entities").Order[]>;
    getOrderById(userId: string, orderId: string): Promise<import("../../database/entities").Order>;
    paymentCallback(orderId: string, body: {
        paymentId: string;
    }): Promise<{
        message: string;
        orderId: string;
        keysDelivered: number;
    }>;
}
