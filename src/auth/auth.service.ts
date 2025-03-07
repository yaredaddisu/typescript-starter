import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';  // Import JwtService
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,  // Inject JwtService
  ) {}

  async findByChatIdAndPhone(chatId: string, phone: string): Promise<User | null> {
    return this.userModel.findOne({ chatId, phoneNumber: phone }).exec();
  }

  async generateToken(user: User): Promise<string> {
    // Generate the JWT token with user data
    const payload = { userId: user._id, chatId: user.chatId, phone: user.phoneNumber };
    return this.jwtService.sign(payload);  // Generate the JWT token
  }
}
