import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseInterface } from './types/authResponse.interface';
import { ExpressRequest } from '@/types/expressRequest.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body('user') registerDto: RegisterDto,
  ): Promise<AuthResponseInterface> {
    const user = await this.authService.register(registerDto);
    return this.authService.buildAuthResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginDto: LoginDto,
  ): Promise<AuthResponseInterface> {
    const user = await this.authService.login(loginDto);
    return this.authService.buildAuthResponse(user);
  }

  @Get('getuser')
  async currentUser(@Req() request: ExpressRequest): Promise<AuthResponseInterface> {
    console.log('current user in controller', request.user)
    return 'getuser' as any;
  }
}
