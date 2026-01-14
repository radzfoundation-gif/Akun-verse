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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.DiscountType = void 0;
const typeorm_1 = require("typeorm");
const game_key_entity_1 = require("./game-key.entity");
var DiscountType;
(function (DiscountType) {
    DiscountType["PERCENTAGE"] = "percentage";
    DiscountType["FIXED"] = "fixed";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
let Game = class Game {
    id;
    title;
    platform;
    originalPrice;
    discount;
    discountType;
    finalPrice;
    stock;
    imageUrl;
    category;
    description;
    isActive;
    keys;
    createdAt;
    updatedAt;
};
exports.Game = Game;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Game.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Game.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Steam' }),
    __metadata("design:type", String)
], Game.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Game.prototype, "originalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DiscountType, default: DiscountType.PERCENTAGE }),
    __metadata("design:type", String)
], Game.prototype, "discountType", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Game.prototype, "finalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Game.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => game_key_entity_1.GameKey, (key) => key.game),
    __metadata("design:type", Array)
], Game.prototype, "keys", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Game.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Game.prototype, "updatedAt", void 0);
exports.Game = Game = __decorate([
    (0, typeorm_1.Entity)('games')
], Game);
//# sourceMappingURL=game.entity.js.map