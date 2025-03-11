import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
 
import * as bcrypt from 'bcrypt';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminsService,
    private jwtService: JwtService
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.adminService.findOneByEmail(email);
    console.log("Found user in validateUser:", user);
  
    if (user) {
      // Check if the password matches
      const passwordMatch = await bcrypt.compare(pass, user.password);
      console.log("Password match result:", passwordMatch);
  
      if (passwordMatch) {
        // Exclude password from user data and return
        const { password, ...result } = user;
        return result;  // Return the user without the password
      }
    }
  
    return null;  // Return null if user not found or password mismatch
  }
  
  async login(user: any) {
    try {
      console.log("User passed to login method:", user);
  
      // Check if user is valid
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      // Extract necessary user data
      const { email, username, phone, fullName, _id } = user._doc;
  
      // Prepare the payload, including user ID in 'sub'
      const payload = { 
        email, 
        username, 
        phone, 
        fullName, 
        sub: _id // The 'sub' field represents the user ID in the token
      };
  
      console.log("Payload to sign:", payload);
  
      // Sign the payload with the JWT service
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET, // Ensure the secret is securely stored in an environment variable
        expiresIn: '1h' // Set token expiration time (optional)
      });
  
      // Return the success response with token and user details
      return { 
        success: true,
        message: 'Login successful',
        user: { email, username, phone, fullName },
        token
      };
    } catch (error) {
      console.error('Error occurred during login:', error);
  
      // Return structured error response
      return { 
        success: false,
        message: 'An error occurred during login.',
        data: error.message
      };
    }
  }
  
  
  
}