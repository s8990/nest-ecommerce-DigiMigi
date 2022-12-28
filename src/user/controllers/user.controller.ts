import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@/user/guards/auth.guard';
import { User } from '@/user/decorators/user.decorator';
import { BackendValidationPipe } from '@/shared/pipes/backendValidation.pipe';
import { UserEntity } from '@/user/entities/user.entity';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { LoginDto } from '@/user/dto/login.dto';
import { RegisterDto } from '@/user/dto/register.dto';
import { UserService } from '@/user/services/user.service';
import { AuthResponseInterface } from '@/user/types/authResponse.interface';
import { UserResponseInterface } from '@/user/types/userResponse.interface';

@Controller('v1/users')
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

  @Post('create')
  @UsePipes(new BackendValidationPipe())
  async create(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildCreateUserResponse(user);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUpdateUserResponse(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }

  // ========================================

  //           Auth

  // ========================================

  @Post('register')
  @UsePipes(new BackendValidationPipe())
  async register(
    @Body('user') registerDto: RegisterDto,
  ): Promise<AuthResponseInterface> {
    const user = await this.userService.register(registerDto);
    return this.userService.buildAuthResponse(user);
  }

  @Post('login')
  @UsePipes(new BackendValidationPipe())
  async login(
    @Body('user') loginDto: LoginDto,
  ): Promise<AuthResponseInterface> {
    const user = await this.userService.login(loginDto);
    return this.userService.buildAuthResponse(user);
  }
}
