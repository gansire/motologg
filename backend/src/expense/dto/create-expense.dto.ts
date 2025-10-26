import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';
import { ExpenseType } from '@prisma/client';

export class CreateExpenseDto {
  @IsDateString()
  @IsNotEmpty()
  dateTime: string;

  @IsNumber()
  @IsNotEmpty()
  kmAtual: number;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  tipo: ExpenseType;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsString()
  @IsOptional()
  local?: string;

  @IsString()
  @IsOptional()
  formaPagamento?: string;

  @IsString()
  @IsNotEmpty()
  vehicleId: string;
}
