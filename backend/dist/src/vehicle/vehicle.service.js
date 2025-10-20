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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let VehicleService = class VehicleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createVehicleDto, userId) {
        return this.prisma.vehicle.create({
            data: {
                ...createVehicleDto,
                userId,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.vehicle.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const vehicle = await this.prisma.vehicle.findFirst({
            where: { id, userId },
        });
        if (!vehicle)
            throw new common_1.NotFoundException('Veículo não encontrado');
        return vehicle;
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map