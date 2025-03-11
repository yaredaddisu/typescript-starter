// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
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
 
 // Swagger configuration
 const config = new DocumentBuilder()
 .setTitle('API Documentation')
 .setDescription('API documentation with authentication')
 .setVersion('1.0')
 .addBearerAuth(
     {
         type: 'http',
         scheme: 'bearer',
         bearerFormat: 'JWT',
         name: 'Authorization',
         in: 'header',
     },
     'access-token', // This name will be used in the decorator
 )
 .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
 