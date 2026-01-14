import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem, Game } from '../../database/entities';
import { GamesService } from '../games/games.service';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,
        private gamesService: GamesService,
    ) { }

    async getCart(userId: string) {
        let cart = await this.cartRepository.findOne({ where: { userId } });

        if (!cart) {
            cart = this.cartRepository.create({ userId, items: [] });
            await this.cartRepository.save(cart);
        }

        // Populate game details
        const itemsWithDetails = await Promise.all(
            cart.items.map(async (item) => {
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
            }),
        );

        const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        return {
            id: cart.id,
            items: itemsWithDetails,
            subtotal,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
        };
    }

    async addToCart(userId: string, gameId: string, quantity: number = 1) {
        const game = await this.gamesService.findOne(gameId);

        if (game.stock < quantity) {
            throw new BadRequestException('Not enough stock');
        }

        let cart = await this.cartRepository.findOne({ where: { userId } });

        if (!cart) {
            cart = this.cartRepository.create({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex((item) => item.gameId === gameId);

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
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

    async removeFromCart(userId: string, gameId: string) {
        const cart = await this.cartRepository.findOne({ where: { userId } });

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        cart.items = cart.items.filter((item) => item.gameId !== gameId);
        await this.cartRepository.save(cart);

        return this.getCart(userId);
    }

    async clearCart(userId: string) {
        const cart = await this.cartRepository.findOne({ where: { userId } });

        if (cart) {
            cart.items = [];
            cart.appliedPromoId = null;
            await this.cartRepository.save(cart);
        }

        return { message: 'Cart cleared' };
    }

    async applyFreeGame(userId: string, gameId: string) {
        const cart = await this.cartRepository.findOne({ where: { userId } });

        if (!cart) return;

        // Check if free game already applied
        const hasFreeGame = cart.items.some((item) => item.isFreeGame);
        if (hasFreeGame) return;

        const game = await this.gamesService.findOne(gameId);

        cart.items.push({
            gameId,
            quantity: 1,
            price: 0,
            isFreeGame: true,
        });

        await this.cartRepository.save(cart);
    }
}
