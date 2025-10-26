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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ExpenseService = class ExpenseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createExpenseDto, userId) {
        const vehicle = await this.prisma.vehicle.findFirst({
            where: { id: createExpenseDto.vehicleId, userId },
        });
        if (!vehicle)
            throw new common_1.NotFoundException('Veículo não encontrado ou não pertence ao usuário');
        return this.prisma.expense.create({
            data: {
                ...createExpenseDto,
                dateTime: new Date(createExpenseDto.dateTime),
            },
        });
    }
    async findAll(userId) {
        return this.prisma.expense.findMany({
            where: {
                vehicle: { userId },
            },
            include: { vehicle: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const expense = await this.prisma.expense.findFirst({
            where: { id, vehicle: { userId } },
        });
        if (!expense)
            throw new common_1.NotFoundException('Despesa não encontrada');
        return expense;
    }
    async update(id, updateExpenseDto, userId) {
        await this.findOne(id, userId);
        return this.prisma.expense.update({
            where: { id },
            data: updateExpenseDto,
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.expense.delete({ where: { id } });
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map