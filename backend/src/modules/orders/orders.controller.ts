import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { PaymentMethod } from '../../database/entities';

@Controller('api/v1/orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @Post('checkout')
    async checkout(
        @CurrentUser('id') userId: string,
        @Body() body: { paymentMethod: PaymentMethod; promoCode?: string },
    ) {
        return this.ordersService.checkout(userId, body.paymentMethod, body.promoCode);
    }

    @Get()
    async getUserOrders(@CurrentUser('id') userId: string) {
        return this.ordersService.getUserOrders(userId);
    }

    @Get(':id')
    async getOrderById(
        @CurrentUser('id') userId: string,
        @Param('id') orderId: string,
    ) {
        return this.ordersService.getOrderById(orderId, userId);
    }

    @Post(':id/payment-callback')
    async paymentCallback(
        @Param('id') orderId: string,
        @Body() body: { paymentId: string },
    ) {
        return this.ordersService.confirmPayment(orderId, body.paymentId);
    }
}
