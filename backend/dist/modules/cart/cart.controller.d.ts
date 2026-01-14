import { CartService } from './cart.service';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
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
    addToCart(userId: string, body: {
        gameId: string;
        quantity?: number;
    }): Promise<{
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
}
