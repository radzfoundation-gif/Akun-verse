import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, OrderItem, PaymentMethod, GameKey } from '../../database/entities';
import { CartService } from '../cart/cart.service';
import { GamesService } from '../games/games.service';
import { PromosService } from '../promos/promos.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(GameKey)
        private gameKeyRepository: Repository<GameKey>,
        private cartService: CartService,
        private gamesService: GamesService,
        private promosService: PromosService,
    ) { }

    async checkout(userId: string, paymentMethod: PaymentMethod, promoCode?: string) {
        const cart = await this.cartService.getCart(userId);

        if (cart.items.length === 0) {
            throw new BadRequestException('Cart is empty');
        }

        // Calculate totals
        let subtotal = cart.subtotal;
        let discountAmount = 0;
        let appliedPromoCode: string | null = null;

        if (promoCode) {
            try {
                const promoResult = await this.promosService.validatePromo(promoCode, subtotal);
                discountAmount = promoResult.discountAmount;
                appliedPromoCode = promoResult.code;
            } catch (e) {
                // Promo invalid, continue without it
            }
        }

        const totalPrice = subtotal - discountAmount;

        // Create order items
        const orderItems: OrderItem[] = cart.items.map((item) => ({
            gameId: item.gameId,
            gameTitle: item.game?.title || 'Unknown',
            quantity: item.quantity,
            price: item.price,
            isFreeGame: item.isFreeGame || false,
        }));

        // Generate order number
        const orderNumber = `RLS-${Date.now()}-${uuidv4().slice(0, 4).toUpperCase()}`;

        // Create order
        const order = this.orderRepository.create({
            orderNumber,
            userId,
            items: orderItems,
            subtotal,
            discountAmount,
            promoCode: appliedPromoCode,
            totalPrice,
            status: OrderStatus.PENDING,
            paymentMethod,
        });

        await this.orderRepository.save(order);

        // Clear cart
        await this.cartService.clearCart(userId);

        return {
            orderId: order.id,
            orderNumber: order.orderNumber,
            totalPrice,
            status: order.status,
            paymentMethod,
        };
    }

    async confirmPayment(orderId: string, paymentId: string) {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        if (order.status !== OrderStatus.PENDING) {
            throw new BadRequestException('Order is not pending');
        }

        // Deliver game keys
        const deliveredKeys: { gameId: string; gameTitle: string; key: string }[] = [];
        for (const item of order.items) {
            for (let i = 0; i < item.quantity; i++) {
                const key = await this.gamesService.getAvailableKey(item.gameId);
                if (key) {
                    // Mark key as used
                    await this.gameKeyRepository.update(key.id, { isUsed: true, orderId });
                    deliveredKeys.push({
                        gameId: item.gameId,
                        gameTitle: item.gameTitle,
                        key: key.key,
                    });

                    // Decrement stock
                    await this.gamesService.update(item.gameId, { stock: -1 });
                }
            }
        }

        // Update order
        order.status = OrderStatus.PAID;
        order.paymentId = paymentId;
        order.deliveredKeys = deliveredKeys;
        await this.orderRepository.save(order);

        return {
            message: 'Payment confirmed',
            orderId: order.id,
            keysDelivered: deliveredKeys.length,
        };
    }

    async getUserOrders(userId: string) {
        return this.orderRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async getOrderById(orderId: string, userId: string) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId, userId },
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        return order;
    }

    async getAllOrders() {
        return this.orderRepository.find({ order: { createdAt: 'DESC' } });
    }

    async getAnalytics() {
        const totalOrders = await this.orderRepository.count();
        const paidOrders = await this.orderRepository.count({ where: { status: OrderStatus.PAID } });

        const revenueResult = await this.orderRepository
            .createQueryBuilder('order')
            .select('SUM(order.totalPrice)', 'total')
            .where('order.status = :status', { status: OrderStatus.PAID })
            .getRawOne();

        return {
            totalOrders,
            paidOrders,
            totalRevenue: parseFloat(revenueResult.total) || 0,
            conversionRate: totalOrders > 0 ? ((paidOrders / totalOrders) * 100).toFixed(2) : 0,
        };
    }
}
