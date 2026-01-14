import { Repository } from 'typeorm';
import { Game, GameKey } from '../../database/entities';
import { CreateGameDto, UpdateGameDto } from './dto/game.dto';
export declare class GamesService {
    private gameRepository;
    private gameKeyRepository;
    constructor(gameRepository: Repository<Game>, gameKeyRepository: Repository<GameKey>);
    findAll(category?: string): Promise<Game[]>;
    findOne(id: string): Promise<Game>;
    create(createGameDto: CreateGameDto): Promise<Game>;
    update(id: string, updateGameDto: UpdateGameDto): Promise<Game>;
    delete(id: string): Promise<{
        message: string;
    }>;
    addGameKey(gameId: string, key: string): Promise<{
        message: string;
    }>;
    getAvailableKey(gameId: string): Promise<GameKey | null>;
    private calculateFinalPrice;
}
