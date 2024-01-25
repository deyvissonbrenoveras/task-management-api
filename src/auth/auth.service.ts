import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { sign as jwtSign } from 'jsonwebtoken';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private jwtSecret: string;
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.usersService.findByUserName(username);
    if (!bcryptCompareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    delete foundUser.password;

    const token = jwtSign(foundUser, this.jwtSecret, {
      expiresIn: this.jwtExpirationTimeInSeconds,
    });
    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
