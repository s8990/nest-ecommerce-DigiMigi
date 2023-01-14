import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ExpressRequest } from '@/types/expressRequest.interface';
import { JWT_SECRET } from '@/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

interface JWTPayload {
  id: number;
  username: string;
  iat: number;
  // exp: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 1) Determine the UserTypes that canexecute the called endpoint

    if (roles?.length) {
      // 2) Grab the JWT from the request header and verify it
      const request = context.switchToHttp().getRequest();
      const accessToken = request.headers?.authorization?.split('Bearer ')[1];
      try {
        const payload = (await jwt.verify(accessToken, JWT_SECRET)) as JWTPayload;

        const user = await this.userRepository.findOne({
          where: {
            id: payload.id,
          },
        });

        if (!user) return false;

        if (roles.includes(user.role)) return true;

        return false;
      } catch (error) {
        return false;
      }
    }

    return true;

    // 3) Database request to get user by id

    // 4) Determine if the user can permission
  }
}
