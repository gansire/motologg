  import { ValidationPipe } from '@nestjs/common';
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  
  
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
      credentials: true,

    });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })); 
    await app.listen(3000);

  }
  bootstrap();