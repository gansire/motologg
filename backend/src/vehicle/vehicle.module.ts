import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { AuthModule } from '../auth/auth.module';  
import { PrismaModule } from '../../prisma/prisma.module';  

@Module({
  imports: [
    AuthModule,  
    PrismaModule,  
  ],
  controllers: [VehicleController],
  providers: [VehicleService],  
  exports: [VehicleService],  
})
export class VehicleModule {}