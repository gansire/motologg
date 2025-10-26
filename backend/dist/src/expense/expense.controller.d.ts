import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    create(createExpenseDto: CreateExpenseDto, req: any): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, updateExpenseDto: Partial<CreateExpenseDto>, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
