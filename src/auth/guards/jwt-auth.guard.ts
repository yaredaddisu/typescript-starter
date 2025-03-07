import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1]; // Assumes token is sent as "Bearer token"
        console.log(token)
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

         
            try {
                const payload = this.jwtService.verify(token, { secret: 'your_secret_key' });
                console.log('Decoded Payload:', payload); // Debugging line
                request.user = payload; 
                return true;
            } catch (error) {
                console.error('Token verification failed:', error); // Log error details for debugging
                throw new UnauthorizedException('Invalid token');
            }
            
        
    }
}
