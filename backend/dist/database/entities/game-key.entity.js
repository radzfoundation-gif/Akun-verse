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
exports.GameKey = void 0;
const typeorm_1 = require("typeorm");
const game_entity_1 = require("./game.entity");
const order_entity_1 = require("./order.entity");
let GameKey = class GameKey {
    id;
    game;
    gameId;
    key;
    isUsed;
    order;
    orderId;
    createdAt;
};
exports.GameKey = GameKey;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GameKey.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_entity_1.Game, (game) => game.keys),
    __metadata("design:type", game_entity_1.Game)
], GameKey.prototype, "game", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GameKey.prototype, "gameId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GameKey.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], GameKey.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, { nullable: true }),
    __metadata("design:type", order_entity_1.Order)
], GameKey.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GameKey.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GameKey.prototype, "createdAt", void 0);
exports.GameKey = GameKey = __decorate([
    (0, typeorm_1.Entity)('game_keys')
], GameKey);
//# sourceMappingURL=game-key.entity.js.map