import { Repository } from 'typeorm';
import { Order, OrderStatus, PaymentMethod, GameKey } from '../../database/entities';
import { CartService } from '../cart/cart.service';
import { GamesService } from '../games/games.service';
import { PromosService } from '../promos/promos.service';
export declare class OrdersService {
    private orderRepository;
    private gameKeyRepository;
    private cartService;
    private gamesService;
    private promosService;
    constructor(orderRepository: Repository<Order>, gameKeyRepository: Repository<GameKey>, cartService: CartService, gamesService: GamesService, promosService: PromosService);
    checkout(userId: string, paymentMethod: PaymentMethod, promoCode?: string): Promise<{
        orderId: string;
        orderNumber: string;
        totalPrice: number;
        status: OrderStatus;
        paymentMethod: PaymentMethod;
    }>;
    confirmPayment(orderId: string, paymentId: string): Promise<{
        message: string;
        orderId: string;
        keysDelivered: number;
    }>;
    getUserOrders(userId: string): Promise<Order[]>;
    getOrderById(orderId: string, userId: string): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    getAnalytics(): Promise<{
        totalOrders: number;
        paidOrders: number;
        totalRevenue: number;
        conversionRate: string | number;
    }>;
}
