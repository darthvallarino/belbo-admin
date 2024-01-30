import { Module } from '@nestjs/common';
import { ApiService } from './api/api.service';
import { HttpModule } from '@nestjs/axios';
import { BelvoController } from './belvo.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ApiService],
  controllers: [BelvoController]
})
export class BelvoModule {}
