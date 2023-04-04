import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
  import * as bcrypt from 'bcrypt'
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() Body:any) {
      return this.authService.signIn(Body);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }