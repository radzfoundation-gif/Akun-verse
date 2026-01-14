import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game, GameKey } from '../../database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Game, GameKey])],
    controllers: [GamesController],
    providers: [GamesService],
    exports: [GamesService],
})
export class GamesModule { }
