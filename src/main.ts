// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with default settings
  // main.ts
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
});


  // app.useGlobalGuards(new JwtAuthGuard(new JwtService({
  //   secret: '12345678',
  //   signOptions: { expiresIn: '1h' },
  // })));
  
  await app.listen(3000);
}
bootstrap();
