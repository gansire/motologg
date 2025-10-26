import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto, userId: string) {
    
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { id: createExpenseDto.vehicleId, userId },
    });
    if (!vehicle) throw new NotFoundException('Veículo não encontrado ou não pertence ao usuário');

    return this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        dateTime: new Date(createExpenseDto.dateTime),
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.expense.findMany({
      where: {
        vehicle: { userId },
      },
      include: { vehicle: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const expense = await this.prisma.expense.findFirst({
      where: { id, vehicle: { userId } },
    });
    if (!expense) throw new NotFoundException('Despesa não encontrada');
    return expense;
  }

  async update(id: string, updateExpenseDto: Partial<CreateExpenseDto>, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.expense.delete({ where: { id } });
  }
}