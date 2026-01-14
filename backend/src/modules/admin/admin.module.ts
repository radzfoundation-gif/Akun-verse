import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { OrdersModule } from '../orders/orders.module';
import { PromosModule } from '../promos/promos.module';
import { GamesModule } from '../games/games.module';

@Module({
    imports: [OrdersModule, PromosModule, GamesModule],
    controllers: [AdminController],
})
export class AdminModule { }
