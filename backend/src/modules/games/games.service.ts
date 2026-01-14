import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameKey, DiscountType } from '../../database/entities';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        @InjectRepository(GameKey)
        private gameKeyRepository: Repository<GameKey>,
    ) { }

    async findAll(category?: string) {
        const query = this.gameRepository.createQueryBuilder('game')
            .where('game.isActive = :isActive', { isActive: true });

        if (category) {
            query.andWhere('game.category = :category', { category });
        }

        return query.orderBy('game.createdAt', 'DESC').getMany();
    }

    async findOne(id: string) {
        const game = await this.gameRepository.findOne({ where: { id } });
        if (!game) {
            throw new NotFoundException('Game not found');
        }
        return game;
    }

    async create(createGameDto: CreateGameDto) {
        const finalPrice = this.calculateFinalPrice(
            createGameDto.originalPrice,
            createGameDto.discount || 0,
            createGameDto.discountType || DiscountType.PERCENTAGE,
        );

        const game = this.gameRepository.create({
            ...createGameDto,
            finalPrice,
        });

        return this.gameRepository.save(game);
    }

    async update(id: string, updateGameDto: UpdateGameDto) {
        const game = await this.findOne(id);

        // Recalculate final price if pricing changed
        let finalPrice = game.finalPrice;
        if (updateGameDto.originalPrice !== undefined ||
            updateGameDto.discount !== undefined ||
            updateGameDto.discountType !== undefined) {
            finalPrice = this.calculateFinalPrice(
                updateGameDto.originalPrice ?? game.originalPrice,
                updateGameDto.discount ?? game.discount,
                updateGameDto.discountType ?? game.discountType,
            );
        }

        await this.gameRepository.update(id, { ...updateGameDto, finalPrice });
        return this.findOne(id);
    }

    async delete(id: string) {
        const game = await this.findOne(id);
        await this.gameRepository.remove(game);
        return { message: 'Game deleted successfully' };
    }

    async addGameKey(gameId: string, key: string) {
        await this.findOne(gameId); // Verify game exists

        const gameKey = this.gameKeyRepository.create({
            gameId,
            key, // In production, encrypt this
            isUsed: false,
        });

        await this.gameKeyRepository.save(gameKey);

        // Update stock
        await this.gameRepository.increment({ id: gameId }, 'stock', 1);

        return { message: 'Game key added successfully' };
    }

    async getAvailableKey(gameId: string): Promise<GameKey | null> {
        return this.gameKeyRepository.findOne({
            where: { gameId, isUsed: false },
            order: { createdAt: 'ASC' },
        });
    }

    private calculateFinalPrice(original: number, discount: number, type: DiscountType): number {
        if (type === DiscountType.PERCENTAGE) {
            return original * (1 - discount / 100);
        }
        return Math.max(0, original - discount);
    }
}
