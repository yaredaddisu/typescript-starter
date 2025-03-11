import { Controller, Get, Post, Body, Param, Put, Request, Delete, ConflictException, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiExtraModels, getSchemaPath, ApiBearerAuth } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { CreateUserDto, UpdateUserDto } from './create-admin.dto';
import { Admin } from './schemas/admin.schema';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@ApiTags('Admins')  // Adds "Admins" category in Swagger
@ApiExtraModels(CreateUserDto) // Includes DTO Schema
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminService: AdminsService) { }

  @Post()
  @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({ status: 201, description: 'Admin created successfully', schema: { $ref: getSchemaPath(CreateUserDto) } })
  async createUser(@Body() createUserDto: CreateUserDto, @Request() req): Promise<Admin> {
    console.log("JWT Payload:", req.user); // Log the decoded user data
    const userId = req.user?.userId;  // userId is extracted from JWT payload as 'sub'
    console.log("request userId", userId);

    if (!userId) {
      throw new ConflictException('User ID not found in the request');
    }

    // Set the createdById from the JWT token
    createUserDto.createdById = userId;
    return this.adminService.createUser(createUserDto);
  }


  @Get()
  @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({ status: 200, description: 'Returns all admins', schema: { $ref: getSchemaPath(Admin) } })
  async getUsers(): Promise<Admin[]> {
    return this.adminService.getUsers();
  }

  @Put(':id')  // Added @Put decorator for updating user
  @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update an admin' })
  @ApiResponse({ status: 200, description: 'Admin updated successfully', schema: { $ref: getSchemaPath(Admin) } })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: Partial<UpdateUserDto>): Promise<Admin> {
    // Convert the user ID to an ObjectId for accurate comparison
    const userId = new Types.ObjectId(id); // Convert id to ObjectId format

    // Debugging log: Log the id being compared and the input data
    console.log('Updating User ID:', id);
    console.log('Converted ObjectId:', userId);
    console.log('Update Data:', updateUserDto);

    // Check for duplicate usernames or emails, excluding the current user
    const userWithSameUsernameOrEmail = await this.adminService.findOne({
      _id: { $ne: userId }, // Exclude the current user being updated
      $or: [
        { username: updateUserDto.username },
        { email: updateUserDto.email }
      ]
    });

    if (userWithSameUsernameOrEmail) {
      // Log duplicate conflict for debugging
      console.log('Conflict found:', userWithSameUsernameOrEmail);
      throw new ConflictException('Username or Email already exists for another user.');
    }

    // Proceed to update the user if no conflict is found
    const updatedUser = await this.adminService.findByIdAndUpdate(id, updateUserDto);

    if (!updatedUser) {
      // Log error if user was not found
      console.log('User not found:', id);
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  @Delete(':id')
  @ApiBearerAuth('access-token') // Must match the name in .addBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete an admin' })
  async deleteUser(@Param('id') id: string): Promise<Admin> {
    return this.adminService.deleteUser(id);
  }
}
