import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private jwtSecret: string;
  private jwtExpirationTimeInSeconds: number;

  constructor(private readonly usersService: UsersService, private readonly configService: ConfigService) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.usersService.findByUserName(username);
    if (foundUser?.password !== password) {
      throw new UnauthorizedException();
    }

    const { password: removedPassword, ...userWithoutPassword } = foundUser

    const token = sign(userWithoutPassword, this.jwtSecret, { expiresIn: this.jwtExpirationTimeInSeconds })
    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
