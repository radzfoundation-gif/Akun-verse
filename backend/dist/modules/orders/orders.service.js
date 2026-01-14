"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
const cart_service_1 = require("../cart/cart.service");
const games_service_1 = require("../games/games.service");
const promos_service_1 = require("../promos/promos.service");
const uuid_1 = require("uuid");
let OrdersService = class OrdersService {
    orderRepository;
    gameKeyRepository;
    cartService;
    gamesService;
    promosService;
    constructor(orderRepository, gameKeyRepository, cartService, gamesService, promosService) {
        this.orderRepository = orderRepository;
        this.gameKeyRepository = gameKeyRepository;
        this.cartService = cartService;
        this.gamesService = gamesService;
        this.promosService = promosService;
    }
    async checkout(userId, paymentMethod, promoCode) {
        const cart = await this.cartService.getCart(userId);
        if (cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        let subtotal = cart.subtotal;
        let discountAmount = 0;
        let appliedPromoCode = null;
        if (promoCode) {
            try {
                const promoResult = await this.promosService.validatePromo(promoCode, subtotal);
                discountAmount = promoResult.discountAmount;
                appliedPromoCode = promoResult.code;
            }
            catch (e) {
            }
        }
        const totalPrice = subtotal - discountAmount;
        const orderItems = cart.items.map((item) => ({
            gameId: item.gameId,
            gameTitle: item.game?.title || 'Unknown',
            quantity: item.quantity,
            price: item.price,
            isFreeGame: item.isFreeGame || false,
        }));
        const orderNumber = `RLS-${Date.now()}-${(0, uuid_1.v4)().slice(0, 4).toUpperCase()}`;
        const order = this.orderRepository.create({
            orderNumber,
            userId,
            items: orderItems,
            subtotal,
            discountAmount,
            promoCode: appliedPromoCode,
            totalPrice,
            status: entities_1.OrderStatus.PENDING,
            paymentMethod,
        });
        await this.orderRepository.save(order);
        await this.cartService.clearCart(userId);
        return {
            orderId: order.id,
            orderNumber: order.orderNumber,
            totalPrice,
            status: order.status,
            paymentMethod,
        };
    }
    async confirmPayment(orderId, paymentId) {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.status !== entities_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('Order is not pending');
        }
        const deliveredKeys = [];
        for (const item of order.items) {
            for (let i = 0; i < item.quantity; i++) {
                const key = await this.gamesService.getAvailableKey(item.gameId);
                if (key) {
                    await this.gameKeyRepository.update(key.id, { isUsed: true, orderId });
                    deliveredKeys.push({
                        gameId: item.gameId,
                        gameTitle: item.gameTitle,
                        key: key.key,
                    });
                    await this.gamesService.update(item.gameId, { stock: -1 });
                }
            }
        }
        order.status = entities_1.OrderStatus.PAID;
        order.paymentId = paymentId;
        order.deliveredKeys = deliveredKeys;
        await this.orderRepository.save(order);
        return {
            message: 'Payment confirmed',
            orderId: order.id,
            keysDelivered: deliveredKeys.length,
        };
    }
    async getUserOrders(userId) {
        return this.orderRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async getOrderById(orderId, userId) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId, userId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async getAllOrders() {
        return this.orderRepository.find({ order: { createdAt: 'DESC' } });
    }
    async getAnalytics() {
        const totalOrders = await this.orderRepository.count();
        const paidOrders = await this.orderRepository.count({ where: { status: entities_1.OrderStatus.PAID } });
        const revenueResult = await this.orderRepository
            .createQueryBuilder('order')
            .select('SUM(order.totalPrice)', 'total')
            .where('order.status = :status', { status: entities_1.OrderStatus.PAID })
            .getRawOne();
        return {
            totalOrders,
            paidOrders,
            totalRevenue: parseFloat(revenueResult.total) || 0,
            conversionRate: totalOrders > 0 ? ((paidOrders / totalOrders) * 100).toFixed(2) : 0,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.GameKey)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cart_service_1.CartService,
        games_service_1.GamesService,
        promos_service_1.PromosService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map