// create-item.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'first name' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'last name' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

}


export class GetItemDto {
    @ApiProperty({ example: 'id' })
    @IsString()
    @IsNotEmpty()
    _id: string;

    @ApiProperty({ example: 'string' })
    @IsString()
    @IsNotEmpty()
    first_name: string;
  
    @ApiProperty({ example: 'string' })
    @IsString()
    @IsNotEmpty()
    last_name: string;
  
  }