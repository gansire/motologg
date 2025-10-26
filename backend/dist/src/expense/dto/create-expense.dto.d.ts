import { ExpenseType } from '@prisma/client';
export declare class CreateExpenseDto {
    dateTime: string;
    kmAtual: number;
    valor: number;
    tipo: ExpenseType;
    categoria?: string;
    local?: string;
    formaPagamento?: string;
    vehicleId: string;
}
