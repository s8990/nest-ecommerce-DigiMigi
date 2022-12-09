import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseInterface } from './types/authResponse.interface';

@Controller('auth')
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
}
