import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';

@Controller('api/v1/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
    constructor(private cartService: CartService) { }

    @Get()
    async getCart(@CurrentUser('id') userId: string) {
        return this.cartService.getCart(userId);
    }

    @Post('add')
    async addToCart(
        @CurrentUser('id') userId: string,
        @Body() body: { gameId: string; quantity?: number },
    ) {
        return this.cartService.addToCart(userId, body.gameId, body.quantity);
    }

    @Delete('remove/:gameId')
    async removeFromCart(
        @CurrentUser('id') userId: string,
        @Param('gameId') gameId: string,
    ) {
        return this.cartService.removeFromCart(userId, gameId);
    }

    @Delete('clear')
    async clearCart(@CurrentUser('id') userId: string) {
        return this.cartService.clearCart(userId);
    }
}
