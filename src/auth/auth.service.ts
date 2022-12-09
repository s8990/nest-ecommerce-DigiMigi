import { UserEntity } from '@/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@/config';
import { AuthResponseInterface } from '@/auth/types/authResponse.interface';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: registerDto.email,
      },
    });

    const userByUsername = await this.userRepository.findOne({
      where: {
        username: registerDto.username,
      },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email Or Username are taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.userRepository.create(registerDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<UserEntity> {
    const userByUsername = await this.userRepository.findOne({
      where: {
        username: loginDto.username,
      },
      select: [
        'id',
        'name',
        'username',
        'email',
        'mobile',
        'password',
        'bio',
        'image',
      ],
    });

    if (!userByUsername) {
      throw new HttpException(
        'Credentials are not valid!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // loginDto.password = plained password
    // userByUsername.password = hashed Password
    const isPasswordCorrect = await compare(
      loginDto.password,
      userByUsername.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete userByUsername.password;
    return userByUsername;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildAuthResponse(user: UserEntity): AuthResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
