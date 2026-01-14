import { Game } from './game.entity';
import { Order } from './order.entity';
export declare class GameKey {
    id: string;
    game: Game;
    gameId: string;
    key: string;
    isUsed: boolean;
    order: Order;
    orderId: string;
    createdAt: Date;
}
