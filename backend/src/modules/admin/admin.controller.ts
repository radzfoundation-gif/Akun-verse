import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../database/entities';
import { OrdersService } from '../orders/orders.service';
import { PromosService } from '../promos/promos.service';
import { GamesService } from '../games/games.service';

@Controller('api/v1/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
    constructor(
        private ordersService: OrdersService,
        private promosService: PromosService,
        private gamesService: GamesService,
    ) { }

    @Get('analytics')
    async getAnalytics() {
        const orderStats = await this.ordersService.getAnalytics();
        const promoStats = await this.promosService.getStats();
        const games = await this.gamesService.findAll();

        return {
            orders: orderStats,
            promos: promoStats,
            games: {
                total: games.length,
                lowStock: games.filter(g => g.stock < 5).length,
            },
        };
    }

    @Get('orders')
    async getAllOrders() {
        return this.ordersService.getAllOrders();
    }

    @Get('promo-stats')
    async getPromoStats() {
        return this.promosService.getStats();
    }
}
