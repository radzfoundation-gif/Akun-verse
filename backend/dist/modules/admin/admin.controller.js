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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const guards_1 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const entities_1 = require("../../database/entities");
const orders_service_1 = require("../orders/orders.service");
const promos_service_1 = require("../promos/promos.service");
const games_service_1 = require("../games/games.service");
let AdminController = class AdminController {
    ordersService;
    promosService;
    gamesService;
    constructor(ordersService, promosService, gamesService) {
        this.ordersService = ordersService;
        this.promosService = promosService;
        this.gamesService = gamesService;
    }
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
    async getAllOrders() {
        return this.ordersService.getAllOrders();
    }
    async getPromoStats() {
        return this.promosService.getStats();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('analytics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAnalytics", null);
__decorate([
    (0, common_1.Get)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Get)('promo-stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPromoStats", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('api/v1/admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(entities_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        promos_service_1.PromosService,
        games_service_1.GamesService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map