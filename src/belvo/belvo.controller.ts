import { Controller, Query, Request, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiService } from './api/api.service'
import User from 'src/database/local/model/users/user.interface';

@ApiBearerAuth()
@Controller('belvo')
export class BelvoController {
  constructor(private apiService: ApiService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getAllTransactions')
  getAllTransactions(@Request() req) {
    const user: User = req.user;
    return this.apiService.getAllTransactions(user.link);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getTransactionsByCategory')
  getTransactionsByCategory(@Request() req) {
    const user: User = req.user;
    return this.apiService.getTransactionsByCategory(user.link);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getTransactionsByAccount')
  getTransactionsByAccount(@Request() req) {
    const user: User = req.user;
    return this.apiService.getTransactionsByAccount(user.link);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getTransactions')
  getTransactions(@Request() req) {
    const user: User = req.user;
    return this.apiService.getTransactions(user.link);
  }
}
