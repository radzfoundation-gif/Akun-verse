import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto, AddGameKeyDto } from './dto/game.dto';
export declare class GamesController {
    private gamesService;
    constructor(gamesService: GamesService);
    findAll(category?: string): Promise<import("../../database/entities").Game[]>;
    findOne(id: string): Promise<import("../../database/entities").Game>;
    create(createGameDto: CreateGameDto): Promise<import("../../database/entities").Game>;
    update(id: string, updateGameDto: UpdateGameDto): Promise<import("../../database/entities").Game>;
    delete(id: string): Promise<{
        message: string;
    }>;
    addKey(id: string, addKeyDto: AddGameKeyDto): Promise<{
        message: string;
    }>;
}
