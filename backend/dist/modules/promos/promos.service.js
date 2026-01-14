"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
let PromosService = class PromosService {
    promoRepository;
    constructor(promoRepository) {
        this.promoRepository = promoRepository;
    }
    async findAll() {
        return this.promoRepository.find({ order: { createdAt: 'DESC' } });
    }
    async validatePromo(code, cartTotal) {
        const promo = await this.promoRepository.findOne({
            where: { code: code.toUpperCase() }
        });
        if (!promo) {
            throw new common_1.NotFoundException('Promo code not found');
        }
        if (!promo.isActive) {
            throw new common_1.BadRequestException('Promo code is no longer active');
        }
        if (promo.expiresAt && new Date() > promo.expiresAt) {
            throw new common_1.BadRequestException('Promo code has expired');
        }
        if (promo.usedCount >= promo.maxUsage) {
            throw new common_1.BadRequestException('Promo code usage limit reached');
        }
        if (cartTotal < promo.minPurchase) {
            throw new common_1.BadRequestException(`Minimum purchase of Rp ${promo.minPurchase.toLocaleString()} required`);
        }
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
    async usePromo(promoId) {
        await this.promoRepository.increment({ id: promoId }, 'usedCount', 1);
    }
    async create(data) {
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
};
exports.PromosService = PromosService;
exports.PromosService = PromosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Promo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PromosService);
//# sourceMappingURL=promos.service.js.map