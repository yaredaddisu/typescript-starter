import { Controller, Get, Post, Body, Request,HttpException, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { BetsService } from './bets.service';
import { Bet } from './bets.schema';
import { CreateBetDto } from './create-bet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Types } from 'mongoose';
 
@Controller('bets')
export class BetsController {
    constructor(private readonly betsService: BetsService) {}

    // Create a new bet
    @UseGuards(JwtAuthGuard)
    @Post()
    async createBet(@Request() req, @Body() createBetDto: CreateBetDto) {
        const userId = req.user.userId; // Extract userId from the JWT payload
        console.log(req)
        const ticketId = new Types.ObjectId().toString(); // Generate a MongoDB ObjectId as a string

        // Merge auto-generated fields into the DTO
        const betData = {
            ...createBetDto,
            userId,
            ticketId,
        };
 
   
        console.log(createBetDto)
        try {
            return await this.betsService.createBet(betData);
        } catch (error) {
            console.log(error)
            throw new HttpException('Failed to create bet', HttpStatus.BAD_REQUEST);
        }
    }

    // Get all bets
  
  @Get()
  async getAllBets(): Promise<Bet[]> {
    try {
        const bets =   await this.betsService.findAll();;

      return bets;
    } catch (error) {
      throw new HttpException('Failed to fetch bets', HttpStatus.BAD_REQUEST);
    }
  }

 
//  @Get(':userId') // Use ':id' to capture the parameter in the route
//  async getBetById(@Param('userId') userId: string): Promise<Bet> {
//     //console.log(id)
//    try {
//      // Fetch a specific bet by its ID
//      return await this.betsService.findById(userId); // Pass 'id' to the service method
//    } catch (error) {
//      throw new HttpException('Failed to fetch the bet', HttpStatus.BAD_REQUEST);
//    }
//  }

 // Route to get all bets by userId
 // Route to get all bets by userId
 // Get all bets for a specific user by userId
 @Get(':userId')
async getAllBetsByUserId(@Param('userId') userId: string): Promise<Bet[]> {
  try {
    return await this.betsService.findByUserId(userId); // Directly return an array of bets
    
  } catch (error) {
    throw new HttpException('Failed to fetch the bets', HttpStatus.BAD_REQUEST);
  }
}

}
