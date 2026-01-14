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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
const games_service_1 = require("../games/games.service");
let CartService = class CartService {
    cartRepository;
    gamesService;
    constructor(cartRepository, gamesService) {
        this.cartRepository = cartRepository;
        this.gamesService = gamesService;
    }
    async getCart(userId) {
        let cart = await this.cartRepository.findOne({ where: { userId } });
        if (!cart) {
            cart = this.cartRepository.create({ userId, items: [] });
            await this.cartRepository.save(cart);
        }
        const itemsWithDetails = await Promise.all(cart.items.map(async (item) => {
            const game = await this.gamesService.findOne(item.gameId);
            return {
                ...item,
                game: {
                    id: game.id,
                    title: game.title,
                    imageUrl: game.imageUrl,
                    finalPrice: game.finalPrice,
                },
            };
        }));
        const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
            id: cart.id,
            items: itemsWithDetails,
            subtotal,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
        };
    }
    async addToCart(userId, gameId, quantity = 1) {
        const game = await this.gamesService.findOne(gameId);
        if (game.stock < quantity) {
            throw new common_1.BadRequestException('Not enough stock');
        }
        let cart = await this.cartRepository.findOne({ where: { userId } });
        if (!cart) {
            cart = this.cartRepository.create({ userId, items: [] });
        }
        const existingItemIndex = cart.items.findIndex((item) => item.gameId === gameId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        }
        else {
            cart.items.push({
                gameId,
                quantity,
                price: game.finalPrice,
                isFreeGame: false,
            });
        }
        await this.cartRepository.save(cart);
        return this.getCart(userId);
    }
    async removeFromCart(userId, gameId) {
        const cart = await this.cartRepository.findOne({ where: { userId } });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.items = cart.items.filter((item) => item.gameId !== gameId);
        await this.cartRepository.save(cart);
        return this.getCart(userId);
    }
    async clearCart(userId) {
        const cart = await this.cartRepository.findOne({ where: { userId } });
        if (cart) {
            cart.items = [];
            cart.appliedPromoId = null;
            await this.cartRepository.save(cart);
        }
        return { message: 'Cart cleared' };
    }
    async applyFreeGame(userId, gameId) {
        const cart = await this.cartRepository.findOne({ where: { userId } });
        if (!cart)
            return;
        const hasFreeGame = cart.items.some((item) => item.isFreeGame);
        if (hasFreeGame)
            return;
        const game = await this.gamesService.findOne(gameId);
        cart.items.push({
            gameId,
            quantity: 1,
            price: 0,
            isFreeGame: true,
        });
        await this.cartRepository.save(cart);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Cart)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        games_service_1.GamesService])
], CartService);
//# sourceMappingURL=cart.service.js.map