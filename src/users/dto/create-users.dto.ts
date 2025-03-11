import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPlayersDto {
    
    @ApiProperty({ example: '123456789', description: 'Telegram chat ID' })
    @IsString()
    @IsNotEmpty()
    chatId: string;

    @ApiProperty({ example: 'John', description: 'First name of the user' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user', required: false })
    @IsString()
    @IsOptional() // This makes it optional
    lastName?: string;

    @ApiProperty({ example: 'johndoe', description: 'Telegram username' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: '+1234567890', description: 'User phone number', required: false })
    @IsString()
    @IsOptional()  // This makes phoneNumber optional
    phoneNumber?: string;

    @ApiProperty({ example: '2025-02-01T00:00:00.000Z', description: 'Date when the user was created', required: false })
    @IsDate()
    @IsOptional()  // This makes createdAt optional
    createdAt?: Date;

    @ApiProperty({ example: '2025-03-01T00:00:00.000Z', description: 'Date when the user was last updated', required: false })
    @IsDate()
    @IsOptional()  // This makes updatedAt optional
    updatedAt?: Date;
}
export class UpdateBanDto {
  readonly isBan: boolean; // This will be passed in the request body to update ban status
}
