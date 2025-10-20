import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsInt()
  @Min(1900)
  ano: number;

  @IsString()
  tipo: 'carro' | 'moto';

  @IsInt()
  @Min(0)
  kmInicial: number;
}