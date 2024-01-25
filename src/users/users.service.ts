import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      id: '1',
      username: 'user',
      password: '12345678',
    },
  ];

  create(newUser: UserDto) {
    newUser.id = uuid();
    this.users.push(newUser);
  }

  findByUserName(username: string): UserDto | null {
    return this.users.find((user) => user.username === username);
  }
}
