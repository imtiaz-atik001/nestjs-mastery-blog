import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  // ========== SWAGGER SETUP ==========
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Blog API')
    .setDescription('Blog API built with NestJS, MongoDB, and Swagger')
    .setVersion('1.0')
    .addTag('blogs', 'Blog management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  // ===================================

  await app.listen(port);
  console.log(`🚀 Application running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api`);
}
bootstrap();