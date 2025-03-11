import { IsNotEmpty, IsNumber, IsString, IsArray, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SelectionDto {
    @ApiProperty({ example: '12345', description: 'Unique match ID' })
    @IsString() 
    @IsNotEmpty() 
    matchId: string;

    @ApiProperty({ example: 'Premier League', description: 'League name' })
    @IsString() 
    @IsNotEmpty() 
    league: string;

    @ApiProperty({ example: 'Manchester United', description: 'Home team name' })
    @IsString() 
    @IsNotEmpty() 
    homeTeam: string;

    @ApiProperty({ example: 'Chelsea FC', description: 'Away team name' })
    @IsString() 
    @IsNotEmpty() 
    awayTeam: string;

    @ApiProperty({ example: '2025-03-08T15:30:00Z', description: 'Event date and time', type: 'string', format: 'date-time' })
    @IsNotEmpty() 
    eventDateTime: Date;

    @ApiProperty({ example: 'Match Winner', description: 'Type of betting market' })
    @IsString() 
    @IsNotEmpty() 
    marketType: string;

    @ApiProperty({ example: 'Home Win', description: 'Selected bet option' })
    @IsString() 
    @IsNotEmpty() 
    betSelection: string;

    @ApiProperty({ example: 1.85, description: 'Odds for the selection' })
    @IsNumber() 
    @IsNotEmpty() 
    odds: number;

    @ApiProperty({ example: 'Pending', enum: ['Pending', 'Win', 'Lose'], default: 'Pending' })
    @IsEnum(['Pending', 'Win', 'Lose']) 
    betResult?: string = 'Pending';
}

export class CreateBetDto {
    @ApiProperty({ example: 'user123', description: 'Optional user ID', required: false })
    @IsOptional() 
    @IsString() 
    userId?: string;

    @ApiProperty({ example: 'ticket567', description: 'Optional ticket ID', required: false })
    @IsOptional() 
    @IsString() 
    ticketId?: string;

    @ApiProperty({ example: 100, description: 'Betting stake amount' })
    @IsNumber() 
    @IsNotEmpty() 
    stake: number;

    @ApiProperty({ example: 5.25, description: 'Total odds for the bet' })
    @IsNumber() 
    @IsNotEmpty() 
    totalOdds: number;

    @ApiProperty({ example: 525, description: 'Potential win amount' })
    @IsNumber() 
    @IsNotEmpty() 
    potentialWin: number;

    @ApiProperty({ example: 'Pending', enum: ['Pending', 'Won', 'Lost', 'Cancelled'], default: 'Pending' })
    @IsEnum(['Pending', 'Won', 'Lost', 'Cancelled']) 
    status?: string = 'Pending';

    @ApiProperty({ example: 'Not Paid', enum: ['Not Paid', 'Paid'], default: 'Not Paid' })
    @IsEnum(['Not Paid', 'Paid']) 
    payoutStatus?: string = 'Not Paid';

    @ApiProperty({
        type: [SelectionDto],
        description: 'Array of selections associated with the bet',
        example: [
            {
                matchId: '12345',
                league: 'Premier League',
                homeTeam: 'Manchester United',
                awayTeam: 'Chelsea FC',
                eventDateTime: '2025-03-08T15:30:00Z',
                marketType: 'Match Winner',
                betSelection: 'Home Win',
                odds: 1.85,
                betResult: 'Pending',
            }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SelectionDto)
    selections: SelectionDto[];
}
