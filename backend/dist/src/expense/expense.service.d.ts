import { PrismaService } from '../../prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpenseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createExpenseDto: CreateExpenseDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        tipo: import("@prisma/client").$Enums.ExpenseType;
        dateTime: Date;
        kmAtual: number;
        valor: number;
        categoria: string | null;
        local: string | null;
        formaPagamento: string | null;
        vehicleId: string;
    }>;
    findAll(userId: string): Promise<({
        vehicle: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            placa: string;
            modelo: string;
            ano: number;
            tipo: string;
            kmInicial: number;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        tipo: import("@prisma/client").$Enums.ExpenseType;
        dateTime: Date;
        kmAtual: number;
        valor: number;
        categoria: string | null;
        local: string | null;
        formaPagamento: string | null;
        vehicleId: string;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        tipo: import("@prisma/client").$Enums.ExpenseType;
        dateTime: Date;
        kmAtual: number;
        valor: number;
        categoria: string | null;
        local: string | null;
        formaPagamento: string | null;
        vehicleId: string;
    }>;
    update(id: string, updateExpenseDto: Partial<CreateExpenseDto>, userId: string): Promise<{
        id: string;
        createdAt: Date;
        tipo: import("@prisma/client").$Enums.ExpenseType;
        dateTime: Date;
        kmAtual: number;
        valor: number;
        categoria: string | null;
        local: string | null;
        formaPagamento: string | null;
        vehicleId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        tipo: import("@prisma/client").$Enums.ExpenseType;
        dateTime: Date;
        kmAtual: number;
        valor: number;
        categoria: string | null;
        local: string | null;
        formaPagamento: string | null;
        vehicleId: string;
    }>;
}
