import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';  
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { AdminsModule } from 'src/admins/admins.module';  // ✅ Import the module, NOT the service

@Module({
  imports: [
    PassportModule,
    UsersModule,
    AdminsModule,  // ✅ Correctly import AdminsModule instead of AdminsService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,  
    JwtStrategy      
  ],
  controllers: [AuthController],
})
export class AuthModule {}
