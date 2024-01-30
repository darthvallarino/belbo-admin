import { Module } from '@nestjs/common';
import { UsersService } from './model/users/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class LocalModule {}
