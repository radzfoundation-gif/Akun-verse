import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto, AddGameKeyDto } from './dto/game.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../database/entities';

@Controller('api/v1/games')
export class GamesController {
    constructor(private gamesService: GamesService) { }

    @Get()
    async findAll(@Query('category') category?: string) {
        return this.gamesService.findAll(category);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.gamesService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body() createGameDto: CreateGameDto) {
        return this.gamesService.create(createGameDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
        return this.gamesService.update(id, updateGameDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Param('id') id: string) {
        return this.gamesService.delete(id);
    }

    @Post(':id/keys')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async addKey(@Param('id') id: string, @Body() addKeyDto: AddGameKeyDto) {
        return this.gamesService.addGameKey(id, addKeyDto.key);
    }
}
