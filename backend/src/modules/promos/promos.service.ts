import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { Promo } from '../../database/entities';

@Injectable()
export class PromosService {
    constructor(
        @InjectRepository(Promo)
        private promoRepository: Repository<Promo>,
    ) { }

    async findAll() {
        return this.promoRepository.find({ order: { createdAt: 'DESC' } });
    }

    async validatePromo(code: string, cartTotal: number) {
        const promo = await this.promoRepository.findOne({
            where: { code: code.toUpperCase() }
        });

        if (!promo) {
            throw new NotFoundException('Promo code not found');
        }

        if (!promo.isActive) {
            throw new BadRequestException('Promo code is no longer active');
        }

        if (promo.expiresAt && new Date() > promo.expiresAt) {
            throw new BadRequestException('Promo code has expired');
        }

        if (promo.usedCount >= promo.maxUsage) {
            throw new BadRequestException('Promo code usage limit reached');
        }

        if (cartTotal < promo.minPurchase) {
            throw new BadRequestException(`Minimum purchase of Rp ${promo.minPurchase.toLocaleString()} required`);
        }

        // Calculate discount
        let discountAmount = (cartTotal * promo.discountPercent) / 100;
        if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
            discountAmount = promo.maxDiscount;
        }

        return {
            valid: true,
            promoId: promo.id,
            code: promo.code,
            discountPercent: promo.discountPercent,
            discountAmount,
            finalTotal: cartTotal - discountAmount,
        };
    }

    async usePromo(promoId: string) {
        await this.promoRepository.increment({ id: promoId }, 'usedCount', 1);
    }

    async create(data: Partial<Promo>) {
        const promo = this.promoRepository.create({
            ...data,
            code: data.code?.toUpperCase() || '',
        });
        return this.promoRepository.save(promo);
    }

    async getStats() {
        const total = await this.promoRepository.count();
        const active = await this.promoRepository.count({ where: { isActive: true } });
        const totalUsage = await this.promoRepository
            .createQueryBuilder('promo')
            .select('SUM(promo.usedCount)', 'total')
            .getRawOne();

        return {
            totalPromos: total,
            activePromos: active,
            totalUsage: parseInt(totalUsage.total) || 0,
        };
    }
}
