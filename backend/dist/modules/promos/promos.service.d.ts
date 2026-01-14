import { Repository } from 'typeorm';
import { Promo } from '../../database/entities';
export declare class PromosService {
    private promoRepository;
    constructor(promoRepository: Repository<Promo>);
    findAll(): Promise<Promo[]>;
    validatePromo(code: string, cartTotal: number): Promise<{
        valid: boolean;
        promoId: string;
        code: string;
        discountPercent: number;
        discountAmount: number;
        finalTotal: number;
    }>;
    usePromo(promoId: string): Promise<void>;
    create(data: Partial<Promo>): Promise<Promo>;
    getStats(): Promise<{
        totalPromos: number;
        activePromos: number;
        totalUsage: number;
    }>;
}
