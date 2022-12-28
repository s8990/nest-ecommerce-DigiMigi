import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/user/entities/user.entity';
import { FollowEntity } from '@/profile/entities/follow.entity';
import { ProfileService } from '@/profile/services/profile.service';
import { ProfileController } from '@/profile/controllers/profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
