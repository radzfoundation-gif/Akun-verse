import { DiscountType } from '../../../database/entities';
export declare class CreateGameDto {
    title: string;
    platform?: string;
    originalPrice: number;
    discount?: number;
    discountType?: DiscountType;
    stock?: number;
    imageUrl?: string;
    category?: string;
    description?: string;
}
export declare class UpdateGameDto {
    title?: string;
    platform?: string;
    originalPrice?: number;
    discount?: number;
    discountType?: DiscountType;
    stock?: number;
    imageUrl?: string;
    category?: string;
    description?: string;
    isActive?: boolean;
}
export declare class AddGameKeyDto {
    key: string;
}
