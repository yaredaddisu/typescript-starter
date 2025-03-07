import { IsNotEmpty, IsNumber, IsString, IsArray, IsEnum, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SelectionDto {
    @IsString() @IsNotEmpty() matchId: string;
    @IsString() @IsNotEmpty() league: string;
    @IsString() @IsNotEmpty() homeTeam: string;
    @IsString() @IsNotEmpty() awayTeam: string;
    @IsNotEmpty() eventDateTime: Date;
    @IsString() @IsNotEmpty() marketType: string;
    @IsString() @IsNotEmpty() betSelection: string;
    @IsNumber() @IsNotEmpty() odds: number;
    @IsEnum(['Pending', 'Win', 'Lose']) betResult?: string = 'Pending';
}

export class CreateBetDto {
    @IsOptional() @IsString() userId?: string; // Optional
    @IsOptional() @IsString() ticketId?: string; // Optional
    @IsNumber() @IsNotEmpty() stake: number;
    @IsNumber() @IsNotEmpty() totalOdds: number;
    @IsNumber() @IsNotEmpty() potentialWin: number;

    @IsEnum(['Pending', 'Won', 'Lost', 'Cancelled'])
    status?: string = 'Pending';

    @IsEnum(['Not Paid', 'Paid'])
    payoutStatus?: string = 'Not Paid';

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SelectionDto)
    selections: SelectionDto[];
}
