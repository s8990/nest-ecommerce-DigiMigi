import { JWT_SECRET } from '@/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { UserEntity } from '@/user/entities/user.entity';
import { UserResponseInterface } from '@/user/types/userResponse.interface';
import { RegisterDto } from '@/user/dto/register.dto';
import { LoginDto } from '@/user/dto/login.dto';
import { AuthResponseInterface } from '@/user/types/authResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    const userByUsername = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email Or Username are taken!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<UserEntity[]> {
    // SELECT * FROM users
    return this.userRepository.find({
      select: {
        id: true,
        name: true,
        username: true,
        mobile: true,
      },
    });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    return this.userRepository.remove(user);
    // return this.userRepository.delete(user);
  }

  buildCreateUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  buildUpdateUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  // ========================================

  //           Auth

  // ========================================

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
