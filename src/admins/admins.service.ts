import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from './create-admin.dto';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminsService {

  constructor(@InjectModel(Admin.name) private userModel: Model<AdminDocument>) { }
  async getUsers(): Promise<Admin[]> {
    return this.userModel.find().exec();
  }


  async findOneByEmail(email: string): Promise<Admin | null> {
    console.log("Searching for user with email:", email);
    return this.userModel.findOne({ email }).exec();  // ✅ Ensure the query is correct
  }


  async createUser(createUserDto: CreateUserDto): Promise<AdminDocument> {
    // Check if the username or email already exists
    const userExists = await this.userModel.findOne({
      $or: [{ username: createUserDto.username }, { email: createUserDto.email }],
    });

    if (userExists) {
      throw new ConflictException('Username or Email already exists.');
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt); // Hash the password

    // Create and save the new user
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }


  // Get User by ID
  async getUserById(id: string): Promise<Admin> {
    const user = await this.userModel.findById(id).exec();
    console.log(user)
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Find a user by id
  async findOne(filter: any): Promise<Admin> {
    return this.userModel.findOne(filter).exec();
  }

  // Find and update a user by id
  // Update User method
  async findByIdAndUpdate(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<Admin> {
    // Find the user first
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Hash the password only if it's being updated and not empty
    if (updateUserDto.password && updateUserDto.password.trim() !== '') {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    } else {
      // Remove password from the update object to prevent overwriting with empty value
      delete updateUserDto.password;
    }

    // Update and return the user
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
}


  // Delete User
  async deleteUser(id: string): Promise<Admin> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }
}
