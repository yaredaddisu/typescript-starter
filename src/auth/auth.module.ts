import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthSchema, User } from './auth.schema';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: AuthSchema },
      ]),

      JwtModule.register({
        secret: 'your_secret_key', // Make sure this is the same secret used to sign the token
        signOptions: { expiresIn: '1h' },
      }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],  // Register the controller here

})
export class AuthModule {}
