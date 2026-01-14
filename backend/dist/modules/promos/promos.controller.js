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
exports.PromosController = void 0;
const common_1 = require("@nestjs/common");
const promos_service_1 = require("./promos.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const guards_1 = require("../../common/guards");
const decorators_1 = require("../../common/decorators");
const entities_1 = require("../../database/entities");
let PromosController = class PromosController {
    promosService;
    constructor(promosService) {
        this.promosService = promosService;
    }
    async validate(body) {
        return this.promosService.validatePromo(body.code, body.cartTotal);
    }
    async findAll() {
        return this.promosService.findAll();
    }
    async create(body) {
        return this.promosService.create(body);
    }
};
exports.PromosController = PromosController;
__decorate([
    (0, common_1.Post)('validate'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "validate", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(entities_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(entities_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PromosController.prototype, "create", null);
exports.PromosController = PromosController = __decorate([
    (0, common_1.Controller)('api/v1/promos'),
    __metadata("design:paramtypes", [promos_service_1.PromosService])
], PromosController);
//# sourceMappingURL=promos.controller.js.map