import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';

import { BetsModule } from './bets/bets.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
      envFilePath: '.env', // Specify the .env file
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/telegram-bot-registration'),
    UsersModule,

    ItemsModule,
    AuthModule,
    BetsModule,
    AdminsModule,

  ],
})
export class AppModule { }
