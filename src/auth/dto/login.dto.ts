import {
  Allow,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @Allow()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @Allow()
  @IsNotEmpty()
  password: string;
}