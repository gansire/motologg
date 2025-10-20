import { PrismaService } from '../../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
export declare class VehicleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createVehicleDto: CreateVehicleDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        modelo: string;
        ano: number;
        tipo: string;
        kmInicial: number;
        userId: string;
    }>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        modelo: string;
        ano: number;
        tipo: string;
        kmInicial: number;
        userId: string;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        modelo: string;
        ano: number;
        tipo: string;
        kmInicial: number;
        userId: string;
    }>;
}
