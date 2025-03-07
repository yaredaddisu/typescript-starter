// bets.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bet, BetDocument } from './bets.schema';

@Injectable()
export class BetsService {
  
  constructor(@InjectModel(Bet.name) private betModel: Model<BetDocument>) {}

  async createBet(betDto: Partial<Bet>): Promise<Bet> {
    const newBet = new this.betModel(betDto);
    return newBet.save();
  }

  async findAll(): Promise<Bet[]> {
    return this.betModel.find().exec();
  }
 
 // Fetch a specific bet by its ID
 async findById(userId: string): Promise<Bet> {
    return this.betModel.findById(userId).exec(); // Use findById() to fetch by the ObjectId in MongoDB
  }

  // If needed, find all bets by userId
  async findByUserId(userId: string): Promise<Bet[]> {
    console.log(userId);
    // Use find to fetch all bets for the given userId
    return this.betModel.find({ userId }).exec();
  }
  
}
