"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const config_2 = require("./config");
const filters_1 = require("./common/filters");
const interceptors_1 = require("./common/interceptors");
const entities_1 = require("./database/entities");
const auth_module_1 = require("./modules/auth/auth.module");
const games_module_1 = require("./modules/games/games.module");
const cart_module_1 = require("./modules/cart/cart.module");
const promos_module_1 = require("./modules/promos/promos.module");
const orders_module_1 = require("./modules/orders/orders.module");
const admin_module_1 = require("./modules/admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.databaseConfig, config_2.jwtConfig, config_2.redisConfig],
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.database'),
                    entities: [entities_1.User, entities_1.Game, entities_1.GameKey, entities_1.Promo, entities_1.Cart, entities_1.Order],
                    synchronize: process.env.NODE_ENV !== 'production',
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            games_module_1.GamesModule,
            cart_module_1.CartModule,
            promos_module_1.PromosModule,
            orders_module_1.OrdersModule,
            admin_module_1.AdminModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: filters_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map