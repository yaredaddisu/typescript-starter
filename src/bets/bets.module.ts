// bets.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bet, BetSchema } from './bets.schema';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
 

@Module({
  
  imports: [MongooseModule.forFeature([{ name: Bet.name, schema: BetSchema }]),AuthModule],
  providers: [BetsService,JwtService],
  controllers: [BetsController],
  exports: [BetsService],
})
export class BetsModule {}
