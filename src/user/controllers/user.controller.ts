import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { AuthResponseInterface } from '@/user/types/authResponse.interface';
import { UserResponseInterface } from '@/user/types/userResponse.interface';
import { RegisterDto } from '@/user/dto/register.dto';
import { LoginDto } from '@/user/dto/login.dto';
import { User } from '@/user/decorators/user.decorator';
import { UserEntity } from '@/user/entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getuser')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<AuthResponseInterface> {
    return this.userService.buildAuthResponse(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findById(+id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildCreateUserResponse(user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }

  // ========================================

  //           Auth

  // ========================================

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(
    @Body('user') registerDto: RegisterDto,
  ): Promise<AuthResponseInterface> {
    const user = await this.userService.register(registerDto);
    return this.userService.buildAuthResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginDto: LoginDto,
  ): Promise<AuthResponseInterface> {
    const user = await this.userService.login(loginDto);
    return this.userService.buildAuthResponse(user);
  }
}
