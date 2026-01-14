import { PromosService } from './promos.service';
export declare class PromosController {
    private promosService;
    constructor(promosService: PromosService);
    validate(body: {
        code: string;
        cartTotal: number;
    }): Promise<{
        valid: boolean;
        promoId: string;
        code: string;
        discountPercent: number;
        discountAmount: number;
        finalTotal: number;
    }>;
    findAll(): Promise<import("../../database/entities").Promo[]>;
    create(body: any): Promise<import("../../database/entities").Promo>;
}
