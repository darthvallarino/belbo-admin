import { Injectable } from '@nestjs/common';
import User from './user.interface';
import data from './data';

@Injectable()
export class UsersService {
  constructor() {}

  async verify(email: string, userPass: string): Promise<User> {
    const user: User = await data.find(
      (item) => item.password === userPass && item.username === email,
    );
    return user;
  }
}
