import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  signIn(username: string, password: string) {
    const foundUser = this.usersService.findByUserName(username);
    if (foundUser?.password !== password) {
      throw new UnauthorizedException();
    }
    return 'token';
  }
}
