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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
let GamesService = class GamesService {
    gameRepository;
    gameKeyRepository;
    constructor(gameRepository, gameKeyRepository) {
        this.gameRepository = gameRepository;
        this.gameKeyRepository = gameKeyRepository;
    }
    async findAll(category) {
        const query = this.gameRepository.createQueryBuilder('game')
            .where('game.isActive = :isActive', { isActive: true });
        if (category) {
            query.andWhere('game.category = :category', { category });
        }
        return query.orderBy('game.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const game = await this.gameRepository.findOne({ where: { id } });
        if (!game) {
            throw new common_1.NotFoundException('Game not found');
        }
        return game;
    }
    async create(createGameDto) {
        const finalPrice = this.calculateFinalPrice(createGameDto.originalPrice, createGameDto.discount || 0, createGameDto.discountType || entities_1.DiscountType.PERCENTAGE);
        const game = this.gameRepository.create({
            ...createGameDto,
            finalPrice,
        });
        return this.gameRepository.save(game);
    }
    async update(id, updateGameDto) {
        const game = await this.findOne(id);
        let finalPrice = game.finalPrice;
        if (updateGameDto.originalPrice !== undefined ||
            updateGameDto.discount !== undefined ||
            updateGameDto.discountType !== undefined) {
            finalPrice = this.calculateFinalPrice(updateGameDto.originalPrice ?? game.originalPrice, updateGameDto.discount ?? game.discount, updateGameDto.discountType ?? game.discountType);
        }
        await this.gameRepository.update(id, { ...updateGameDto, finalPrice });
        return this.findOne(id);
    }
    async delete(id) {
        const game = await this.findOne(id);
        await this.gameRepository.remove(game);
        return { message: 'Game deleted successfully' };
    }
    async addGameKey(gameId, key) {
        await this.findOne(gameId);
        const gameKey = this.gameKeyRepository.create({
            gameId,
            key,
            isUsed: false,
        });
        await this.gameKeyRepository.save(gameKey);
        await this.gameRepository.increment({ id: gameId }, 'stock', 1);
        return { message: 'Game key added successfully' };
    }
    async getAvailableKey(gameId) {
        return this.gameKeyRepository.findOne({
            where: { gameId, isUsed: false },
            order: { createdAt: 'ASC' },
        });
    }
    calculateFinalPrice(original, discount, type) {
        if (type === entities_1.DiscountType.PERCENTAGE) {
            return original * (1 - discount / 100);
        }
        return Math.max(0, original - discount);
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Game)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.GameKey)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GamesService);
//# sourceMappingURL=games.service.js.map