import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PromosService } from './promos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../database/entities';

@Controller('api/v1/promos')
export class PromosController {
    constructor(private promosService: PromosService) { }

    @Post('validate')
    @UseGuards(JwtAuthGuard)
    async validate(@Body() body: { code: string; cartTotal: number }) {
        return this.promosService.validatePromo(body.code, body.cartTotal);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async findAll() {
        return this.promosService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async create(@Body() body: any) {
        return this.promosService.create(body);
    }
}
