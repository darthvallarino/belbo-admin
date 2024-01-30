import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/database/local/model/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    return await this.usersService.verify(username, pass);
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, link: user.link };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
