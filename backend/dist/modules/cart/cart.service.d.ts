import { Repository } from 'typeorm';
import { Cart } from '../../database/entities';
import { GamesService } from '../games/games.service';
export declare class CartService {
    private cartRepository;
    private gamesService;
    constructor(cartRepository: Repository<Cart>, gamesService: GamesService);
    getCart(userId: string): Promise<{
        id: string;
        items: {
            game: {
                id: string;
                title: string;
                imageUrl: string;
                finalPrice: number;
            };
            gameId: string;
            quantity: number;
            price: number;
            isFreeGame?: boolean;
        }[];
        subtotal: number;
        itemCount: number;
    }>;
    addToCart(userId: string, gameId: string, quantity?: number): Promise<{
        id: string;
        items: {
            game: {
                id: string;
                title: string;
                imageUrl: string;
                finalPrice: number;
            };
            gameId: string;
            quantity: number;
            price: number;
            isFreeGame?: boolean;
        }[];
        subtotal: number;
        itemCount: number;
    }>;
    removeFromCart(userId: string, gameId: string): Promise<{
        id: string;
        items: {
            game: {
                id: string;
                title: string;
                imageUrl: string;
                finalPrice: number;
            };
            gameId: string;
            quantity: number;
            price: number;
            isFreeGame?: boolean;
        }[];
        subtotal: number;
        itemCount: number;
    }>;
    clearCart(userId: string): Promise<{
        message: string;
    }>;
    applyFreeGame(userId: string, gameId: string): Promise<void>;
}
