import { OrdersService } from '../orders/orders.service';
import { PromosService } from '../promos/promos.service';
import { GamesService } from '../games/games.service';
export declare class AdminController {
    private ordersService;
    private promosService;
    private gamesService;
    constructor(ordersService: OrdersService, promosService: PromosService, gamesService: GamesService);
    getAnalytics(): Promise<{
        orders: {
            totalOrders: number;
            paidOrders: number;
            totalRevenue: number;
            conversionRate: string | number;
        };
        promos: {
            totalPromos: number;
            activePromos: number;
            totalUsage: number;
        };
        games: {
            total: number;
            lowStock: number;
        };
    }>;
    getAllOrders(): Promise<import("../../database/entities").Order[]>;
    getPromoStats(): Promise<{
        totalPromos: number;
        activePromos: number;
        totalUsage: number;
    }>;
}
