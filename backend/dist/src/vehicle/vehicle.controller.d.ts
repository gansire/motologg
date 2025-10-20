import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    create(createVehicleDto: CreateVehicleDto, req: any): Promise<{
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
    findAll(req: any): Promise<{
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
}
