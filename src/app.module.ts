import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TaskModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
