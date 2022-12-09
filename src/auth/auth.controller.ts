import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseInterface } from './types/authResponse.interface';

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
}
