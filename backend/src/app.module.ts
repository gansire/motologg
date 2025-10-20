import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { VehicleModule } from './vehicle/vehicle.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: false,
    }),
    VehicleModule, PrismaModule, AuthModule
  ],
})
export class AppModule {}
