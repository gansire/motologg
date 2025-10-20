import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';  // Assuma que tem (crie se não)
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto, userId: string) {
    return this.prisma.vehicle.create({
      data: {
        ...createVehicleDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.vehicle.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: { id, userId },
    });
    if (!vehicle) throw new NotFoundException('Veículo não encontrado');
    return vehicle;
  }
}