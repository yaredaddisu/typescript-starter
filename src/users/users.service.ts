import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

//   async create(user: Partial<User>): Promise<User> {
//     const existingUser = await this.userModel.findOne({ chatId: user.chatId });
//     if (existingUser) {
//         return existingUser;
//     }
//     const newUser = new this.userModel(user);
//     return newUser.save();
// }
async upsertUserByPhone(phoneNumber: string, userData: Partial<User>): Promise<User> {
    const existingUser = await this.userModel.findOne({ phoneNumber });
    if (existingUser) {
        // Update the existing user's data
        Object.assign(existingUser, userData);
        return existingUser.save();
    }
    // Create a new user if phone number is not found
    const newUser = new this.userModel(userData);
    return newUser.save();
}


  async findByChatId(chatId: string): Promise<User> {
    return this.userModel.findOne({ chatId }).exec();
  }
}
