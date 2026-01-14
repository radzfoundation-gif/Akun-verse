import { IsString, IsNumber, IsOptional, IsEnum, Min, IsUrl, IsBoolean } from 'class-validator';
import { DiscountType } from '../../../database/entities';

export class CreateGameDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    platform?: string = 'Steam';

    @IsNumber()
    @Min(0)
    originalPrice: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    discount?: number = 0;

    @IsOptional()
    @IsEnum(DiscountType)
    discountType?: DiscountType = DiscountType.PERCENTAGE;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number = 0;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdateGameDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    platform?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    originalPrice?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    discount?: number;

    @IsOptional()
    @IsEnum(DiscountType)
    discountType?: DiscountType;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class AddGameKeyDto {
    @IsString()
    key: string;
}
