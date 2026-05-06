import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    // 1. Load .env file globally
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available everywhere without importing
      envFilePath: '.env',
    }),

    // 2. Connect to MongoDB using ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}