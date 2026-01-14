import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, GameKey } from '../../database/entities';
import { CartModule } from '../cart/cart.module';
import { GamesModule } from '../games/games.module';
import { PromosModule } from '../promos/promos.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, GameKey]),
        CartModule,
        GamesModule,
        PromosModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule { }
