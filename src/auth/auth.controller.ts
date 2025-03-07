import { Controller, Get, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  //@UseGuards(JwtAuthGuard)  // Use the JwtAuthGuard for this route

  async authenticate(@Query('chatId') chatId: string, @Query('phone') phone: string) {
    const user = await this.authService.findByChatIdAndPhone(chatId, phone);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate JWT token
    const token = await this.authService.generateToken(user);

    return {
      success: true,
      token,  // Return the JWT token
      user: {
        username: user.username,
        phone: user.phoneNumber,
        chatId: user.chatId,
        userId: user._id,
      },
    };
  }
}
