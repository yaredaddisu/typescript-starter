import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { BetsModule } from './bets/bets.module';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
      envFilePath: '.env', // Specify the .env file
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/telegram-bot-registration'),
    UsersModule,
    TelegramModule,
    ItemsModule,
    AuthModule,
    BetsModule,
  ],
})
export class AppModule {}
