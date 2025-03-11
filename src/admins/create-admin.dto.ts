import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserType {
  ADMIN = 0,
  USER = 1,
  MANAGER = 2,
}

export enum UserModule {
  SALES = 0,
  SUPPORT = 1,
  FINANCE = 2,
}

 
  

export class CreateUserDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'string' })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '1234', minLength: 4 })
  @MinLength(4)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: UserModule, example: UserModule.SALES })
  @IsEnum(UserModule)
  @IsNotEmpty()
  module: UserModule;

  @ApiProperty({ enum: UserType, example: UserType.ADMIN })
  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;

  @ApiProperty({ example: 'yared@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: Boolean, description: 'User active status (true = active, false = inactive)' })
  @IsBoolean()
  @IsNotEmpty()
  rowStatus: boolean;

  @ApiProperty({ example: '64d1234abcd567efgh890123', required: false })
  @IsNotEmpty()
  @IsString()
  createdById?: string;

  
}

 
export class UpdateUserDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'string' })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '1234', minLength: 4, required: false })
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  @IsOptional()
  password?: string;
  
  @ApiProperty({ example: '0923423589', minLength: 4 })
  @MinLength(4)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ enum: UserModule, example: UserModule.SALES })
  @IsEnum(UserModule)
  @IsNotEmpty()
  module: UserModule;

  @ApiProperty({ enum: UserType, example: UserType.ADMIN })
  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;

  @ApiProperty({ example: 'yared@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: Boolean, description: 'User active status (true = active, false = inactive)' })
  @IsBoolean()
  @IsNotEmpty()
  rowStatus: boolean;

  @ApiProperty({ example: '64d1234abcd567efgh890123', required: false })
  createdById?: string;

}
