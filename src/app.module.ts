import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BelvoModule } from './belvo/belvo.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, BelvoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
