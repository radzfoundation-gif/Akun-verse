import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from '../../database/entities';
import { GamesModule } from '../games/games.module';

@Module({
    imports: [TypeOrmModule.forFeature([Cart]), GamesModule],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService],
})
export class CartModule { }
