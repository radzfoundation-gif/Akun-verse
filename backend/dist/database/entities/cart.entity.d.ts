import { User } from './user.entity';
export declare class Cart {
    id: string;
    user: User;
    userId: string;
    items: CartItem[];
    appliedPromoId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface CartItem {
    gameId: string;
    quantity: number;
    price: number;
    isFreeGame?: boolean;
}
