import { GameKey } from './game-key.entity';
export declare enum DiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed"
}
export declare class Game {
    id: string;
    title: string;
    platform: string;
    originalPrice: number;
    discount: number;
    discountType: DiscountType;
    finalPrice: number;
    stock: number;
    imageUrl: string;
    category: string;
    description: string;
    isActive: boolean;
    keys: GameKey[];
    createdAt: Date;
    updatedAt: Date;
}
