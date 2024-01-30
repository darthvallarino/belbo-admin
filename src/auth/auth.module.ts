import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalModule } from 'src/database/local/local.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants/constants';

@Module({
  imports: [
    LocalModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
